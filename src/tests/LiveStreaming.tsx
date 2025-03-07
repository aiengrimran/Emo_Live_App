import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  AppState,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import envVar from '../config/envVar';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  AudienceLatencyLevelType,
  RtcSurfaceView,
  RtcConnection,
  IRtcEngineEventHandler,
  RtcSurfaceViewProps,
  ConnectionStateType,
  ConnectionChangedReasonType,
  VideoSourceType,
} from 'react-native-agora';
import {colors} from '../styles/colors';

import {checkCamPermission, checkMicrophonePermission} from '../scripts';
import {useAppContext} from '../Context/AppContext';

export default function LiveStreaming() {
  const {userAuthInfo} = useAppContext();
  const {user} = userAuthInfo;
  const [userTemp, setUserTemp] = useState<any>('');
  const [isJoined, setIsJoined] = useState(false);
  const [remote, setRemote] = useState<any>({
    joined: false,
    id: null,
  });
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Implement callback functions
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance

  useEffect(() => {
    // Initialize the engine when the App starts
    setupVideoSDKEngine();
    // Release memory when the App is closed
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
      agoraEngineRef.current?.release();
    };
  }, []);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        console.log('Keeping screen awake');
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove(); // Cleanup the event listener
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
          // previewHostStream();
          console.log('channel joined', _connection.localUid);
        },
        onUserJoined: (_connection: RtcConnection, uid: number) => {
          //   console.log(
          //     'Remote user ' + uid + ' joined',
          //     Platform.OS == 'ios' ? 'IOS' : 'Android',
          //   );
          setRemote(() => ({joined: true, id: uid}));
          console.log('channel joined', _connection.localUid);

          // setRemoteUid(uid);
        },
        onLeaveChannel(connection, stats) {
          console.log('user leave channel ,///', connection.localUid);
        },

        onUserOffline: (_connection: RtcConnection, uid: number) => {
          console.log('user offline ', _connection.localUid);
          setRemote(() => ({joined: false, id: null}));
        },
        onNetworkQuality(connection, remoteUid, txQuality, rxQuality) {
          console.log(connection.localUid, 'connection', 'user => ', user.id);
          console.log(
            `User: ${remoteUid}, Upload Quality: ${txQuality}, Download Quality: ${rxQuality}`,
          );
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
      //   agoraEngine.enableLocalAudio(true);
      agoraEngine.enableLocalVideo(true);
      // agoraEngine.setLocalPublishFallbackOption()
      // agoraEngine.
    } catch (e) {
      console.log(e);
    }
  };
  const handelConnection = (state: number) => {
    switch (state) {
      case 3:
        console.log('CONNECTED');
        setIsJoined(true);
        break;
      case 4:
        break;
      case 5:
        setIsJoined(false);
        break;
      case 1:
        console.log('disconnected');
        break;
      default:
        break;
    }
  };
  const updateUser = () => {
    switch (user.id) {
      case 1:
        setUserTemp({
          id: user.id,
          token:
            '007eJxTYJDInbrXc9p6yfhwAd/LN91e6k+WYuXMY5nnsvIsK1NVfr4CQ3KSobmFhallWpqBoYmBQYqFQUqyiUFKqqG5eVpqSlLyN4vl6Q2BjAyKzXcZGRkYGViAGASYwCQzmGQBk+wMJanFJYZGxowMhgCu8h0O',
          name: user.first_name,
        });

        break;
      case 2:
        setUserTemp({
          id: user.id,
          token:
            '007eJxTYHhg6b9ql+K9oOC7dx7URVrKbV/00eDh3ikx576mdbqtetGowJCcZGhuYWFqmZZmYGhiYJBiYZCSbGKQkmpobp6WmpKULG65PL0hkJHh+ZzrrIwMjAwsQAwCTGCSGUyygEl2hpLU4hJDI2NGBiMA86Ui2Q==',
          name: user.first_name,
        });

        break;

      default:
        setUserTemp({
          id: user.id,
          token:
            '007eJxTYJAwCVFy3VvmsEzj+wLp54devJ4UsM5T9m5AJOdv4aBDOiIKDMlJhuYWFqaWaWkGhiYGBikWBinJJgYpqYbm5mmpKUnJ8yyWpzcEMjJM2/OQiZGBkYEFiEGACUwyg0kWMMnOUJJaXGJoZMzEYGgCAJWBH3w=',
          name: user.first_name,
        });

        break;
    }
  };

  const userJoinChannel = async () => {
    console.log('Connecting...', isJoined, userTemp.id);
    const permission = checkPermission();
    if (!permission) {
      console.log('permssion required');
      return;
    }

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
      if (user.id == 1) {
        console.log('Joining stream as a host...');
        result1 = agoraEngineRef.current.joinChannel(
          String(userTemp.token),
          String('test123'),
          userTemp.id,
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            // publishMicrophoneTrack: true,
            publishCameraTrack: true,
            autoSubscribeVideo: true,
            // autoSubscribeAudio: true,
          },
        );
      } else {
        console.log('Joining as an audience...');
        result1 = agoraEngineRef.current.joinChannel(
          String(userTemp.token),
          String('test123'),
          userTemp.id,
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            // clientRoleType: ClientRoleType.ClientRoleAudience,
            // publishMicrophoneTrack: true,
            // publishCameraTrack: true,
            autoSubscribeVideo: true,
            publishCameraTrack: true,
            // autoSubscribeAudio: true,
            // audienceLatencyLevel:
            //   AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
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
  };
  const destroyEngine = () => {
    console.log('destroying engine');
    const channelLeave = agoraEngineRef.current?.leaveChannel();
    let handler = agoraEngineRef.current?.unregisterEventHandler(
      eventHandler.current!,
    );
    const engine = agoraEngineRef.current?.release();
    setRemote({joined: false, id: null});
    setIsJoined(false);
  };
  const toggleMute = (item: any) => {
    try {
      if (agoraEngineRef.current) {
        // Toggle mute/unmute for the remote user
        if (item.user.id == user.id) {
          agoraEngineRef.current.muteLocalAudioStream(item.isMuted);
        } else {
          agoraEngineRef.current.muteRemoteAudioStream(
            item.user.id,
            item.isMuted,
          );
        }
        // dispatch(updatedMuteUnmuteUser(item.user.id));
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '95%',
        }}>
        <TouchableOpacity onPress={setupVideoSDKEngine} style={styles.tmpBtn}>
          <Text style={styles.btnTxt}>init sdk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateUser} style={styles.tmpBtn}>
          <Text style={styles.btnTxt}>update Id</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={userJoinChannel} style={styles.tmpBtn}>
          <Text style={styles.btnTxt}>Join channel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={destroyEngine} style={styles.tmpBtn}>
          <Text style={styles.btnTxt}>destroy</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'center', marginTop: 10}}>
        <Text>
          User id: {userTemp.id} {userTemp.name}
        </Text>
        <Text style={{marginVertical: 20}}>Remote id: {remote.id}</Text>
        <Text>Remote User: {JSON.stringify(remote)}</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          //   backgroundColor: 'red',
          width: '90%',
          flex: 1,
        }}>
        <View
          style={{
            // width: '50%',
            // backgroundColor: 'green',
            height: 200,
            flex: 1,
          }}>
          {isJoined && (
            <React.Fragment key={0}>
              <RtcSurfaceView
                style={styles.videoView}
                canvas={{uid: user.id == userTemp.id ? 0 : 22}}
              />
              <TouchableOpacity
                style={{position: 'absolute', left: 2, top: 3}}
                onPress={() => toggleMute()}>
                {/* <Icon
                                        name={item.isMuted ? 'microphone-off' : 'microphone'}
                                        size={20}
                                        color={colors.complimentary}
                                      /> */}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    agoraEngineRef.current?.disableVideo();
                  }}>
                  <Text>disabled cam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    agoraEngineRef.current?.enableVideo();
                  }}>
                  <Text>enable cam</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
          {remote.joined && (
            <React.Fragment key={remote.id}>
              <RtcSurfaceView
                style={styles.videoView}
                canvas={{
                  uid: remote.id,
                }}
              />
            </React.Fragment>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
  },
  tmpBtn: {
    padding: 5,
    backgroundColor: colors.LG,
    borderRadius: 5,
  },
  btnTxt: {
    color: '#fff',
  },
  videoView: {width: '90%', height: 200, backgroundColor: 'red'},
});
