import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import stylesC from '../../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
} from 'react-native-agora-chat';
import {colors} from '../../../../styles/colors';
export default function Chat({navigation}) {
  const [logText, setWarnText] = useState('Show log area');
  const chatClient = ChatClient.getInstance();

  const chatManager = chatClient.chatManager;

  useEffect(() => {
    // Registers listeners for messaging.
    const setMessageListener = () => {
      let msgListener = {
        onMessagesReceived(messages: any) {
          for (let index = 0; index < messages.length; index++) {
            console.log(messages);
            rollLog('received msgId: ' + messages[index].msgId);
          }
        },
        onCmdMessagesReceived: messages => {},
        onMessagesRead: messages => {},
        onGroupMessageRead: groupMessageAcks => {},
        onMessagesDelivered: messages => {},
        onMessagesRecalled: messages => {},
        onConversationsUpdate: () => {},
        onConversationRead: (from, to) => {},
      };
      chatManager.removeAllMessageListener();
      chatManager.addMessageListener(msgListener);
    };
    // Initializes the SDK.
    // Initializes any interface before calling it.
    const init = () => {
      let o = new ChatOptions({
        autoLogin: false,
        appKey: appKey,
      });
      chatClient.removeAllConnectionListener();
      chatClient
        .init(o)
        .then(() => {
          rollLog('init success');
          setInitialized(true);
          let listener = {
            onTokenWillExpire() {
              rollLog('token expire.');
            },
            onTokenDidExpire() {
              rollLog('token did expire');
            },
            onConnected() {
              rollLog('onConnected');
              setMessageListener();
            },
            onDisconnected(errorCode: any) {
              rollLog('onDisconnected:' + errorCode);
            },
          };
          chatClient.addConnectionListener(listener);
        })
        .catch(error => {
          rollLog(
            'init fail: ' +
              (error instanceof Object ? JSON.stringify(error) : error),
          );
        });
    };
    init();
  }, [chatClient, chatManager, appKey]);
  // // Outputs UI logs.
  const rollLog = (text: any) => {
    setWarnText(preLogText => {
      let newLogText = text;
      preLogText
        .split('\n')
        .filter((value, index, array) => {
          if (index > 8) {
            return false;
          }
          return true;
        })
        .forEach((value, index, array) => {
          newLogText += '\n' + value;
        });
      return newLogText;
    });
  };
  const [targetId, setTargetId] = useState(0);
  const [content, setContent] = useState('');

  // Logs in with an account ID and a token.
  const login = () => {
    if (!initialized) {
      rollLog('Perform initialization first.');
      return;
    }
    rollLog('start login ...');
    chatClient
      .login(username, chatToken, false)
      .then(() => {
        rollLog('login operation success.');
      })
      .catch(reason => {
        rollLog('login fail: ' + JSON.stringify(reason));
      });
  };
  // Logs out from server.
  const logout = () => {
    if (!initialized) {
      rollLog('Perform initialization first.');
      return;
    }
    rollLog('start logout ...');
    chatClient
      .logout()
      .then(() => {
        rollLog('logout success.');
      })
      .catch(reason => {
        rollLog('logout fail:' + JSON.stringify(reason));
      });
  };
  // Sends a text message to somebody.
  const sendmsg = () => {
    if (!initialized) {
      rollLog('Perform initialization first.');
      return;
    }
    let msg = ChatMessage.createTextMessage(
      targetId,
      content,
      ChatMessageChatType.PeerChat,
    );
    const callback = new (class {
      onProgress(locaMsgId, progress) {
        rollLog(`send message process: ${locaMsgId}, ${progress}`);
      }
      onError(locaMsgId, error) {
        rollLog(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
      }
      onSuccess(message) {
        rollLog('send message success: ' + message.localMsgId);
      }
    })();
    rollLog('start send message ...');
    chatClient.chatManager
      .sendMessage(msg, callback)
      .then(() => {
        rollLog('send message: ' + msg.localMsgId);
      })
      .catch(reason => {
        rollLog('send fail: ' + JSON.stringify(reason));
      });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '99%',
          marginTop: 20,
        }}>
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
              source={require('../../../../assets/images/live/girl7.jpg')}
            />
            <View style={{marginLeft: 10}}>
              <Text style={styles.user}>Christa Martinez</Text>
              <Text style={styles.userStatus}>offline</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Icon
              name="trash-can-outline"
              size={25}
              color={colors.complimentary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 10}}>
            <Icon
              name="information-outline"
              size={25}
              color={colors.complimentary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 40}}>
        <View>
          <View
            style={{
              backgroundColor: colors.LG,
              width: '90%',
              padding: 20,
              borderEndEndRadius: 16,
              borderStartStartRadius: 16,
              borderEndStartRadius: 16,
              // borderTopRightRadius: 46,
            }}>
            <Text style={[stylesC.bodyRg, {color: colors.complimentary}]}>
              We've discussed this before, and I still disagree
            </Text>
          </View>
          <Text style={[stylesC.smallTxt, {color: '#7B8095', marginTop: 10}]}>
            10:07 PM 9 May 2024
          </Text>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'flex-end',
          }}>
          <View
            style={{
              marginVertical: 30,
              backgroundColor: colors.semantic,
              padding: 16,
              borderStartEndRadius: 16,
              borderStartStartRadius: 16,
              // borderEndEndRadius: 16,
              borderEndStartRadius: 16,
            }}>
            <Text style={[{color: colors.dominant}]}>
              I can't believe you're saying that!
            </Text>
          </View>
          <Text
            style={[
              {
                color: '#7B8095',
                marginTop: -10,
                textAlign: 'right',
              },
              stylesC.smallTxt,
            ]}>
            10:08 PM 9 May
          </Text>
        </View>
      </View>
      <View style={{marginVertical: 20}}>
        <View
          style={{
            backgroundColor: colors.LG,
            width: '90%',
            padding: 20,
            borderEndEndRadius: 16,
            borderStartStartRadius: 16,
            borderEndStartRadius: 16,
            // borderTopRightRadius: 46,
          }}>
          <Text style={[stylesC.bodyRg, {color: colors.complimentary}]}>
            I see your point, but I think you're missing something important.
          </Text>
        </View>
        <Text style={[stylesC.smallTxt, {color: '#7B8095', marginTop: 10}]}>
          10:09 PM 9 May
        </Text>
      </View>

      <View style={styles.chatInput}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Say hello"
            placeholderTextColor={colors.body_text}
            style={{
              width: '80%',
              borderRadius: 40,
            }}
          />
          <Icon name="camera" size={25} color={colors.body_text} />
        </View>
        <TouchableOpacity style={styles.voiceBtn}>
          <View style={{marginLeft: 7}}>
            <Icon name="microphone" size={25} color={colors.complimentary} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark_gradient,
    padding: 16,
  },
  user: {
    color: colors.complimentary,
    ...stylesC.headline2,
  },
  userStatus: {
    color: colors.body_text,
    ...stylesC.regularTxtRg,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  voiceBtn: {
    width: 40,
    marginLeft: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    display: 'flex',
    justifyContent: 'center',
  },
  textInput: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#685670',
    borderRadius: 40,
    paddingLeft: 10,
  },
});
