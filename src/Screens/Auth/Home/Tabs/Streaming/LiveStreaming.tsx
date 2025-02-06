import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Platform,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import appStyles from '../../../../../styles/styles';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Streams from './Streams';
import BottomSection from '../Components/BottomSection';
import AvatarSheet from '../Components/AvatarSheet';
import liveStyles from '../styles/liveStyles';
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
  VideoSourceType,
} from 'react-native-agora';
import Context from '../../../../../Context/Context';
import LiveLoading from '../Components/LiveLoading';
import Header from '../Podcast/Header';
import envVar from '../../../../../config/envVar';
import {setLiveStatus} from '../../../../../store/slice/usersSlice';
import {ChatClient} from 'react-native-agora-chat';
import {
  setHostLeftPodcast,
  setLeaveModal,
} from '../../../../../store/slice/podcastSlice';
import axios from 'axios';
import {
  setStreamListeners,
  updateStreamListeners,
  setUserInState,
  removeUserFromStream,
  setPrevUsersInStream,
} from '../../../../../store/slice/streamingSlice';
import {resetLiveStreaming, getLiveUsers} from '../scripts/liveScripts';
import {setConnected} from '../../../../../store/slice/chatSlice';
import {useSelector, useDispatch} from 'react-redux';
import EndLive from '../Podcast/EndLive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../../styles/colors';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {
  renewRTCToken,
  renewRTMToken,
  checkCamPermission,
  checkMicrophonePermission,
} from '../../../../../scripts';
import Gifts from '../Podcast/Gifts';
import Users from '../Podcast/Users';
import Tools from '../Podcast/Tools';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setRTCTokenRenewed,
  setLoading,
  setIsJoined,
} from '../../../../../store/slice/usersSlice';
import axiosInstance from '../../../../../Api/axiosConfig';
const MAX_RETRIES = 5;

