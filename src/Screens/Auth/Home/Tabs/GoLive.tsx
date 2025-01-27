import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Platform,
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
import {ChatClient} from 'react-native-agora-chat';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import Context from '../../../../Context/Context';
import {useSelector, useDispatch} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import axiosInstance from '../../../../Api/axiosConfig';
import EndLive from './Podcast/EndLive';
import Gifts from './Podcast/Gifts';
import {updateUsers} from '../../../../store/slice/usersSlice';
// const podcast = {
//   title: 'get to gether',
//   duration: '20',
//   type: 'public',
//   listeners_added: 'null',
//   host: 1,
//   status: 'STARTED',
//   channel: 'ch_91287_5473',
//   updated_at: '2025-01-25T07:48:07.000000Z',
//   created_at: '2025-01-25T07:48:07.000000Z',
//   id: 3,
// };
import envVar from '../../../../config/envVar';
import Users from './Podcast/Users';
import axios from 'axios';
import {
  setModalInfo,
  setPodcastListeners,
  setHostLeftPodcast,
  setRoomId,
} from '../../../../store/slice/podcastSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoLive({navigation}: any) {
  const chatClient = ChatClient.getInstance();
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions

  const [isJoined, setIsJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.usersReducer.users);
  const {hostId, podcast, podcastListeners, roomId} = useSelector(
    (state: any) => state.podcast,
  );
  // const {hostId,podcast} = useSelector((state: any) => state.podcast);

  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const {token} = tokenMemo;
  const localToken =
    user.id == 1
      ? '32|qzTMhPRcuTIVn6rIarSu9ald2mTQaQ60YUxp7iOV09be42ba'
      : '34|wpjSAN9CJShZCXoxV7l6F52zp4VkTj9w6ka1UObvfebe0ec1';
  let channelToken =
    user.id == 1
      ? '007eJxTYDB/tjV3Wv5UvkPHrlSaivf9PW5+c3OasVBCk/IhNw7+5aIKDMlJhuYWFqaWaWkGhiYGBikWBinJJgYpqYbm5mmpKUnJVzdNSW8IZGSYsSiQmZEBAkGAlyE5I97S0MjCPN7UxNyYkUELAGxgII0='
      : '007eJxTYFDOLd50L5Xrb0v/y5Y5S/28HKVb3xdwnjJ3CPqV5qP3jlmBITnJ0NzCwtQyLc3A0MTAIMXCICXZxCAl1dDcPC01JSnZZ9OU9IZARobd+28wMTJAIAjwMiRnxFsaGlmYx5uamBszMmgBAH3pISE=';
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheet, setSheet] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  // const [users, setUsers] = useState<Array<any>>([]);
  const [sheetType, setSheetType] = useState<string | null>('');

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
    if (index < 0) setSheet(false);
  }, []);

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
        onJoinChannelSuccess: (_connection: RtcConnection, uid: number) => {
          console.log('Successfully joined channel: ' + uid);

          // createUserChatRoom()
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
          console.log('Connection state changed:', state, _connection);
          console.log('reason state changed:', reason);
        },
      };

      // Register the event handler
      agoraEngine.registerEventHandler(eventHandler.current);
      // Initialize the engine
      agoraEngine.initialize({
        appId: envVar.AGORA_APP_ID,
      });
      // Enable local video
      // agoraEngine.enableVideo();
      // agoraEngine.enableLocalAudio(true);
      //   agoraEngine.enableLocalAudio(true);
    } catch (e) {
      console.log(e);
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

  const createUserChatRoom = async () => {
    if (user.can_create_chat_room) {
      createChatRoomHost();
      return;
    }
    try {
      const url = envVar.LOCAL_URL + 'chat-room/create/super-admin';
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      });
      console.log(res.data);
      if (res.status == 201) {
        setUser(res.data.user);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        createChatRoomHost();
      }
    } catch (error) {
      Alert.alert('Error', 'user: Please try again');
      console.log(error);
    }
  };
  const createChatRoomHost = async () => {
    try {
      const chatRoom = await chatClient.roomManager.createChatRoom(
        'Podcast',
        'Hi',
        'wellcome',
        [],
        5,
      );
      const roomId = chatRoom.roomId;
      saveChatRoomId(roomId);
      setRoomId(roomId);
      userJoinChatRoom(roomId);
      console.log(roomId, 'Sss');
    } catch (error) {
      console.log(error, 'ss');
    }
    try {
    } catch (error) {}
  };
  const saveChatRoomId = async (roomId: string) => {
    try {
      const url = envVar.LOCAL_URL + 'podcast/save-roomId';
      const data = {
        chatRoomId: roomId,
        id: podcast.id,
      };
      const res = await axios.post(url, JSON.stringify(data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserInfoFromAPI = async (id: any) => {
    try {
      const idsArray = [id];
      let data = {
        users: idsArray,
      };
      console.log(data);
      const url = 'users-info';
      const res = await axiosInstance.post(url, data);
      // const res = await axiosInstance.post(url, JSON.stringify(data));
      console.log(res.data);
      if (res.data.users.length > 0) {
        const users = res.data.users;
        let currentUser = [...podcastListeners];
        let updatedUsers = [...currentUser, ...currentUser];
        dispatch(setPodcastListeners(updatedUsers));
      }
    } catch (error: any) {
      // setError('error occurred: please check internet connection(API)');
      console.log(error['_response']);
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
    try {
      dispatch(setHostLeftPodcast(true));
      let payload = {
        modal: true,
        isHost: false,
      };
      dispatch(setModalInfo(payload));
      return;

      const url = envVar.LOCAL_URL + 'podcast/end' + podcast.id;
      const data = {
        id: podcast.id,
      };
      const res = await axios.post(url);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const join = () => {
    console.log('connecting', isJoined);
    if (isJoined) {
      return;
    }

    try {
      if (!agoraEngineRef.current) {
        throw new Error('Agora engine is not initialized.');
      }
      let result1;

      if (isHost) {
        console.log('Joining as a host...');
        // Join the channel as a broadcaster
        result1 = agoraEngineRef.current.joinChannel(
          channelToken,
          // token,
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
        // Join the channel as an audience
        result1 = agoraEngineRef.current.joinChannel(
          channelToken,
          // user.agora_rtc_token,
          podcast.channel,
          user.id,
          {
            // channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
            clientRoleType: ClientRoleType.ClientRoleAudience,
            publishMicrophoneTrack: false, // Audience shouldn't publish microphone
            autoSubscribeAudio: true,
            audienceLatencyLevel:
              AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
          },
        );
      }
      console.log('result1', result1);

      console.log('Successfully joined the channel!');
    } catch (error) {
      console.error('Failed to join the channel:', error);
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

      // await chatClient.roomManager.leaveChatRoom(podcast.roomId);
      navigation.navigate('Home');
    } catch (error) {}
  };

  const leaveChannel = () => {
    try {
      const res = agoraEngineRef.current?.leaveChannel();
      setIsJoined(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveUsers = async () => {
    try {
      const res = await axiosInstance.get('/chat/active-users');
      console.log(res.data);
      dispatch(updateUsers(res.data.users));
    } catch (error) {
      console.log(error);
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
  const startPodCast = async () => {
    try {
      const url = 'podcast/start';
      const data = {
        title: 'Start View',
        duration: 10,
        listeners: 2,
        type: 'PUBLIC',
      };
      const res = await axiosInstance.post(url, JSON.stringify(data));
      console.log(res.data);
    } catch (error) {}
  };
  const podCastNotifications = async () => {
    try {
      const res = await axiosInstance.get('podcast-notification');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const leavePodcast = () => {
    let payload = {
      modal: true,
      isHost: user.id == hostId,
    };
    dispatch(setModalInfo(payload));
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../../../assets/images/LiveBg.png')}>
        <Header
          user={user}
          getActiveUsers={getActiveUsers}
          navigation={navigation}
          token={token}
          envVar={envVar}
          leavePodcast={leavePodcast}
        />
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
        <Text onPress={createUserChatRoom}>
          {isHost ? 'i am host' : 'i am subscriber'}
        </Text>
        <Text
          style={{color: '#fff', marginVertical: 10}}
          onPress={() => setIsHost(!isHost)}>
          Update hOst
        </Text>
        <TouchableOpacity style={{marginVertical: 10}}>
          <Text onPress={join}>Join Chanel</Text>
        </TouchableOpacity>
        <Text onPress={leaveChannel}>Leave Channel</Text>
        <View>
          <FlatList
            data={users}
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
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View>
          <Text onPress={() => userJoinChatRoom(roomId)}>join room</Text>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={{color: '#fff'}}>Chat Room Id :{roomId}</Text>
        </View>
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
  header: {
    marginTop: Platform.OS == 'ios' ? 50 : 20,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
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
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    alignItems: 'center',
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
  addBtn: {
    padding: 2,
    backgroundColor: '#F00044',
    borderRadius: 20,
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
interface HeaderProps {
  user: any;
  getActiveUsers: any;
  navigation: any;
  token: string;
  envVar: any;
  leavePodcast: any;
  // getActiveUsers
}

const Header = ({
  user,
  getActiveUsers,
  navigation,
  token,
  envVar,
  leavePodcast,
}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={
            user.avatar
              ? {
                  uri: envVar.API_URL + 'display-avatar/' + user.id,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              : require('../../../../assets/images/place.jpg')
          }
          // source={require('../../../../assets/images/live/girl1.jpg')}
          style={{width: 28, height: 28, borderRadius: 15}}
        />
        <Text style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
          {user.last_name}
        </Text>
        <View style={{backgroundColor: '#08FEF8', padding: 2, borderRadius: 1}}>
          <Text style={{color: 'black', fontSize: 6, fontWeight: '500'}}>
            LV:1
          </Text>
        </View>
        <TouchableOpacity onPress={getActiveUsers} style={styles.addBtn}>
          <Icon name="plus" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '30%',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TempUI')}>
          <IconM name="warning" size={25} color="#F0DF00" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="eye" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={leavePodcast}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('HomeB')}> */}
          <Icon name="close" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
          placeholderTextColor={'#fff'}
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
