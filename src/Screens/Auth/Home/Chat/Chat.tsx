import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Svg, {Polyline} from 'react-native-svg';
import {setConnected} from '../../../../store/slice/chatSlice';
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
import Context from '../../../../Context/Context';
import {colors} from '../../../../styles/colors';
import NetInfo, {useNetInfo, refresh} from '@react-native-community/netinfo';
import Input from './Components/Input';
import axiosInstance from '../../../../Api/axiosConfig';
import envVar from '../../../../config/envVar';
import {useSelector, useDispatch} from 'react-redux';
import appStyles from '../../../../styles/styles';
import {chatStyles} from './styles/chat';
interface ChatProps {
  navigation: any;
  route: any;
}
export default function Chat({navigation, route}: ChatProps) {
  const dispatch = useDispatch();
  const chatClient = ChatClient.getInstance();
  // const chatManager = chatClient.get
  const audioPlayerRef = useRef<AudioRecorderPlayer | null>(null);
  const {initialized, connected, error} = useSelector(
    (state: any) => state.chat,
  );
  const visitProfile = useSelector(
    (state: any) => state.usersReducer.visitProfile,
  );
  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const {token} = tokenMemo;

  const receiverUser = route.params.receiverUser;
  const [tempUsers, setTempUsers] = useState([
    {
      account_verified: 0,
      address: 'Buner kpk',
      agora_chat_token:
        '007eJxTYPjyYIZ6qIX8UsFWG61996cHWZ24ErjjP2ee6Yo/Fwx2/9VTYEhOMjS3sDC1TEszMDQxMEixMEhJNjFISTU0N09LTUlKvnChLr3hXV36p29JTIwMrAyMQAjiMzIYAgA1ZSOL',
      agora_chat_uid: null,
      avatar: 'users/avatars/1736019229.jpg',
      bio: 'Save earth live',
      created_at: '2024-12-28T19:27:39.000000Z',
      dob: '2021-02-20',
      email: 'imrankhan@gmail.com',
      first_name: 'Imran',
      gender: 'male',
      id: 1,
      last_name: 'Khan',
      phone: null,
      provider: null,
      provider_id: null,
      updated_at: '2025-01-08T19:24:00.000000Z',
      user_name: null,
    },
    {
      account_verified: 0,
      address: 'buner kpk',
      agora_chat_token:
        '007eJxTYOApXp5s7lJfz2LrZ12aqrnKWiX4z7Rld/5fvsTE+1P6aKsCQ3KSobmFhallWpqBoYmBQYqFQUqyiUFKqqG5eVpqSlLypot16Unv69K1GBhZGBlYGRiBEMRnZDACAE77Hu4=',
      agora_chat_uid: null,
      avatar: 'users/avatars/1736177116.jpg',
      bio: 'something should happen special',
      created_at: '2024-12-28T19:50:57.000000Z',
      dob: '1997-03-15',
      email: 'zalkip@gmail.com',
      first_name: 'zalkip',
      gender: 'male',
      id: 2,
      last_name: 'khan',
      phone: null,
      provider: null,
      provider_id: null,
      updated_at: '2025-01-08T19:27:46.000000Z',
      user_name: null,
    },
  ]);
  const [status, setStatus] = useState({
    connected: false,
    error: '',
  });

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
  const [modal, setShowModal] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  const [renewToken, setRenewToken] = useState(false);
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

  useEffect(() => {
    // Registers listeners for messaging.
    const setMessageListener = () => {
      console.log('run message listner ...');
      let msgListener = {
        onMessagesReceived(messagesReceived: any) {
          console.log(messages);
          setMessages((prevMessages: any) => {
            const updatedMessages = [...prevMessages, ...messagesReceived];
            // console.log('Updated messages:', updatedMessages);
            return updatedMessages;
          });
        },
        onCmdMessagesReceived: messages => {
          // let msgs= messages
          // msgs.push(messages)
          // setMessages(msgs)
        },
        onMessagesRead: messages => {
          console.log('onMessagesRead: ' + JSON.stringify(messages));
        },
        onGroupMessageRead: groupMessageAcks => {},
        onMessagesDelivered: messages => {},
        onMessagesRecalled: messages => {},
        onConversationsUpdate: () => {},
        onConversationRead: (from, to) => {},
      };
      chatClient.chatManager.removeAllMessageListener();
      chatClient.chatManager.addMessageListener(msgListener);
    };
    if (connected) {
      setMessageListener();
    }
  }, [connected]);

  const getConversationDevice = async () => {
    try {
      const convId = 2;
      // const convId = receiverUser.id;
      // chatClient.chatManager.
      const convType = ChatConversationType.PeerChat;
      // const vv = await chatClient.chatManager.getAllConversations();
      const vv = await chatClient.chatManager.getConversation(
        String(1),
        0,
        false,
        false,
      );
      console.log(convId, 'sss', vv);
      return;

      const conversation = await chatClient.chatManager.getConversation(
        convId,
        0,
        // convType,
        false,
      );
      console.log(conversation);
    } catch (error) {
      console.log(error);
    }
  };

  // Logs in with an account ID and a token.
  const login = async () => {
    const isLoggedIn = await chatClient.isLoginBefore();
    if (isLoggedIn) {
      setStatus({...status, connected: true});
      dispatch(setConnected(true));
      console.log('User is already logged in.');
      return; // Prevent duplicate login
    }

    if (!initialized) console.log('Perform initialization first.');
    try {
      await chatClient.loginWithToken(String(user.id), user.agora_chat_token);
      console.log('login operation success.');
    } catch (error: any) {
      console.log(error);
      if (error.code == 2) {
        setStatus({...status, error: error.description});
        return;
      }
      if (error.code == 111 || error.code == 202) {
        callApiForRenewToken();
      }
      console.log(error);
    }
  };
  // Logs out from server.
  const logout = async () => {
    if (!initialized) console.log('Perform initialization first.');
    console.log('start logout ...');
    try {
      await chatClient.logout();
      console.log('logout success.');
      setStatus({...status, connected: false});
    } catch (error) {
      console.log('logout fail:' + JSON.stringify(error));
    }
  };
  // Sends a text message to somebody.
  const sendMsg = async () => {
    try {
      if (!initialized) console.log('Perform initialization first.');
      let msg;
      if (message.type == 'text') {
        msg = ChatMessage.createTextMessage(
          String(receiverUser.id),
          message.content,
          ChatMessageChatType.PeerChat,
        );
      }
      if (message.type == 'voice') {
        let messageInfo = {
          displayName: 'voice',
        };
        let fileUri = message.uri.replace('file:///', '/');
        msg = ChatMessage.createVoiceMessage(
          String(receiverUser.id),
          fileUri,
          // message.uri,
          // messageInfo,
        );
      }
      const callback = new (class {
        onProgress(locaMsgId, progress) {
          console.log(`send message process: ${locaMsgId}, ${progress}`);
        }
        onError(locaMsgId, error) {
          setMessage((prevState: any) => ({
            ...prevState,
            content: '',
            uri: '',
          }));
          console.log(
            `send message fail: ${locaMsgId}, ${JSON.stringify(error)}`,
          );
        }
        onSuccess(message) {
          Alert.alert('Test', 'message sent');
          setMessage((prevState: any) => ({
            ...prevState,
            content: '',
            uri: '',
          }));
          const updatedMessages = [...messages, message];
          setMessages(updatedMessages);
          // console.log('send message success: ' + message.localMsgId);
        }
      })();
      await chatClient.chatManager.sendMessage(msg, callback);
      // Push the new message to the messages array and update the state
    } catch (error) {
      console.error('Unexpected error occurred:', error);
    }
  };

  const getMessages = async () => {
    console.log(receiverUser.id);
    try {
      let params = {
        convId: String(receiverUser.id),
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
      setMessages(voiceMessages);
      // setMessages(allMessages);
    } catch (error) {
      console.log(error);
    }
  };
  const getFromServer = async () => {
    try {
      let params = {
        convId: String(receiverUser.id),
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
      setMessages(voiceMessages);
      // setMessages(allMessages);
    } catch (error) {
      console.log(error);
    }
  };
  const getMessagesx = () => {
    console.log(receiverUser.id);
    chatClient.chatManager
      .getMsgsWithMsgType({
        convId: String(receiverUser.id),
        convType: 0,
        msgType: ChatMessageType.TXT,
        direction: ChatSearchDirection.DOWN,
        timestamp: Date.now(),
        count: 4,
        // sender: String(user.id),
        isChatThread: false,
      })
      .then(messages => {
        console.log('get message success', messages);
      })
      .catch(reason => {
        console.log('get message fail.', reason);
      });
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
  const callApiForRenewToken = async () => {
    try {
      const res = await axiosInstance.get('/renew-agora-token');
      console.log(res.data.user);
      setRenewToken(true);
      setUser(res.data.user);
      // await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
      console.log(error);
    }
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

  return (
    <View style={chatStyles.container}>
      <>
        <View style={chatStyles.chatHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left-thin"
                size={25}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Image
                style={{width: 43, height: 43, borderRadius: 25}}
                source={
                  receiverUser.avatar
                    ? {
                        uri:
                          envVar.API_URL + 'display-avatar/' + receiverUser.id,
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    : require('../../../../assets/images/place.jpg')
                }
              />
              <View style={{marginLeft: 10}}>
                <Text style={chatStyles.user}>
                  {receiverUser.first_name + ' ' + receiverUser.last_name}
                </Text>
                <Text
                  style={chatStyles.userStatus}
                  onPress={() => navigation.navigate('Chat2')}>
                  offline
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                logout();
                // console.log(list);
              }}>
              <Icon
                name="trash-can-outline"
                size={25}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10}} onPress={login}>
              <Icon
                name="information-outline"
                size={25}
                color={connected ? colors.complimentary : colors.accent}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* chat messages ... */}

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: '#fff'}} onPress={getConversationDevice}>
            get conversation
          </Text>
          <Text style={{color: '#fff'}} onPress={sendMsg}>
            send Msg
          </Text>
          <Text style={{color: '#fff'}} onPress={getMessages}>
            getMessages
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: '#fff'}} onPress={clearMessages}>
            Clear Messages
          </Text>
          <Text style={{color: '#fff'}} onPress={() => setMessages([])}>
            Clear state
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
            marginVertical: 180,
            height: deviceHeight * 0.7,
          }}>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: any) => {
              return (
                <>
                  {parseInt(item.to) == user.id ? (
                    <TouchableOpacity
                      onLongPress={() => {
                        setModalInfo({modal: true, type: 'report'});
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
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: '90%',
                                }}>
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
                          setModalInfo({modal: true, type: 'report'});
                        }}
                        style={chatStyles.myMessageBody}>
                        {item.body.type == 'txt' ? (
                          <Text style={[{color: colors.dominant}]}>
                            {item.body?.content}
                          </Text>
                        ) : item.body.type == 'voice' ? (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
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
                      <View
                        style={{position: 'absolute', right: 10, bottom: 25}}>
                        {item.status > 0 ? (
                          <Icon
                            name={item.status == 1 ? 'check' : 'check-all'}
                            color={item.isRead ? 'blue' : colors.accent}
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

        <Modal
          visible={modalInfo.modal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}>
          {/* Backdrop */}
          <View style={chatStyles.backdrop}>
            {/* Modal Content */}
            <View style={chatStyles.modalView}>
              <Text style={[appStyles.title1, {color: colors.complimentary}]}>
                {modalInfo.type === 'delete'
                  ? 'Delete Conversation'
                  : 'Report a Problem'}
              </Text>
              <View style={{marginVertical: 20}}>
                <Text
                  style={[appStyles.regularTxtMd, {color: colors.body_text}]}>
                  {modalInfo.type == 'delete'
                    ? 'All will be permanently deleted for yourself'
                    : 'Nudity, indecent exposure fake profile etc.'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalInfo({...modalInfo, modal: false})}
                style={[chatStyles.deleteButton]}>
                <Text style={chatStyles.deleteText}>
                  {modalInfo.type == 'delete' ? 'Delete' : 'Report'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalInfo({...modalInfo, modal: false})}
                style={chatStyles.cancelButton}>
                <Text style={[appStyles.paragraph1, {color: colors.unknown2}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            width: '100%',
          }}>
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