export default function LiveStreaming({navigation}) {
  // const chatClient = ChatClient.getInstance();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {stream, streamListeners, roomId} = useSelector(
    (state: any) => state.streaming,
  );
  const {isJoined, loading, liveStatus} = useSelector(
    (state: any) => state.user,
  );

  const {user, setUser} = userAuthInfo;
  const {token} = tokenMemo;
  const [sheet, setSheet] = useState<boolean>(false);
  const [sheetType, setSheetType] = useState<string | null>('');
  const dispatch = useDispatch();

  const {connected} = useSelector((state: any) => state.chat);
  const [isMuted, setIsMuted] = useState(false); // State to track mute/unmute status

  // Generate a list of hosts

  useEffect(() => {
    // Initialize the engine when the App starts
    // setupVideoSDKEngine();
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
          // previewHostStream();
          dispatch(setUserInState(user));

          if (stream.host == user.id) {
            // createUserChatRoom();
          }
          if (_connection.localUid !== stream.host) {
            getStreamActiveUsers();
          }
        },
        onUserJoined: (_connection: RtcConnection, uid: number) => {
          console.log(
            'Remote user ' + uid + ' joined',
            Platform.OS == 'ios' ? 'IOS' : 'Android',
          );
          if (uid !== user.id) {
            getUserInfoFromAPI(uid);
          }
          // setRemoteUid(uid);
        },
        onLeaveChannel(connection, stats) {
          console.log('user leave channel ,///');
          if (connection.localUid !== stream.host) {
            dispatch(removeUserFromStream(connection.localUid));
          }
          // if (connection.localUid === podcast.host) {
          //   console.log('host is lefting podcast');
          //   hostEndedPodcast();
          //   return;
          // }
          console.log('new function', 'user has leaved the');
        },

        onUserOffline: (_connection: RtcConnection, uid: number) => {
          if (uid === stream.host) {
            hostEndedPodcast();
            return;
          }
          if (uid !== stream.host) {
            dispatch(removeUserFromStream(uid));
          }
        },
        onConnectionStateChanged: (
          _connection: RtcConnection,
          state: ConnectionStateType,
          reason: ConnectionChangedReasonType,
        ) => {
          console.log('state', state, 'reason', reason);
          handelConnection(state);
        },
      };

      // Register the event handler
      agoraEngine.registerEventHandler(eventHandler.current);
      // Initialize the engine
      agoraEngine.initialize({
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        appId: envVar.AGORA_APP_ID,
      });
      // agoraEngine.enableLocalAudio(true);
      agoraEngine.enableLocalVideo(true);
      userJoinChannel();
    } catch (e) {
      console.log(e);
    }
  };

  const hostEndedPodcast = async () => {
    // dispatch(setHostLeftPodcast(true));
    dispatch(setLeaveModal(true));
  };
  const getStreamActiveUsers = async () => {
    try {
      // console.log(podcast.id, 'getting podcast users ....');
      const users = await getLiveUsers(stream.id, 'stream');
      if (users.length > 0) {
        dispatch(setPrevUsersInStream(users));
      }
    } catch (error) {
      console.error('Error getting active stream users:', error);
    }
  };
  const handelConnection = (state: number) => {
    switch (state) {
      case 3:
        dispatch(setLiveStatus('CONNECTED'));
        dispatch(setIsJoined(true));
        break;
      case 4:
        dispatch(setLiveStatus('LOADING'));
        break;
      case 5:
        dispatch(setLiveStatus('IDLE'));
        dispatch(setIsJoined(false));
        leaveAgoraChannel();
        break;
      case 1:
        dispatch(setLiveStatus('IDLE'));
        dispatch(setIsJoined(false));
        console.log('disconnected');
        break;
      default:
        break;
    }
  };
  const leaveAgoraChannel = async () => {
    try {
      if (agoraEngineRef.current) {
        agoraEngineRef.current.leaveChannel(); // Leave the channel
        dispatch(setIsJoined(false));
        console.log('Left the Agora channel successfully');
      } else {
        console.log('Agora engine is not initialized');
      }
    } catch (error) {
      console.log('Error leaving the channel:', error);
    }
  };

  const userJoinChannel = async () => {
    console.log('Connecting...', isJoined, user.id, stream.host);
    // return;
    const permission = checkPermission();
    if (!permission) {
      console.log('permssion required');
      return;
    }

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
      if (user.id == stream.host) {
        console.log('Joining stream as a host...');
        result1 = agoraEngineRef.current.joinChannel(
          String(user.agora_rtc_token),
          String(stream.channel),
          user.id,
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            publishMicrophoneTrack: true,
            publishCameraTrack: true,
            autoSubscribeAudio: true,
          },
        );
      } else {
        console.log('Joining as an audience...');
        result1 = agoraEngineRef.current.joinChannel(
          String(user.agora_rtc_token),
          String(stream.channel),
          user.id,
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            // clientRoleType: ClientRoleType.ClientRoleAudience,
            publishMicrophoneTrack: false,
            publishCameraTrack: true,
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
        console.log('Successfully joined the channel x');
        // setIsJoined(true); // Update joined state
      }
    } catch (error: any) {
      console.error('Failed to join the channel:', error.message);
      throw new Error('Unable to connect to the channel. Please try again.');
    }
  };

  const checkPermission = async () => {
    const cam = await checkCamPermission();
    const microphone = await checkMicrophonePermission();
    if (cam || microphone) {
      return true;
    }
    Alert.alert('Permission Required', 'Unable to start Live');
  };

  const createUserChatRoom = async (retryCount = 0) => {
    try {
      if (!connected) {
        console.log('Not connected, logging in first...');
        loginUser();
        return;
      }

      console.log('Creating chat room...');
      const chatRoom = await chatClient.roomManager.createChatRoom(
        'Podcast',
        'Hi',
        'welcome',
        [],
        5,
      );

      const roomId = chatRoom.roomId;
      saveChatRoomId(roomId);
      // dispatch(setRoomId(roomId));
      userJoinChatRoom(roomId);
      console.log(roomId, 'Chat room created successfully');
    } catch (error: any) {
      console.log('Error creating chat room:', error);

      if (error.code === 2 || error.code === 300) {
        if (retryCount < MAX_RETRIES) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Retrying in ${delay / 1000} seconds...`);
          setTimeout(() => createUserChatRoom(retryCount + 1), delay);
        } else {
          Alert.alert(
            'Network Error',
            'Failed to create chat room after multiple attempts.',
          );
        }
      }
    }
  };

  const userJoinChatRoom = async (roomId: any) => {
    try {
      await chatClient.roomManager.joinChatRoom(roomId);
    } catch (error) {
      console.log(error);
    }
  };
  const hostEndedStream = async () => {
    try {
      dispatch(setHostLeftPodcast(true));
      dispatch(setLeaveModal(true));
      return;

      const url = envVar.LOCAL_URL + 'podcast/end' + stream.id;
      const data = {
        id: stream.id,
      };
      const res = await axios.post(url);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hostEndedStreamx = async () => {
    try {
      dispatch(setHostLeftPodcast(true));
      dispatch(setLeaveModal(false));
      return;

      const url = envVar.LOCAL_URL + 'stream/end' + stream.id;
      const data = {
        id: stream.id,
      };
      const res = await axios.post(url);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveChatRoomId = async (roomId: string) => {
    try {
      const url = envVar.LOCAL_URL + 'stream/save-roomId';
      const data = {
        chatRoomId: roomId,
        id: stream.id,
      };
      const res = await axios.post(url, JSON.stringify(data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfoFromAPI = async (id: number) => {
    try {
      const currentUsers = [...streamListeners];
      if (currentUsers.some(item => item.user?.id === id)) return;

      dispatch(setLoading(true));
      const {data} = await axiosInstance.post('users-info', {users: [id]});

      if (data.users?.[0]) {
        const emptyRoomIndex = currentUsers.findIndex(
          item => !item.occupied && !item.user,
        );

        if (emptyRoomIndex !== -1) {
          currentUsers[emptyRoomIndex] = {
            ...currentUsers[emptyRoomIndex],
            user: data.users[0],
            occupied: true,
          };
          dispatch(setStreamListeners(currentUsers));
        } else {
          console.warn('No empty rooms available');
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const filterOutUser = async (uid: number | undefined) => {
    try {
      let currentUsers = [...streamListeners];
      const emptyRoomIndex = currentUsers.findIndex(
        item => item.occupied && item.user.id == uid,
      );
      if (emptyRoomIndex !== -1) {
        // Assign user to empty room
        currentUsers[emptyRoomIndex] = {
          ...currentUsers[emptyRoomIndex],
          user: null,
          occupied: false,
        };
        dispatch(setStreamListeners(currentUsers));
      } else {
        console.warn('user not found in listener');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMute = (id: any) => {
    try {
      console.log(id);
      if (agoraEngineRef.current) {
        // Toggle mute/unmute for the remote user
        agoraEngineRef.current.muteRemoteAudioStream(id, !isMuted);
        agoraEngineRef.current.muteLocalAudioStream(true);
        setIsMuted(!isMuted); // Update the state
        console.log(`User ${id} is ${isMuted ? 'unmuted' : 'muted'}`);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };
  const endPodcastForUser = async () => {
    try {
      console.log('i am called ...');
      if (stream.chat_room_id) {
        if (stream.chat_room_id) {
          if (stream.host == user.id) {
            chatClient.roomManager.destroyChatRoom(
              stream.chat_room_id || roomId,
            );
          } else {
            await chatClient.roomManager.leaveChatRoom(stream.chat_room_id);
          }
        }
      }
      destroyEngine();
      setTimeout(() => {
        dispatch(setLeaveModal(false));
        navigation.navigate('HomeB');
      }, 400);
      // await chatClient.roomManager.leaveChatRoom(podcast.roomId);
    } catch (error) {}
  };

  const destroyEngine = () => {
    resetLiveStreaming(dispatch);

    const res = agoraEngineRef.current?.leaveChannel();

    agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
    agoraEngineRef.current?.release();
  };
  const toggleCamera = () => {
    try {
      if (agoraEngineRef.current) {
        console.log('toogle camera');
        // Toggle mute/unmute for the remote user
        const res = agoraEngineRef.current.switchCamera();
        console.log(res);
        // console.log(`User ${id} is ${isMuted ? 'unmuted' : 'muted'}`);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };
  const loginUser = async () => {
    try {
      setLoading(true);
      console.log('login to chat ...');
      const loggedIn = await chatClient.isLoginBefore();
      console.log(loggedIn);
      if (loggedIn) {
        setConnected(true);
      }
      if (!loggedIn) {
        const res = await chatClient.loginWithToken(
          String(user.id),
          user.agora_chat_token,
        );
        // console.log(res);
        setLoading(false);
        dispatch(setConnected(true));
      }
    } catch (error: any) {
      if (error.code == 202) {
        renewUserRTMToken();
      }
      console.log(error);
    }
  };
  const renewUserRTMToken = async () => {
    try {
      const userUpdated = await renewRTMToken();
      if (userUpdated) {
        setUser(userUpdated);
        await AsyncStorage.setItem('user', JSON.stringify(userUpdated));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const enableLocalVideo = () => {
    try {
      // const
      console.log('open cam');
      agoraEngineRef.current?.enableVideo();
      agoraEngineRef.current?.startPreview(
        VideoSourceType.VideoSourceCameraPrimary,
      );
      console.log('cam opend');
    } catch (error) {
      console.log(error);
    }
  };
  const leaveStream = () => {
    dispatch(setLeaveModal(true));
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
  // Render a single host view
  const renderHost = ({item, index}) => (
    <View style={styles.hostView}>
      {item.user ? (
        <>
          <React.Fragment key={item.user.id}>
            <RtcSurfaceView
              canvas={{
                uid: item.user.id,
                // sourceType: VideoSourceType.VideoSourceRemote,
              }}
              style={styles.videoView}
            />
          </React.Fragment>
          <Text
            style={[
              {
                position: 'absolute',
                bottom: 10,
                textAlign: 'center',
                alignSelf: 'center',
                color: colors.complimentary,
              },
            ]}>
            {' '}
            {item.user.first_name + ' ' + item.user.last_name}
          </Text>
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <Icon name="sofa-single" color={'#CDC6CE'} size={60} />
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              Apply to join
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../../../../assets/images/LiveBg.png')}>
        <Header
          user={user}
          navigation={navigation}
          token={token}
          liveEvent={stream}
          envVar={envVar}
          leavePodcast={leaveStream}
          connected={connected}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={enableLocalVideo}>
            <Text style={{color: '#fff'}}>
              enableLocalVideo ss {stream.host}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // previewHostStream();
            }}>
            <Text style={{color: '#fff'}}>preview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              userJoinChannel();
            }}>
            <Text style={{color: '#fff', marginTop: 10}}>join</Text>
          </TouchableOpacity>
        </View>
        {/* <Text
          style={{marginTop: 20, color: '#fff'}}
          onPress={() => console.log(streamListeners)}>
          sss
        </Text> */}

        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => console.log(streamListeners)}>
          <Text style={{color: '#fff'}}>leave channel</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={createUserChatRoom}>
          <Text style={{color: '#fff'}}>createUserChatRoom</Text>
        </TouchableOpacity> */}
        <View
          style={{
            marginTop: 30,
            height: '50%',
          }}>
          <FlatList
            data={streamListeners}
            renderItem={Streams}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item => item.id.toString()}
            numColumns={3}
          />
        </View>

        <EndLive
          user={user}
          endPodcastForUser={endPodcastForUser}
          navigation={navigation}
          id={stream.id}
          live={true}
        />
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
                navigation={navigation}
                token={token}
                envVar={envVar}
              />
            ) : sheetType == 'users' ? (
              <Users />
            ) : (
              <Tools />
            )}
          </BottomSheetView>
        </BottomSheet>
        {!sheet && (
          <BottomSection
            roomId={stream.chat_room_id}
            handleOpenSheet={handleOpenSheet}
          />
        )}
        {liveStatus == 'LOADING' && <LiveLoading />}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    // backgroundColor: '#B0BCBF',
    // flexGrow: 0.5,
    // alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent white
    // height: 30,
  },

  ...liveStyles,
  muteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 50,
  },
  CamButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 50,
  },
  tempBtn: {marginLeft: 10, padding: 10, backgroundColor: colors.accent},
  tempBtnTxt: {
    color: colors.complimentary,
  },
});
