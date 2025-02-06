import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator,
  BackHandler,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import liveStyles from './styles/liveStyles';
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
  RtcConnection,
  IRtcEngineEventHandler,
  ConnectionStateType,
  ConnectionChangedReasonType,
} from 'react-native-agora';
import {ChatClient} from 'react-native-agora-chat';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import AvatarSheet from './Components/AvatarSheet';
import BottomSection from './Components/BottomSection';
import {resetPodcastState, getLiveUsers} from './scripts/liveScripts';
import Header from './Podcast/Header';

import Context from '../../../../Context/Context';
import {useSelector, useDispatch} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import axiosInstance from '../../../../Api/axiosConfig';
import EndLive from './Podcast/EndLive';
import Gifts from './Podcast/Gifts';
import {setLiveStatus, updateUsers} from '../../../../store/slice/usersSlice';

import envVar from '../../../../config/envVar';
import Users from './Podcast/Users';
import {
  setPodcastListeners,
  setHostLeftPodcast,
  setRTCTokenRenewed,
  setPodcast,
  setLeaveModal,
  setUserInState,
  updatePodcastListeners,
  removeUserFromPodcast,
  getUserInfoFromAPI,
  setPrevUsersInPodcast,
} from '../../../../store/slice/podcastSlice';
import {
  setLoading,
  setSelectedGuest,
  setRoomId,
  setIsJoined,
} from '../../../../store/slice/usersSlice';
import {setConnected} from '../../../../store/slice/chatSlice';
import {checkMicrophonePermission} from '../../../../scripts';
import LiveLoading from './Components/LiveLoading';
const MAX_RETRIES = 5;

