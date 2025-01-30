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
import Header from '../Podcast/Header';
import envVar from '../../../../../config/envVar';
import {setLeaveModal} from '../../../../../store/slice/podcastSlice';
import {ChatClient} from 'react-native-agora-chat';
import {setHostLeftPodcast} from '../../../../../store/slice/podcastSlice';
import axios from 'axios';
import {
  setStreamListeners,
  updateStreamListeners,
} from '../../../../../store/slice/streamingSlice';
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
} from '../../../../../scripts';
import Gifts from '../Podcast/Gifts';
import Users from '../Podcast/Users';
import Tools from '../Podcast/Tools';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setRTCTokenRenewed,
  setLoading,
} from '../../../../../store/slice/usersSlice';
import axiosInstance from '../../../../../Api/axiosConfig';

export default function LiveStreaming({navigation}) {
  const chatClient = ChatClient.getInstance();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const {token} = tokenMemo;
  const [sheet, setSheet] = useState<boolean>(false);
  const [sheetType, setSheetType] = useState<string | null>('');
  const dispatch = useDispatch();

  const [isJoined, setIsJoined] = useState(false);
  const [onLive, setOnLive] = useState(false);
  const {hostId, guests, stream, streamListeners, rtcTokenRenewed, roomId} =
    useSelector((state: any) => state.streaming);
  const {loading} = useSelector((state: any) => state.usersReducer);
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions
  const {connected} = useSelector((state: any) => state.chat);
  const [isMuted, setIsMuted] = useState(false); // State to track mute/unmute status

  // Generate a list of hosts

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
          previewHostStream();
          if (stream.host == user.id) {
            createUserChatRoom();
          }
          setIsJoined(true);
          setOnLive(true);
        },
        onUserJoined: (_connection: RtcConnection, uid: number) => {
          console.log(
            'Remote user ' + uid + ' joined',
            Platform.OS == 'ios' ? 'IOS' : 'Android',
          );
          if (uid !== stream.host) {
            getUserInfoFromAPI(uid);
          }
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
      agoraEngine.enableLocalAudio(true);
      agoraEngine.enableLocalVideo(true);
    } catch (e) {
      console.log(e);
    }
  };

  const hostEndedPodcast = async () => {
    // dispatch(setHostLeftPodcast(true));
    dispatch(setLeaveModal(true));
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
        console.log('connected on agora');
        break;
      case 5:
        leaveAgoraChannel();
        break;
      case 1:
        console.log('disconnected');
        break;
      default:
        break;
    }
  };
  const previewHostStream = () => {
    console.log('previewHostStream');
    const host = {
      id: stream.host,
      name: 'imran',
    };
    let updateArray = [host];
    console.log(updateArray);
    dispatch(setStreamListeners(updateArray));
  };
  const handleRenewRtcToken = async () => {
    try {
      setLoading(true);
      const role = user.id == stream.host ? 1 : 2;
      const updateUser = await renewRTCToken(stream.channel, role);
      setUser(updateUser);
      dispatch(setRTCTokenRenewed(true));
      await AsyncStorage.setItem('user', JSON.stringify(updateUser));
    } catch (error) {
      console.log(error);
    }
  };

  const leaveAgoraChannel = async () => {
    try {
      if (agoraEngineRef.current) {
        agoraEngineRef.current.leaveChannel(); // Leave the channel
        setIsJoined(false);
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
          String(stream.channel),
          user.id,
          {
            clientRoleType: ClientRoleType.ClientRoleAudience,
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
        console.log('Successfully joined the channel!');
        // setIsJoined(true); // Update joined state
      }
    } catch (error: any) {
      console.error('Failed to join the channel:', error.message);
      throw new Error('Unable to connect to the channel. Please try again.');
    }
  };

  const checkPermission = async () => {
    const cam = await checkCamPermission();
    if (cam) {
      return true;
    }
  };

  const createUserChatRoom = async () => {
    try {
      const chatRoom = await chatClient.roomManager.createChatRoom(
        'Stream',
        'Hi',
        'welcome',
        [],
        3,
      );
      const roomId = chatRoom.roomId;
      saveChatRoomId(roomId);
      // setRoomId(roomId);
      userJoinChatRoom(roomId);
      console.log(roomId, 'Sss');
    } catch (error: any) {
      console.log(error, 'ss');
      if (error.code == 300) {
        Alert.alert('Network error', error.description);
      }
      console.log(error, 'creating host');
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
  const getUserInfoFromAPI = async (id: string | number) => {
    try {
      const idsArray = [id];
      const data = {
        users: idsArray,
      };
      console.log('Request Data:', data);

      const url = 'users-info';
      const res = await axiosInstance.post(url, data);

      console.log('API Response:', res.data);

      if (res.data.users.length > 0) {
        const users = res.data.users;
        // Create a new array without mutating the original state directly
        const updatedUsers = [...streamListeners];
        // Replace the first element with the new user data
        // updatedUsers[0] = users[0];
        updatedUsers.unshift(users[0]);
        // currentUser.shift();
        // if (stream.listeners > 2) {
        updatedUsers.pop();
        // }

        console.log('Updated Users:', updatedUsers);

        // Dispatch the updated array to the state
        dispatch(setStreamListeners(updatedUsers));
      }
    } catch (error: any) {
      console.error(
        'API Error:',
        error.response ? error.response.data : error.message,
      );
      // Optionally, set an error state or display a user-friendly message
      // dispatch(setError('An error occurred. Please check your internet connection.'));
    }
  };
  // Calculate the number of rows and columns based on the number of hosts
  const getGridLayout = () => {
    if (guests <= 1) {
      return {rows: 1, cols: 1};
    } else if (guests <= 4) {
      return {rows: 2, cols: 2};
    } else if (guests <= 6) {
      return {rows: 3, cols: 2};
    } else {
      return {rows: Math.ceil(guests / 2), cols: 2};
    }
  };
  const {rows, cols} = getGridLayout();

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
        if (stream.host == user.id) {
          chatClient.roomManager.destroyChatRoom(stream.chat_room_id || roomId);
        } else {
          await chatClient.roomManager.leaveChatRoom(stream.chat_room_id);
        }
      }
      dispatch(setLeaveModal(false));
      const res = agoraEngineRef.current?.leaveChannel();
      agoraEngineRef.current?.release();

      dispatch(setLeaveModal(false));

      // await chatClient.roomManager.leaveChatRoom(podcast.roomId);
      navigation.navigate('HomeB');
    } catch (error) {}
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
    if (!onLive || !isJoined) {
      navigation.navigate('HomeB');
      return;
    }
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
      {item.id ? (
        <>
          <React.Fragment key={item.id}>
            <RtcSurfaceView
              canvas={{
                uid: item.id,
                sourceType: VideoSourceType.VideoSourceRemote,
              }}
              style={styles.videoView}
            />
          </React.Fragment>
          <Text>{item.id}</Text>
        </>
      ) : (
        <Text>Waiting for user {index} to join </Text>
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
          onLive={onLive}
          navigation={navigation}
          token={token}
          envVar={envVar}
          leavePodcast={leaveStream}
          connected={connected}
        />
        <TouchableOpacity onPress={loginUser}>
          <Text style={{color: '#fff'}}>"ss" {JSON.stringify(connected)}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={enableLocalVideo}>
            <Text style={{color: '#fff'}}>enableLocalVideo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              previewHostStream();
            }}>
            <Text style={{color: '#fff'}}>preview</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{marginTop: 20, color: '#fff'}}
          onPress={() => console.log(streamListeners)}>
          sss
        </Text>

        <Text style={{color: '#fff', marginTop: 10}} onPress={userJoinChannel}>
          join
        </Text>

        <TouchableOpacity style={{marginTop: 20}} onPress={leaveAgoraChannel}>
          <Text style={{color: '#fff'}}>leave channel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={createUserChatRoom}>
          <Text style={{color: '#fff'}}>createUserChatRoom</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          {/* Local View (50% of the screen) */}
          <View style={styles.localView}>
            {onLive ? (
              <>
                <React.Fragment key={user.id}>
                  {/* Create a local view using RtcSurfaceView */}
                  <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
                  <Text>Local user uid: {0}</Text>
                </React.Fragment>
                {/* <RtcSurfaceView
                canvas={{
                  uid: 0,
                  // uid: user.id,
                }}
              /> */}
                <Text>{user.id}</Text>
                <TouchableOpacity
                  onPress={() => toggleMute(user.id)}
                  style={styles.muteButton}>
                  <Icon
                    name={isMuted ? 'volume-off' : 'volume-high'}
                    size={20}
                    color={colors.complimentary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleCamera()}
                  style={styles.CamButton}>
                  <Icon
                    name={'camera-flip'}
                    size={20}
                    color={colors.complimentary}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <Text>connecting to server</Text>
            )}
            {/* <Text>Local View</Text> */}
          </View>
          <View style={styles.gridContainer}>
            <FlatList
              data={streamListeners}
              renderItem={renderHost}
              keyExtractor={(item, index) => index.toString()}
              // keyExtractor={item => item.id.toString()}
              numColumns={cols}
              contentContainerStyle={styles.grid}
            />
          </View>
        </View>

        <EndLive
          user={user}
          endPodcastForUser={endPodcastForUser}
          navigation={navigation}
          id={stream.id}
          live={true}
        />
      </ImageBackground>
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
      {!sheet && <BottomSection handleOpenSheet={handleOpenSheet} />}
    </View>
  );
}

const styles = StyleSheet.create({
  localView: {
    flex: 1, // Takes 50% of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  gridContainer: {
    flex: 1, // Takes 50% of the screen
  },
  grid: {
    flexGrow: 1,
    // height: 340,
  },
  hostView: {
    flex: 1,
    // height: 340,
    aspectRatio: 1, // Ensure each host view is square
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
  },
  // videoView: {
  //   flex: 1,
  //   aspectRatio: 1,
  // },
  videoView: {width: '90%', height: 200, backgroundColor: 'red'},
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
  // videoView: {width: '90%', height: 200, backgroundColor: 'red'},
});
