import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import React, {
  useRef,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Tools from './Podcast/Tools';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  AudienceLatencyLevelType,
  RtcSurfaceView,
  RtcConnection,
  IRtcEngineEventHandler,
  ConnectionStateType,
  ConnectionChangedReasonType,
} from 'react-native-agora';
import {
  ChatClient,
  ChatMessageType,
  ChatOptions,
  ChatConversationType,
  ChatMessageChatType,
  ChatSearchDirection,
  ChatMessage,
} from 'react-native-agora-chat';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
// import Header
import Header from './Podcast/Header';

import Context from '../../../../Context/Context';
import {useSelector, useDispatch} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import axiosInstance from '../../../../Api/axiosConfig';
import EndLive from './Podcast/EndLive';
import Gifts from './Podcast/Gifts';
import {updateUsers} from '../../../../store/slice/usersSlice';

import envVar from '../../../../config/envVar';
import Users from './Podcast/Users';
import {
  setPodcastListeners,
  setHostLeftPodcast,
  setRTCTokenRenewed,
  setRoomId,
  setPodcast,
  setLoading,
  setLeaveModal,
} from '../../../../store/slice/podcastSlice';
import {setConnected} from '../../../../store/slice/chatSlice';
import {renewRTCToken} from '../../../../scripts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoLive({navigation}: any) {
  const chatClient = ChatClient.getInstance();
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions
  const [isJoined, setIsJoined] = useState(false);
  const dispatch = useDispatch();
  const {connected} = useSelector((state: any) => state.chat);
  const {hostId, podcast, podcastListeners, rtcTokenRenewed, roomId} =
    useSelector((state: any) => state.podcast);

  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const {token} = tokenMemo;

  const [message, setMessage] = useState({
    type: 'initial',
    uri: '',
    content: '',
    icon: 'microphone',
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [onLive, setOnLive] = useState<boolean>(false);
  const [sheet, setSheet] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [sheetType, setSheetType] = useState<string | null>('');
  const [messages, setMessages] = useState<any>([]);

  // callbacks

  useEffect(() => {
    // Initialize the engine when the App starts
    setupVideoSDKEngine();
    // Release memory when the App is closed
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
      agoraEngineRef.current?.release();
    };
  }, []);

  // Define the setupVideoSDKEngine method called when the App starts
  const setupVideoSDKEngine = async () => {
    try {
      // Create RtcEngine after obtaining device permissions

      console.log('initializing engine');
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      eventHandler.current = {
        onJoinChannelSuccess: (_connection: RtcConnection, elapsed: number) => {
          console.log('Successfully joined channel: ' + elapsed);
          if (podcast.host == user.id) {
            createUserChatRoom();
          }
          // showMessage('Successfully joined channel: ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection: RtcConnection, uid: number) => {
          console.log('Remote user ' + uid + ' joined');
          getUserInfoFromAPI(uid);
          // setRemoteUid(uid);
        },
        onUserOffline: (_connection: RtcConnection, uid: number) => {
          if (uid === hostId) {
            hostEndedPodcast();
          }

          console.log('Remote user ' + uid + ' left the channel');
          // setRemoteUid(0);
        },
        onConnectionStateChanged: (
          _connection: RtcConnection,
          state: ConnectionStateType,
          reason: ConnectionChangedReasonType,
        ) => {
          console.log('state', state, 'reason', reason);
          // setOnLive(true);
          // console.log('Connection state changed:', state, _connection);
          // console.log('reason state changed:', reason);
          handelConnection(reason, state);
        },
      };

      // Register the event handler
      agoraEngine.registerEventHandler(eventHandler.current);
      // Initialize the engine
      agoraEngine.initialize({
        appId: envVar.AGORA_APP_ID,
      });
      // agoraEngine.enableLocalAudio(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handelConnection = (reason: any, state: number) => {
    switch (reason) {
      case 9:
        handleRenewRtcToken();
        break;

      default:
        break;
    }
    switch (state) {
      case 3:
        setOnLive(true);
        setIsJoined(true);
        break;
      case 5:
        leaveChannel();
        break;
      case 1:
        console.log('disconnected');
        break;
      default:
        break;
    }
  };
  const handleRenewRtcToken = async () => {
    try {
      const role = user.id == podcast.host ? 1 : 2;
      const updateUser = await renewRTCToken(podcast.channel, role);
      setUser(updateUser);
      dispatch(setRTCTokenRenewed(true));
      await AsyncStorage.setItem('user', JSON.stringify(updateUser));
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle open Bottom Sheet
  const handleOpenSheet = useCallback((type: string) => {
    setSheet(true);
    setSheetType(type);
    bottomSheetRef.current?.expand();
  }, []);
  const handleOpenSheet2 = useCallback(() => {
    setSheet(true);
    setSheetType('avatar');
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) setSheet(false);
  }, []);

  const loginUser = async () => {
    try {
      console.log('login to chat ...');
      const loggedIn = await chatClient.isLoginBefore();
      if (!loggedIn) {
        const res = await chatClient.loginWithToken(
          String(user.id),
          user.agora_chat_token,
        );
        console.log(res);
        dispatch(setConnected(true));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUserChatRoom = async () => {
    try {
      if (!connected) {
        loginUser();
        return;
      }
      const chatRoom = await chatClient.roomManager.createChatRoom(
        'Podcast',
        'Hi',
        'welcome',
        [],
        5,
      );
      const roomId = chatRoom.roomId;

      saveChatRoomId(roomId);
      dispatch(setRoomId(roomId));
      userJoinChatRoom(roomId);
      console.log(roomId, 'Sss');
    } catch (error) {
      console.log(error, 'error in creating room');
    }
  };

  const saveChatRoomId = async (roomId: string) => {
    try {
      console.log('calling api to roomId');
      const url = envVar.API_URL + 'podcast/save-roomId';
      const data = {
        chatRoomId: roomId,
        id: podcast.id,
      };
      const res = await axiosInstance.post(url, data);
      dispatch(setPodcast(res.data.podcast));
    } catch (error) {
      console.log(error);
    }
  };
  const getUserInfoFromAPI = async (id: any) => {
    try {
      dispatch(setLoading(true));
      const idsArray = [id];
      console.log(idsArray);
      let data = {
        users: idsArray,
      };
      const url = 'users-info';
      const res = await axiosInstance.post(url, data);
      // const res = await axiosInstance.post(url, JSON.stringify(data));
      console.log(res.data);
      dispatch(setLoading(false));
      if (res.data.users.length > 0) {
        const users = res.data.users;
        let currentUser = [...podcastListeners];
        let updatedUsers = [...currentUser, ...users];
        console.log(updatedUsers);
        dispatch(setPodcastListeners(updatedUsers));
      }
    } catch (error: any) {
      // setError('error occurred: please check internet connection(API)');
      console.log(error['_response']);
      dispatch(setLoading(false));
    }
  };
  const userJoinChatRoom = async (roomId: any) => {
    try {
      await chatClient.roomManager.joinChatRoom(roomId);
    } catch (error) {
      console.log(error);
    }
  };

  const hostEndedPodcast = async () => {
    dispatch(setHostLeftPodcast(true));
    dispatch(setLeaveModal(true));
  };
  const destroyEngine = () => {
    const res = agoraEngineRef.current?.leaveChannel();

    agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
    agoraEngineRef.current?.release();
  };

  const join = async () => {
    console.log('Connecting...', isJoined, user.id, podcast.host);
    // return;

    // if (!connected) {
    //   loginUser()
    //   return
    // }

    // Exit if already joined
    if (isJoined) {
      console.log('User is already in the channel.');
      return;
    }

    try {
      // Check if Agora engine is initialized
      if (!agoraEngineRef.current) {
        throw new Error('Agora engine is not initialized.');
      }
      let result1;
      if (user.id == podcast.host) {
        console.log('Joining as a host...');
        result1 = agoraEngineRef.current.joinChannel(
          user.agora_rtc_token,
          podcast.channel,
          user.id,
          {
            channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            publishMicrophoneTrack: true,
            autoSubscribeAudio: true,
          },
        );
      } else {
        console.log('Joining as an audience...');
        result1 = agoraEngineRef.current.joinChannel(
          String(user.agora_rtc_token),
          String(podcast.channel),
          user.id,
          {
            clientRoleType: ClientRoleType.ClientRoleAudience,
            publishMicrophoneTrack: false,
            autoSubscribeAudio: true,
            audienceLatencyLevel:
              AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
          },
        );
      }
      // Check if joinChannel was successful
      if (result1 < 0) {
        throw new Error(`Failed to join channel. Error code: ${result1}`);
      }
      if (result1 == 0) {
        console.log('Successfully joined the channel!');
        // setIsJoined(true); // Update joined state
      }
    } catch (error: any) {
      console.error('Failed to join the channel:', error.message);
      throw new Error('Unable to connect to the channel. Please try again.');
    }
  };
  const endPodcastForUser = async () => {
    try {
      if (podcast.host == user.id) {
        chatClient.roomManager.destroyChatRoom(podcast.chat_room_id || roomId);
      } else {
        await chatClient.roomManager.leaveChatRoom(podcast.chat_room_id);
      }
      const res = agoraEngineRef.current?.leaveChannel();

      dispatch(setLeaveModal(false));

      // await chatClient.roomManager.leaveChatRoom(podcast.roomId);
      navigation.navigate('HomeB');
    } catch (error) {}
  };

  const leaveChannel = () => {
    try {
      const res = agoraEngineRef.current?.leaveChannel();
      // setIsJoined(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Sends a text message to somebody.
  const sendMessage = async () => {
    try {
      let msg;
      if (message.type == 'text') {
        msg = ChatMessage.createTextMessage(
          String(roomId),
          message.content,
          ChatMessageChatType.ChatRoom,
        );
      }
      if (message.type == 'voice') {
        let messageInfo = {
          displayName: 'voice',
        };
        let fileUri = message.uri.replace('file:///', '/');
        msg = ChatMessage.createVoiceMessage(
          String(roomId.id),
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
        onSuccess(message: any) {
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
  const enableAudio = () => {
    try {
      const res = agoraEngineRef.current?.enableAudio();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const podCastNotifications = async () => {
    try {
      const res = await axiosInstance.get('podcast-notification');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const muteUnmuteUser = (item: any) => {
    console.log(item);
    if (user.id !== podcast.host) return;
    let update = [...podcastListeners];

    const updatedData = update.map((obj: any) => {
      if (obj.id === item.id) {
        agoraEngineRef.current?.muteRemoteAudioStream(item.id, !item.muted);
        return {...obj, muted: !item.muted};
      }
      return obj;
    });

    // Update state or variable if necessary
    dispatch(setPodcastListeners(updatedData)); // Assuming podcastListeners is state
  };
  const leavePodcast = () => {
    dispatch(setLeaveModal(true));
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../../../assets/images/LiveBg.png')}>
        {/* ************ Header Start ************ */}
        <Header
          user={user}
          onLive={onLive}
          navigation={navigation}
          token={token}
          envVar={envVar}
          leavePodcast={leavePodcast}
          connected={connected}
        />

        {/* ************ Header end ************ */}

        {/* ************ second row ************ */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', width: 50, alignItems: 'center'}}>
            <Icon name="star-four-points" size={25} color="#F0DF00" />
            <Text
              style={[
                appStyles.regularTxtMd,
                {
                  marginLeft: 5,
                  color: colors.complimentary,
                },
              ]}>
              50.0k
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              // justifyContent: 'space-around',
            }}>
            <Image
              style={{height: 20, width: 20, borderRadius: 10}}
              source={require('../../../../assets/images/male/male.jpeg')}
            />
            <Image
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                marginHorizontal: 5,
              }}
              source={require('../../../../assets/images/live/girl2.jpg')}
            />
            <Image
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
              }}
              source={require('../../../../assets/images/live/girl3.jpg')}
            />
            <TouchableOpacity>
              <Text
                style={[
                  appStyles.regularTxtMd,
                  {
                    color: colors.complimentary,
                    marginLeft: 5,
                  },
                ]}>
                +25
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text
            onPress={createUserChatRoom}
            style={{color: '#fff', marginVertical: 10}}>
            createUserChatRoom
          </Text>
        </View>

        <Text onPress={loginUser}>login chat</Text>

        {/* ************ second row ************ */}

        <TouchableOpacity style={{marginVertical: 10}}>
          <Text onPress={join}>Join Chanel</Text>
        </TouchableOpacity>
        <Text onPress={leaveChannel}>Leave Channel</Text>
        <View>
          <FlatList
            data={podcastListeners}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}: any) => (
              <View style={styles.usersList}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSelectedUser(item);
                    handleOpenSheet2();
                  }}>
                  <Image
                    source={
                      item.avatar
                        ? {
                            uri: envVar.API_URL + 'display-avatar/' + item.id,
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        : require('../../../../assets/images/place.jpg')
                    }
                    style={styles.chatAvatar}
                  />
                  <Text
                    style={[
                      appStyles.paragraph1,
                      {color: colors.complimentary},
                    ]}>
                    {item.first_name + ' ' + item.last_name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => muteUnmuteUser(item)}
                    style={{
                      position: 'absolute',
                      right: 10,
                    }}>
                    <Icon
                      name={item.muted ? 'microphone-off' : 'microphone'}
                      // name="microphone" microphone-off

                      size={25}
                      color={colors.complimentary}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View>
          <Text onPress={() => userJoinChatRoom(roomId)}>join room</Text>
        </View>
        <View style={{marginTop: 30}}>
          <Text onPress={() => setIsJoined(false)} style={{color: '#fff'}}>
            Chat Room Idb :{roomId}
          </Text>
        </View>
        {/* <Text style={{marginTop: 10}} onPress={() => getUserInfoFromAPI(2)}>
          getUserInfoFromAPI
        </Text> */}
        <EndLive
          user={user}
          endPodcastForUser={endPodcastForUser}
          navigation={navigation}
          id={podcast.id}
        />
        {/* <View
          style={{
            flexDirection: 'row',
            width: '60%',
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={enableAudio}>
            <Image
              source={require('../../../../assets/images/male/james.jpeg')}
              style={{width: 60, height: 60, borderRadius: 35}}
            />
            <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
              Enbale audio
            </Text>
            <View style={styles.points}>
              <Icon name="star-four-points" size={20} color={colors.dominant} />
              <Text style={[appStyles.small, {color: colors.dominant}]}>
                12.5K
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../../../assets/images/live/girl5.jpg')}
              style={{width: 60, height: 60, borderRadius: 35}}
            />
            <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
              Olivia An
            </Text>
            <View style={styles.points}>
              <Icon name="star-four-points" size={20} color={colors.dominant} />
              <Text style={[appStyles.small, {color: colors.dominant}]}>
                3754
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
        <Text style={{color: '#fff'}} onPress={destroyEngine}>
          destroyEngine
        </Text>
        <BottomSheet
          index={-1}
          enablePanDownToClose={true}
          // snapPoints={[sheetType == 'avatar' ? '45%' : '60%']}
          snapPoints={['60%']}
          ref={bottomSheetRef}
          handleStyle={{
            backgroundColor: colors.LG,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.complimentary,
          }}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            {sheetType == 'gifts' ? (
              <Gifts />
            ) : sheetType == 'avatar' ? (
              <AvatarSheet
                selectedUser={selectedUser}
                navigation={navigation}
                token={token}
                envVar={envVar}
                dispatch={dispatch}
              />
            ) : sheetType == 'users' ? (
              <Users />
            ) : (
              <Tools />
            )}
          </BottomSheetView>
        </BottomSheet>
        {!sheet && <BottomSection handleOpenSheet={handleOpenSheet} />}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    padding: 10,
  },
  reportBtn: {
    borderRadius: 25,
    paddingHorizontal: 10,
    borderColor: colors.body_text,
    borderWidth: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 30,
    left: 30,
    paddingVertical: 5,
  },
  users: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-around',
  },
  btn1: {
    position: 'relative',
    flexDirection: 'row',
    width: '99%',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usersList: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-around',
  },
  chatAvatar: {width: 60, height: 60, borderRadius: 35},
  sofa: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#874975',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: '#11132c',
    color: colors.complimentary,
    borderWidth: 1,
    width: '50%',
    borderStartEndRadius: 48,
    borderRadius: 50,
    alignSelf: 'flex-start',
    borderStartStartRadius: 48,
  },
  action: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.LG,
  },
  sheetAvatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.lines,
  },
  sheetUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 20,
  },
  followBtn: {
    width: '45%',
    borderRadius: 25,
    padding: 20,
    borderColor: colors.complimentary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetStatus: {
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  points: {
    flexDirection: 'row',
    backgroundColor: colors.semantic,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
  },
  sheetAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
  },
  sheetBtnTxt: {
    ...appStyles.regularTxtMd,
    color: colors.body_text,
    textAlign: 'center',
  },
});

interface BottomSectionProps {
  handleOpenSheet: any;
}

const BottomSection = ({handleOpenSheet}: BottomSectionProps) => {
  return (
    <View style={{position: 'absolute', bottom: '5%'}}>
      <View style={{flexDirection: 'row', width: '80%'}}>
        <Text style={[appStyles.bodyMd, {color: colors.yellow}]}>
          Emo Live :{' '}
        </Text>
        <Text
          style={[
            appStyles.bodyRg,
            {color: colors.complimentary, textAlign: 'left'},
          ]}>
          {' '}
          Great to see you here. Please don’t use abusive language, enjoy the
          stream, Have fun😊
        </Text>
      </View>
      <View style={styles.btn1}>
        <TextInput
          style={styles.inputBox}
          placeholder="Say hello ...."
          placeholderTextColor={'grey'}
        />
        <View style={styles.action}>
          <TouchableOpacity>
            <Icon
              name="dots-horizontal"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="microphone-off"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenSheet('tools')}>
            <IconM
              name="emoji-emotions"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenSheet('gifts')}>
            <Image
              source={require('../../../../assets/images/bag.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>

        {/* <Icon name="dots-horizontal" color={colors.complimentary} size={24} /> */}
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 17}}></Text>
      </View>
    </View>
  );
};

interface AvatarSheetProps {
  navigation: any;
  selectedUser: any;
  token: string;
  envVar: any;
  dispatch: any;
}
const AvatarSheet = ({
  navigation,
  selectedUser,
  token,
  envVar,
  dispatch,
}: AvatarSheetProps) => {
  useDispatch;
  const followUser = async (item: any) => {
    try {
      const url = item.is_followed
        ? '/user/un-follow-user/' + item.id
        : '/user/follow-user/' + item.id;
      // setLoading(true);
      const res = await axiosInstance.get(url);
      // setLoading(false);
      dispatch(updateUsers(res.data.users));
    } catch (error: any) {
      console.log(error);
      // clearError();
      // setError(error.message);
    }
  };
  return (
    <View style={{position: 'relative', paddingTop: 30}}>
      <TouchableOpacity style={styles.reportBtn}>
        <IconM name="warning" size={25} color={colors.body_text} />
        <Text style={[appStyles.bodyMd, {color: colors.body_text}]}>
          Report
        </Text>
      </TouchableOpacity>
      <View style={{width: '99%', alignItems: 'center'}}>
        <Image
          style={styles.sheetAvatar}
          source={
            selectedUser.avatar
              ? {
                  uri: envVar.API_URL + 'display-avatar/' + selectedUser.id,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              : require('../../../../assets/images/place.jpg')
          }
        />
        <Text
          style={[
            appStyles.paragraph1,
            {color: colors.complimentary, marginTop: 10},
          ]}>
          {selectedUser.first_name + ' ' + selectedUser.last_name}
        </Text>
        <View style={styles.sheetUser}>
          <Text style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
            ID:{selectedUser.id}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="google-maps" size={23} color={colors.semantic} />
            <Text
              style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
              {selectedUser.address ? selectedUser.address : 'Please Provide '}
            </Text>
          </View>
        </View>

        <View style={styles.sheetStatus}>
          <View>
            <Text style={[appStyles.headline2, {color: colors.complimentary}]}>
              1.54k
            </Text>
            <Text
              style={[
                appStyles.bodyMd,
                {color: colors.body_text, marginTop: 5},
              ]}>
              Fans
            </Text>
          </View>
          <View>
            <Text style={[appStyles.headline2, {color: colors.complimentary}]}>
              19.4k
            </Text>
            <Text
              style={[
                appStyles.bodyMd,
                {color: colors.body_text, marginTop: 5},
              ]}>
              Sending
            </Text>
          </View>
          <View>
            <Text style={[appStyles.headline2, {color: colors.complimentary}]}>
              205.7k
            </Text>
            <Text
              style={[
                appStyles.bodyMd,
                {color: colors.body_text, marginTop: 5},
              ]}>
              Beans
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.sheetAction}>
        <TouchableOpacity
          style={[styles.followBtn, {backgroundColor: colors.accent}]}>
          <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
            Follow
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.followBtn, {borderWidth: 1}]}
          onPress={() =>
            navigation.navigate('Chat', {receiverUser: selectedUser})
          }>
          <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
