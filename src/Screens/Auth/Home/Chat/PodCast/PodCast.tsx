// Import React Hooks
import React, {useRef, useState, useEffect} from 'react';
// Import user interface elements
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';
// Import components related to obtaining Android device permissions
import {PermissionsAndroid, Platform} from 'react-native';
// Import Agora SDK
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
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';

import {
  checkPermission,
  checkAudioInputPermission,
} from '../../../../../scripts';

// Define basic information
const appId = 'cb178859ff01400d80dc40de177fedbc';
const token =
  '007eJxTYJAJy/Nz3y63V37hV6aq5Ba5W8nhfHlibUt+vznd8Fw5aIUCQ3KSobmFhallWpqBoYmBQYqFQUqyiUFKqqG5eVpqSlLyVN/e9IZARobs38GMjAwQCOKzMJSkFpcwMAAA+n4fHw==';
const channelName = 'test';
// const uid = 0; // Local user Uid, no need to modify

const App = () => {
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
  const [isHost, setIsHost] = useState(true); // User role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // User prompt message
  const [uid, setUid] = useState(0); // User prompt message
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions

  useEffect(() => {
    // Initialize the engine when the App starts
    setupVideoSDKEngine();
    // Release memory when the App is closed
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
      agoraEngineRef.current?.release();
    };
  }, []);

  const checkCamPermission = async () => {
    // const result =await checkPermission();
    const result2 = await checkAudioInputPermission();
    console.log(result2);

    try {
    } catch (error) {}
  };

  // Define the setupVideoSDKEngine method called when the App starts
  const setupVideoSDKEngine = async () => {
    try {
      // Create RtcEngine after obtaining device permissions

      console.log('initializing engine');
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      eventHandler.current = {
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined channel: ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection: RtcConnection, uid: number) => {
          showMessage('Remote user ' + uid + ' joined');
          setRemoteUid(uid);
        },
        onUserOffline: (_connection: RtcConnection, uid: number) => {
          showMessage('Remote user ' + uid + ' left the channel');
          setRemoteUid(0);
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
        appId: appId,
      });
      // Enable local video
      // agoraEngine.enableVideo();
      agoraEngine.enableLocalAudio(true);
      //   agoraEngine.enableLocalAudio(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getPermissionImran = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) {
        console.log('Permission granted');
        // accessMicrophone();
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  // Define the join method called after clicking the join channel button
  const joinold = async () => {
    if (isJoined) {
      return;
    }
    try {
      if (isHost) {
        // Start preview
        // Join the channel as a broadcaster
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          // Set channel profile to live broadcast
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          // Set user role to broadcaster
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          // Publish audio collected by the microphone
          publishMicrophoneTrack: true,
          // Publish video collected by the camera
          autoSubscribeAudio: true,
        });
      } else {
        console.log('visitor joining ...');
        // Join the channel as an audience
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          // Set channel profile to live broadcast
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          // Set user role to audience
          clientRoleType: ClientRoleType.ClientRoleAudience,
          // Do not publish audio collected by the microphone
          publishMicrophoneTrack: true,
          // Automatically subscribe to all audio streams
          autoSubscribeAudio: true,
          // Change the delay level of the audience to achieve ultra-fast live broadcast
          audienceLatencyLevel:
            AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const join = () => {
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
        result1 = agoraEngineRef.current.joinChannel(token, channelName, uid, {
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          publishMicrophoneTrack: true,
          autoSubscribeAudio: true,
        });
      } else {
        console.log('Joining as an audience...');
        // Join the channel as an audience
        result1 = agoraEngineRef.current.joinChannel(token, channelName, uid, {
          // channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          clientRoleType: ClientRoleType.ClientRoleAudience,
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          publishMicrophoneTrack: false, // Audience shouldn't publish microphone
          autoSubscribeAudio: true,
          audienceLatencyLevel:
            AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
        });
      }
      console.log('result1', result1);

      console.log('Successfully joined the channel!');
    } catch (error) {
      console.error('Failed to join the channel:', error);
      throw new Error('Unable to connect to the channel. Please try again.');
    }
  };

  // Define the leave method called after clicking the leave channel button
  const leave = () => {
    try {
      // Call leaveChannel method to leave the channel
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('Left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const test = () => {
    const info = agoraEngineRef.current?.getUserInfoByUid(uid);
    console.log(info);
  };

  // Render user interface
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head} onPress={() => setUid(2)}>
        Agora Video SDK Quickstart {uid}
      </Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join Channel
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave Channel
        </Text>
      </View>
      <Text onPress={test}>hello world</Text>
      <View style={styles.btnContainer}>
        <Text>Audience</Text>
        <Switch
          onValueChange={switchValue => {
            setIsHost(switchValue);
            if (isJoined) {
              leave();
            }
          }}
          value={isHost}
        />
        <Text>Host</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined && isHost ? (
          <React.Fragment key={0}>
            {/* Create a local view using RtcSurfaceView */}
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            {/* Create a remote view using RtcSurfaceView */}
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>
            {isJoined && !isHost ? 'Waiting for remote user to join' : ''}
          </Text>
        )}
        <Text style={styles.info}>{message}</Text>
        <Text onPress={checkCamPermission}>Get Permision </Text>
      </ScrollView>
    </SafeAreaView>
  );

  // Display information
  function showMessage(msg: string) {
    setMessage(msg);
  }
};

// Define user interface styles
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200, backgroundColor: 'red'},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
});

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};

export default App;
