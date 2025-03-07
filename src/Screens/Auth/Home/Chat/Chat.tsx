import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ChatModal from './Components/ChatModal';
import Svg, {Polyline} from 'react-native-svg';
const deviceHeight = Dimensions.get('window').height;
import RNFS from 'react-native-fs';
import {
  ChatClient,
  ChatMessageType,
  ChatOptions,
  ChatConversationType,
  ChatMessageChatType,
  ChatSearchDirection,
  ChatMessage,
} from 'react-native-agora-chat';
import {selectMessagesForConversation} from '../../../../store/selectors/selectors';
import Header from './Components/Header';
import {colors} from '../../../../styles/colors';
import Input from './Components/Input';
import {
  setMessages,
  setMessageStatus,
  setSentMessage,
  setConnected,
} from '../../../../store/slice/chatSlice';
import axiosInstance from '../../../../Api/axiosConfig';
import envVar from '../../../../config/envVar';
import {useSelector, useDispatch} from 'react-redux';
import appStyles from '../../../../styles/styles';
import {chatStyles} from './styles/chat';
import {useAppContext} from '../../../../Context/AppContext';
interface ChatProps {
  navigation: any;
  route: any;
}
export default function Chat({navigation, route}: ChatProps) {
  const {chatUser} = useSelector((state: any) => state.users);

  const dispatch = useDispatch();
  const chatClient = ChatClient.getInstance();
  const audioPlayerRef = useRef<AudioRecorderPlayer | null>(null);
  const {connected, messages} = useSelector((state: any) => state.chat);
  const {userAuthInfo, tokenMemo} = useAppContext();
  const {user} = userAuthInfo;
  const {token} = tokenMemo;

  const [modalInfo, setModalInfo] = useState({
    modal: false,
    type: '',
  });

  const [message, setMessage] = useState({
    type: 'initial',
    uri: '',
    content: '',
    icon: 'microphone',
  });
  const [voicePlay, setVoicePlay] = useState<any>({
    audioData: [],
    playTime: '12:22',
    id: '',
    played: false,
  });

  const userMessages = useSelector(state =>
    selectMessagesForConversation(state, chatUser.id),
  );
  // useEffect(() => {
  //   // Subscribe to network state updates
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     // setIsConnected(state.isConnected);
  //     // console.log(state.isConnected ? 'yah it is connected ' : 'not connected');
  //     setStatus(prevState => ({
  //       ...prevState,
  //       connected: Boolean(state.isConnected),
  //     }));
  //   });
  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new AudioRecorderPlayer();
    }
    return () => {
      // Clean up the audio player instance on component unmount
      audioPlayerRef.current?.stopPlayer();
      audioPlayerRef.current = null;
    };
  }, []);

  // Sends a text message to somebody.
  const sendMsg = async () => {
    try {
      if (!connected || chatUser.id) return;
      let msg;
      if (message.type == 'text') {
        msg = ChatMessage.createTextMessage(
          String(chatUser.id),
          message.content,
        );
      }
      if (message.type == 'voice') {
        let messageInfo = {
          displayName: 'voice',
        };
        let fileUri = message.uri.replace('file:///', '/');
        msg = ChatMessage.createVoiceMessage(
          String(chatUser.id),
          fileUri,
          // message.uri,
          // messageInfo,
        );
      }
      dispatch(setSentMessage(msg));
      setMessage((prevState: any) => ({
        ...prevState,
        content: '',
        uri: '',
      }));
      const callback = new (class {
        onProgress(locaMsgId: string, progress: string) {
          // console.log(`send message process: ${locaMsgId}, ${progress}`);
          let payload = {
            conversationId: chatUser.id,
            status: 1,
            msgId: locaMsgId,
          };
          dispatch(setMessageStatus(payload));
        }
        onError(locaMsgId: string, error: any) {
          // console.log(error);
          if (error.code == 201) {
            dispatch(setConnected(false));
          }
          let payload = {
            conversationId: chatUser.id,
            status: 3,
            msgId: locaMsgId,
          };
          dispatch(setMessageStatus(payload));
        }
        onSuccess(message: any) {
          // console.log('sent', message);
          let payload = {
            conversationId: message.conversationId,
            status: 2,
            msgId: message.localMsgId,
          };
          dispatch(setMessageStatus(payload));
        }
      })();
      await chatClient.chatManager.sendMessage(msg, callback);
      // Push the new message to the messages array and update the state
    } catch (error) {
      console.error('Unexpected error occurred:', error);
    }
  };

  const getMessages = async () => {
    console.log(chatUser.id);
    try {
      let params = {
        convId: String(chatUser.id),
        convType: 0,
        msgType: ChatMessageType.TXT,
        direction: ChatSearchDirection.DOWN,
        timestamp: Date.now(),
        count: 1,
        // sender: String(user.id),
        isChatThread: false,
      };
      const textMessages = await chatClient.chatManager.getMsgsWithMsgType(
        params,
      );
      const voiceMessages = await chatClient.chatManager.getMsgsWithMsgType({
        ...params,
        msgType: ChatMessageType.VOICE,
      });
      // const allMessages = [...textMessages, ...voiceMessages].sort(
      // (a, b) => a.timestamp - b.timestamp,
      // );
      console.log(voiceMessages);
      // setMessages(voiceMessages);
      // setMessages(allMessages);
    } catch (error) {
      console.log(error);
    }
  };
  const processAudioData = position => {
    const maxHeight = 18;
    const maxAmplitude = 100;

    return Array.from({length: 50}, () => {
      const randomValue = Math.random() * maxAmplitude; // Simulate amplitude
      return (randomValue / maxAmplitude) * maxHeight; // Normalize to maxHeight
    });
  };

  const playVoice = async (item: any) => {
    try {
      if (voicePlay.played) {
        stopPlay();
        return;
      }
      let uri;
      let path;
      let checkFile = null;
      let filePath = item.body.localPath;
      // Construct the file URI
      if (item.from == user.id) {
        uri = `file://${filePath}`;
      } else {
        checkFile = await RNFS.exists(`${filePath}.m4a`);
        // const bol = await RNFS.unlink(`${filePath}.m4a`);
        // console.log(checkFile);
        // console.log(bol, checkFile);
        // console.log(filePath, checkFile);
        // return;
        if (!checkFile) {
          path = convertFile(filePath);
        }
        return 'Ss';
        uri = `file://${checkFile ? filePath : path}`;
        console.log(uri);
        return;
      }
      console.log(uri);
      // return;
      // Start the audio player
      await audioPlayerRef.current?.startPlayer(uri);
      // await audioPlay.er.startPlayer(uri);
      console.log('Playing audio:');
      setVoicePlay(prevState => ({...prevState, id: item.msgId, played: true}));

      // Add playback listener
      audioPlayerRef.current?.addPlayBackListener(e => {
        console.log('Playback progress:');

        // Process waveform data if needed
        const waveform = processAudioData(e.currentPosition); // Simulated function for visualization
        setVoicePlay(prevState => ({...prevState, audioData: waveform}));

        const positionInSeconds = e.currentPosition / 1000;
        const playTime = audioPlayerRef.current?.mmss(
          Math.floor(positionInSeconds),
        );
        setVoicePlay(prevState => ({...prevState, playtime: playTime}));

        // Stop playback when the audio finishes
        if (e.currentPosition >= e.duration) {
          stopPlay();
        }
      });
    } catch (error) {
      // Log any error during playback
      console.error('Error starting playback:', error);
    }
  };

  const convertFile = async path => {
    try {
      const newFilePath = `${path}.m4a`;
      const f = await RNFS.exists(path);
      console.log(path, f, 'sss');
      return;
      await RNFS.moveFile(path, newFilePath);
      return newFilePath;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const stopPlay = async () => {
    try {
      const res = await audioPlayerRef.current?.stopPlayer();
      setVoicePlay(prevState => ({...prevState, played: false, id: ''}));
      audioPlayerRef.current?.removePlayBackListener();
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp);

    // Get the time components
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format the date components
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'}); // Short month name
    const year = date.getFullYear();

    // Create the formatted string
    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm} ${day} ${month} ${year}`;
    return formattedTime;
  };

  const clearMessages = async () => {
    try {
      const res = await chatClient.chatManager.deleteConversation(
        String(1),
        // String(user.id),
      );
      console.log(res, 'Ss');
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await chatClient.logout();
      dispatch(setConnected(false));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={chatStyles.container}>
      {/* Header */}
      <>
        <Header
          navigation={navigation}
          token={token}
          logout={logout}
          connected={connected}
        />

        {/* chat messages ... */}

        {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={{backgroundColor: colors.accent, padding: 5}}>
            <Text style={{color: '#fff'}}>send Msg</Text>
          </TouchableOpacity>

          <Text
            style={{color: '#fff'}}
            onPress={() => console.log(userMessages)}>
            getMessages
          </Text>
        </View> */}

        <View style={styles.list}>
          <FlatList
            data={userMessages}
            contentContainerStyle={{paddingBottom: 30}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: any) => {
              return (
                <>
                  {parseInt(item.to) == user.id ? (
                    <TouchableOpacity
                      onLongPress={() => {
                        setModalInfo(() => ({modal: true, type: 'report'}));
                      }}>
                      <View style={chatStyles.myMessage}>
                        {item.body.type == 'txt' ? (
                          <Text
                            style={[
                              appStyles.bodyRg,
                              {color: colors.complimentary},
                            ]}>
                            {item.body?.content}
                          </Text>
                        ) : item.body.type == 'voice' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity onPress={() => playVoice(item)}>
                              <Icon
                                name={
                                  voicePlay.id == item.id && voicePlay.played
                                    ? 'pause'
                                    : 'play'
                                }
                                size={25}
                                color={colors.accent}
                              />
                            </TouchableOpacity>

                            {voicePlay.id == item.msgId ? (
                              <>
                                <View style={chatStyles.waveForm}>
                                  <Svg height="18" width="100%">
                                    <Polyline
                                      points={voicePlay.audioData
                                        .map(
                                          (value, index) =>
                                            `${index * 5},${18 - value}`,
                                        )
                                        .join(' ')}
                                      fill="none"
                                      stroke={colors.accent}
                                      strokeWidth="2"
                                    />
                                  </Svg>
                                </View>
                                <Text
                                  style={[
                                    appStyles.regularTxtRg,
                                    {
                                      marginLeft: 10,
                                      color: colors.complimentary,
                                    },
                                  ]}>
                                  {voicePlay.playtime}
                                </Text>
                              </>
                            ) : (
                              <View style={styles.voiceView}>
                                <Text style={{color: colors.complimentary}}>
                                  {
                                    '||||| :::: ||||| |||| ||||| ||||| ||| ||||| ::::::: |||||'
                                  }
                                </Text>
                                <Text
                                  style={{
                                    alignSelf: 'flex-end',
                                    color: colors.complimentary,
                                  }}>
                                  00:03
                                </Text>
                              </View>
                            )}
                          </View>
                        ) : (
                          <Text>File Type</Text>
                        )}
                      </View>
                      <Text style={[appStyles.smallTxt, {color: '#7B8095'}]}>
                        {formatTime(item.localTime)}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={chatStyles.mineMessage}>
                      <TouchableOpacity
                        onLongPress={() => {
                          console.log('i should set Modal');
                          setModalInfo({
                            modal: true,
                            type: 'delete',
                          });
                        }}
                        style={chatStyles.myMessageBody}>
                        {item.body.type == 'txt' ? (
                          <Text style={[{color: colors.dominant}]}>
                            {item.body?.content}
                          </Text>
                        ) : item.body.type == 'voice' ? (
                          <>
                            <View style={styles.voiceMsg}>
                              <TouchableOpacity onPress={() => playVoice(item)}>
                                <Icon
                                  name={
                                    voicePlay.id == item.msgId &&
                                    voicePlay.played
                                      ? 'pause'
                                      : 'play'
                                  }
                                  size={25}
                                  color={colors.accent}
                                />
                              </TouchableOpacity>
                              {voicePlay.id == item.msgId ? (
                                <>
                                  <View style={{width: '80%', marginLeft: 5}}>
                                    <Svg height="18" width="100%">
                                      <Polyline
                                        points={voicePlay.audioData
                                          .map(
                                            (value, index) =>
                                              `${index * 5},${18 - value}`,
                                          )
                                          .join(' ')}
                                        fill="none"
                                        stroke={colors.accent}
                                        strokeWidth="2"
                                      />
                                    </Svg>
                                  </View>

                                  <Text
                                    style={[
                                      appStyles.regularTxtRg,
                                      {marginLeft: 5},
                                    ]}>
                                    {voicePlay.playtime}
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      width: '90%',
                                    }}>
                                    <Text>
                                      {
                                        '||||| :::: ||||| |||| ||||| ||||| ||| ||||| ::::::: |||||'
                                      }
                                    </Text>
                                    <Text style={{alignSelf: 'flex-end'}}>
                                      00:03
                                    </Text>
                                  </View>
                                </>
                              )}
                            </View>
                          </>
                        ) : (
                          <Text>File Type</Text>
                        )}
                      </TouchableOpacity>
                      <View style={styles.messageAck}>
                        {item.status > 0 && item.status < 3 ? (
                          <Icon
                            name={item.status == 1 ? 'check' : 'check-all'}
                            color={item.hasReadAck ? 'blue' : colors.accent}
                            size={16}
                          />
                        ) : item.status == 3 ? (
                          <Icon
                            name="alert-circle-outline"
                            color={colors.lines}
                            size={16}
                          />
                        ) : (
                          <Icon
                            name="clock-time-four-outline"
                            color={colors.lines}
                            size={16}
                          />
                        )}
                      </View>
                      <Text style={chatStyles.messageTime}>
                        {formatTime(item.localTime)}
                      </Text>
                    </View>
                  )}
                </>
              );
            }}
          />
        </View>
        <ChatModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
        <View style={styles.input}>
          <Input
            audioPlayerRef={audioPlayerRef}
            setMessage={setMessage}
            message={message}
            sendMsg={sendMsg}
          />
        </View>
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  voiceMsg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginTop: 30,
    marginVertical: 180,
    height: deviceHeight * 0.7,
  },
  voiceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  input: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
  },
  messageAck: {position: 'absolute', right: 10, bottom: 25},
});
