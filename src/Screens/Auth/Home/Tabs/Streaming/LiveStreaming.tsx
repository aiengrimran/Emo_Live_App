import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useRef, useEffect, useState, useContext} from 'react';
import appStyles from '../../../../../styles/styles';
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
import envVar from '../../../../../config/envVar';
import {setModalInfo} from '../../../../../store/slice/podcastSlice';
import {ChatClient} from 'react-native-agora-chat';
import {setHostLeftPodcast} from '../../../../../store/slice/podcastSlice';
import axios from 'axios';
import {setStreamListeners} from '../../../../../store/slice/streamingSlice';

import {useSelector, useDispatch} from 'react-redux';
import EndLive from '../Podcast/EndLive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../../styles/colors';
import axiosInstance from '../../../../../Api/axiosConfig';

export default function LiveStreaming({navigation}) {
  const chatClient = ChatClient.getInstance();
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const {userAuthInfo} = useContext(Context);
  const {user} = userAuthInfo;
  const dispatch = useDispatch();

  const [isJoined, setIsJoined] = useState(false);
  const [onLive, setOnLive] = useState(false);
  const {hostId, stream, streamListeners, rtcTokenRenewed, roomId} =
    useSelector((state: any) => state.streaming);
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions
  const {guests} = useSelector((state: any) => state.streaming);
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
          if (stream.host == user.id) {
            // createUserChatRoom()
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
            hostEndedStream();
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
          handelConnection(reason);
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

  const createUserChatRoom = async () => {
    try {
      const chatRoom = await chatClient.roomManager.createChatRoom(
        'Stream',
        'Hi',
        'welcome',
        [],
        guests,
      );
      const roomId = chatRoom.roomId;
      saveChatRoomId(roomId);
      // setRoomId(roomId);
      userJoinChatRoom(roomId);
      console.log(roomId, 'Sss');
    } catch (error) {
      console.log(error, 'ss');
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
      let payload = {
        modal: true,
        isHost: false,
      };
      dispatch(setModalInfo(payload));
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

  const handelConnection = (state: number) => {
    switch (state) {
      case 1:
        setOnLive(true);
        break;
      case 9:
        if (!rtcTokenRenewed) {
          // renewRtcToken();
        }
        // setOnLive(true);
        break;
      case 1:
        setOnLive(true);
        break;
      default:
        break;
    }
  };

  const hostEndedStreamx = async () => {
    try {
      dispatch(setHostLeftPodcast(true));
      let payload = {
        modal: true,
        isHost: false,
      };
      dispatch(setModalInfo(payload));
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
  const hostsList = Array.from({length: guests}, (_, i) => i + 1);

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
        updatedUsers.pop();

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
      if (agoraEngineRef.current) {
        // Toggle mute/unmute for the remote user
        agoraEngineRef.current.muteRemoteAudioStream(id, !isMuted);
        setIsMuted(!isMuted); // Update the state
        console.log(`User ${id} is ${isMuted ? 'unmuted' : 'muted'}`);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };
  // Render a single host view
  const renderHost = ({item, index}) => (
    <View style={styles.hostView}>
      {item.id ? (
        <RtcSurfaceView
          canvas={{
            uid: item.id,
            sourceType: VideoSourceType.VideoSourceRemote,
          }}
          style={styles.videoView}></RtcSurfaceView>
      ) : (
        <Text>Waiting for user {index} to join </Text>
      )}
    </View>
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: Platform.OS == 'ios' ? 60 : 30,
        }}>
        <Text style={styles.heading}>Start Live</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-end', marginTop: -22}}>
          <Icon name="close" size={25} color={colors.complimentary} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        {/* Local View (50% of the screen) */}
        <View style={styles.localView}>
          {onLive ? (
            <>
              <RtcSurfaceView
                canvas={{
                  uid: user.id,
                }}
              />
              <TouchableOpacity
                onPress={() => toggleMute(user.id)}
                style={styles.muteButton}>
                <Icon
                  name={isMuted ? 'volume-off' : 'volume-high'}
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
            keyExtractor={item => item.id.toString()}
            numColumns={cols}
            contentContainerStyle={styles.grid}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
    padding: 10,
  },
  heading: {
    ...appStyles.headline,
    color: colors.complimentary,
    textAlign: 'center',
    alignSelf: 'center',
  },
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
  videoView: {
    flex: 1,
    aspectRatio: 1,
  },
  muteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 50,
  },
  // videoView: {width: '90%', height: 200, backgroundColor: 'red'},
});