export default function GoLive({navigation}: any) {
  const chatClient = ChatClient.getInstance();
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions
  const dispatch = useDispatch();
  const {connected} = useSelector((state: any) => state.chat);
  const {podcast, podcastListeners, rtcTokenRenewed} = useSelector(
    (state: any) => state.podcast,
  );
  const {isJoined, liveStatus, roomId} = useSelector(
    (state: any) => state.user,
  );

  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const {token} = tokenMemo;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheet, setSheet] = useState<boolean>(false);
  const [sheetType, setSheetType] = useState<string | null>('');

  // callbacks

  // useEffect(() => {
  //   if (!isJoined && podcast.chat_room_id) return;

  //   const backAction = () => {
  //     dispatch(setLeaveModal(true));
  //     return true; // Prevent default back action
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [isJoined, podcast.chat_room_id, dispatch]);

  useEffect(() => {
    // Initialize the engine when the App starts
    setupVideoSDKEngine();
    // Release memory when the App is closed
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
      agoraEngineRef.current?.release();
    };
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      // Create RtcEngine after obtaining device permissions
      // dispatch(setIsJoined(false));

      console.log('initializing engine ....');
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      eventHandler.current = {
        onJoinChannelSuccess: (_connection: RtcConnection, elapsed: number) => {
          if (podcast.host == user.id) {
            // createUserChatRoom();
          } else {
            dispatch(getUserInfoFromAPI(podcast.host));
            // userJoinChatRoom(podcast.chat_room_id);
          }

          dispatch(setUserInState(user));

          if (_connection.localUid !== podcast.host) {
            getPodcastUsers();
          }
        },
        onUserJoined: (_connection: RtcConnection, uid: number) => {
          if (uid !== podcast.host) {
            dispatch(getUserInfoFromAPI(uid));
          }
          // setRemoteUid(uid);
        },
        onLeaveChannel(connection, stats) {
          console.log('user leave channel ,///');
          if (connection.localUid !== podcast.host) {
            dispatch(removeUserFromPodcast(connection.localUid));
          }
          // if (connection.localUid === podcast.host) {
          //   console.log('host is lefting podcast');
          //   hostEndedPodcast();
          //   return;
          // }
          console.log('new function', 'user has leaved the');
        },
        onUserOffline: (_connection: RtcConnection, uid: number) => {
          console.log('user offline userid:', user.id, 'uid :', uid);
          if (uid !== podcast.host) {
            dispatch(removeUserFromPodcast(uid));
          }
          if (uid === podcast.host) {
            hostEndedPodcast();
            return;
          }
        },
        onConnectionStateChanged: (
          _connection: RtcConnection,
          state: ConnectionStateType,
          reason: ConnectionChangedReasonType,
        ) => {
          console.log(state, reason);
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
      userJoinChannel();
    } catch (e) {
      console.log(e);
    }
  };
  const getPodcastUsers = async () => {
    try {
      const users = await getLiveUsers(podcast.id, 'podcast');
      if (users.length > 0) {
        dispatch(setPrevUsersInPodcast(users));
      }
    } catch (error) {
      console.error('Error getting active podcast:', error);
    }
  };
  const handelConnection = (state: number) => {
    switch (state) {
      case 3:
        dispatch(setLiveStatus('CONNECTED'));
        dispatch(setIsJoined(true));
        break;
      case 5:
        leaveAgoraChannel();
        break;
      case 1:
        dispatch(setLiveStatus('IDLE'));
        dispatch(setIsJoined(false));
        // userJoinChannel();
        console.log('disconnected');
        break;
      default:
        break;
    }
  };
  const testListners = () => {
    try {
      console.log(podcastListeners);
    } catch (error) {}
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
      dispatch(setRoomId(roomId));
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

  const userJoinChatRoom = async (roomId: any) => {
    try {
      await chatClient.roomManager.joinChatRoom(roomId);
    } catch (error) {
      console.log(error, 'error in joining chat room');
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

  const userJoinChannel = async () => {
    if (!checkPermission()) {
      Alert.alert('Error', 'Permission Required ...');
    }
    console.log('Connecting...', isJoined, user.id, podcast.host);
    // return;

    // if (!connected) {
    //   loginUser()
    //   return
    // }

    // Exit if already joined
    if (isJoined) {
      console.log('User is already in the channel.');
      dispatch(setLiveStatus('CONNECTED'));
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
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            // clientRoleType: ClientRoleType.ClientRoleAudience,
            publishMicrophoneTrack: true,
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
        dispatch(setLiveStatus('LOADING'));
        console.log('Successfully joined the channel!');
      }
    } catch (error: any) {
      console.error('Failed to join the channel:', error.message);
      throw new Error('Unable to connect to the channel. Please try again.');
    }
  };

  const checkPermission = async () => {
    const cam = await checkMicrophonePermission();
    if (cam) {
      return true;
    }
  };
  const endPodcastForUser = async () => {
    try {
      if (podcast.chat_room_id) {
        if (podcast.host == user.id) {
          chatClient.roomManager.destroyChatRoom(
            podcast.chat_room_id || roomId,
          );
        } else {
          await chatClient.roomManager.leaveChatRoom(podcast.chat_room_id);
        }
      }

      destroyEngine();
      resetPodcastState(dispatch);
      setTimeout(() => {
        dispatch(setLeaveModal(false));
        console.log('closing ....');
        navigation.navigate('HomeB');
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveAgoraChannel = () => {
    try {
      const res = agoraEngineRef.current?.leaveChannel();
      dispatch(setIsJoined(false));
      dispatch(setLiveStatus('IDLE'));
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
    console.log(item, user.id, podcast.host);
    if (user.id !== podcast.host) return;
    let update = [...podcastListeners];

    const updatedData = update.map((obj: any) => {
      if (obj.id === item.id) {
        agoraEngineRef.current?.muteRemoteAudioStream(
          item.user.id,
          !item.muted,
        );
        return {...obj, muted: !item.muted};
      }
      return obj;
    });

    // Update state or variable if necessary
    dispatch(setPodcastListeners(updatedData)); // Assuming podcastListeners is state
  };
  const leavePodcast = () => {
    if (!isJoined) {
      navigation.navigate('HomeB');
      return;
    }
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
          navigation={navigation}
          token={token}
          liveEvent={podcast}
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

        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-around',
          }}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 10}}>
            <Text style={{color: '#fff'}} onPress={testListners}>
              Chat Room Idb :{podcast.id}
            </Text>
          </View>
          {/* <View>
            <Text
              onPress={createUserChatRoom}
              style={{color: '#fff', marginVertical: 10}}>
              createUserChatRoom
            </Text>
          </View> */}
        </View>

        {/* ************ second row ************ */}

        <View
          style={{
            width: '99%',
            // backgroundColor: 'red',
            justifyContent: 'space-around',
            // justifyContent:"space-arro"
            // height: 400,
            // alignItems: 'center',
          }}>
          <FlatList
            data={podcastListeners}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              alignItems: 'center',
              alignSelf: 'center',
              // justifyContent: 'space-between',
            }}
            // keyExtractor={(item,index) => item?.id.toString()}
            renderItem={({item, index}) => (
              // <View>
              <View
                style={[styles.usersList, index > 0 ? {marginLeft: 10} : {}]}>
                {item.user ? (
                  <PodcastHost
                    muteUnmuteUser={muteUnmuteUser}
                    token={token}
                    handleOpenSheet2={handleOpenSheet2}
                    item={item}
                    dispatch={dispatch}
                  />
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.emptySeat}>
                      <Image
                        source={require('../../../../assets/images/icons/sofa.png')}
                        style={{width: 25, height: 25, borderRadius: 25}}
                      />
                    </View>

                    <Text
                      style={[
                        appStyles.paragraph1,
                        {color: colors.complimentary},
                      ]}>
                      {item.seatNo}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
        <View>
          <Text onPress={() => userJoinChatRoom(roomId)}>join room</Text>
        </View>
        <View>
          <Text onPress={() => userJoinChannel()}>userJoinChannel room</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{marginTop: 40}}
            onPress={() => {
              dispatch(updatePodcastListeners(5));
            }}>
            <Text style={{color: '#fff'}}>updated pod</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 40}}
            onPress={() => {
              dispatch(setUserInState(user));
            }}>
            <Text style={{color: '#fff'}}>userJoinChannel roomxxx</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => leaveAgoraChannel()}>
          <Text>leaveChannelx</Text>
        </TouchableOpacity>
        <EndLive
          user={user}
          endPodcastForUser={endPodcastForUser}
          navigation={navigation}
          id={podcast.id}
          live={false}
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

        <Text style={{color: '#fff'}} onPress={userJoinChannel}>
          User join channel
        </Text>

        {!sheet && (
          <BottomSection
            roomId={podcast.chat_room_id}
            handleOpenSheet={handleOpenSheet}
          />
        )}
      </ImageBackground>
      {liveStatus == 'LOADING' && <LiveLoading />}
    </View>
  );
}

const styles = StyleSheet.create({
  ...liveStyles,
  tempBtn: {marginLeft: 10, padding: 10, backgroundColor: colors.accent},
  tempBtnTxt: {
    color: colors.complimentary,
  },
});
interface PodcastHost {
  item: any;
  token: string;
  dispatch: any;
  handleOpenSheet2: any;
  muteUnmuteUser: any;
}

const PodcastHost = ({
  item,
  token,
  dispatch,
  handleOpenSheet2,
  muteUnmuteUser,
}: PodcastHost) => (
  <TouchableOpacity
    style={{
      alignItems: 'center',
    }}
    onPress={() => {
      dispatch(setSelectedGuest(item));
      handleOpenSheet2();
    }}>
    <Image
      source={
        item.user.avatar
          ? {
              uri: envVar.API_URL + 'display-avatar/' + item.user.id,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : require('../../../../assets/images/place.jpg')
      }
      style={styles.chatAvatar}
    />
    <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
      {item.user.first_name + ' ' + item.user.last_name}
    </Text>
    <View style={styles.points}>
      <Icon name="star-four-points" size={20} color={colors.dominant} />
      <Text style={[appStyles.small, {color: colors.dominant}]}>3754</Text>
    </View>
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
);
