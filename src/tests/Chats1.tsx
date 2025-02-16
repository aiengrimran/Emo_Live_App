// Imports dependencies.
import React, {useEffect, useRef} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ChatClient,
  ChatOptions,
  ChatMessageEventListener,
  ChatMessageChatType,
  ChatConnectEventListener,
  ChatMessage,
} from 'react-native-agora-chat';
import envVar from '../config/envVar';
// Defines the App object.
const App = () => {
  // Defines the variable.
  const title = 'AgoraChatQuickstart';
  // Replaces <your appKey> with your app key.
  const appKey = '611258830#1451592';
  // Replaces <your userId> with your user ID.
  const [username, setUsername] = React.useState<any>(
    Platform.OS == 'android' ? 1 : 2,
  );
  // Replaces <your agoraToken> with your Agora token.
  const [chatToken, setChatToken] = React.useState(
    Platform.OS == 'android' ? envVar.IMRAN_TOKEN : envVar.ZALKIP_TOKEN,
  );
  const [targetId, setTargetId] = React.useState('');
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [connected, setConnected] = React.useState(false);
  const [content, setContent] = React.useState('');

  const [logText, setWarnText] = React.useState('Show log area');
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;

  const chatClientRef = useRef(chatClient);
  const chatManagerRef = useRef(chatManager);
  // Outputs console logs.
  useEffect(() => {
    logText.split('\n').forEach((value, index, array) => {
      if (index === 0) {
        console.log(value);
      }
    });
  }, [logText]);
  // Outputs UI logs.
  const rollLog = text => {
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
  useEffect(() => {
    let initializedOnce = false; // Prevents duplicate initialization

    if (!isInitialized && !initializedOnce) {
      console.log('Network available, initializing chat SDK...Home');
      // Initialize the chat SDK here
      initializedOnce = true;

      initializedAgoraChat();
    }
    return () => {
      // chatClient.removeAllConnectionListener();
    };
  }, [isInitialized, chatManagerRef.current, chatClientRef.current]);

  const initializedAgoraChat = () => {
    let o = new ChatOptions({
      autoLogin: true,
      appKey: envVar.AGORA_CHAT_KEY,
    });
    chatClient.removeAllConnectionListener();
    chatClient
      .init(o)
      .then(() => {
        setIsInitialized(true);
        let listener: ChatConnectEventListener = {
          onTokenWillExpire() {
            Alert.alert('Token Expired', 'Token will expired soon');
          },
          onTokenDidExpire() {
            console.log('token did expire');
          },
          onConnected() {
            setConnected(true);
            console.log('onConnected');
            // Alert.alert('phone connected');
          },
          onDisconnected() {
            setConnected(false);
            // Alert.alert('Disconnected', 'Disconnected from agora');
            console.log('onDisconnected:x');
          },
          onUserAuthenticationFailed() {
            console.log('done ...');
            // loginUser();
          },
        };
        chatClient.addConnectionListener(listener);
      })
      .catch(error => {
        console.log(
          'init fail: x' +
            (error instanceof Object ? JSON.stringify(error) : error),
        );
      });
  };

  useEffect(() => {
    // Registers listeners for messaging.
    const setMessageListener = () => {
      // Alert.alert('Message listern is running');
      let msgListener: ChatMessageEventListener = {
        onMessagesReceived(messagesReceived: Array<ChatMessage>): void {
          console.log('message Received ...', messagesReceived);
          Alert.alert('Message Received', '1');
        },
        onMessagesRead: messages => {
          console.log('onMessagesRead: ' + JSON.stringify(messages));
        },
        onMessagesDelivered: messages => {},
        onMessagesRecalled: messages => {},
      };
      return () => {
        console.log('clearing listener');
        // chatClient.chatManager.removeAllMessageListener();
        // chatClient.chatManager.addMessageListener(msgListener);
      };
    };
    if (connected) {
      setMessageListener();
    }
  }, [connected]);

  const getConversation = async () => {
    try {
      const conv = await chatClient.chatManager.getAllConversations();
      console.log(conv);
    } catch (error) {
      console.log(error);
    }
  };

  // Logs in with an account ID and a token.
  const login = () => {
    if (!isInitialized) {
      rollLog('Perform initialization first.');
      return;
    }
    rollLog('start login ...');
    chatClient
      .loginWithToken(String(username), chatToken)
      .then(() => {
        rollLog('login operation success.');
      })
      .catch(reason => {
        rollLog('login fail: ' + JSON.stringify(reason));
      });
  };
  // Logs out from server.
  const logout = () => {
    if (!isInitialized) {
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
    if (!isInitialized) {
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

  const singleConv = async () => {
    try {
      const conv = await chatClient.chatManager.getLatestMessage(String(2), 0);
      console.log(conv);
    } catch (error) {
      console.log(error);
    }
  };
  const roomConv = async () => {
    try {
      const conv = await chatClient.chatManager.getLatestMessage(
        String(271954198200327),
        2,
      );
      console.log(conv);
    } catch (error) {
      console.log(error);
    }
  };

  // Renders the UI.
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter chatToken"
            onChangeText={text => setChatToken(text)}
            value={chatToken}
          />
        </View>
        <View style={styles.buttonCon}>
          <TouchableOpacity onPress={login} style={styles.eachBtn}>
            <Text style={styles.text}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eachBtn} onPress={logout}>
            <Text style={styles.text}>SIGN OUT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eachBtn} onPress={getConversation}>
            <Text style={styles.text}>get Conv</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter the username you want to send"
            onChangeText={text => setTargetId(text)}
            value={targetId}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter content"
            onChangeText={text => setContent(text)}
            value={content}
          />
        </View>
        <TouchableOpacity onPress={sendmsg} style={styles.buttonCon}>
          <Text style={styles.btn2}>SEND TEXT</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'red',
            width: '90%',
          }}>
          <TouchableOpacity onPress={singleConv} style={styles.buttonCon2}>
            <Text style={styles.btn2}>singl Con</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={roomConv} style={styles.buttonCon2}>
            <Text style={styles.btn2}>room Conv</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.logText} multiline={true}>
            {logText}
          </Text>
        </View>
        <View>
          <Text style={styles.logText}>{}</Text>
        </View>
        <View>
          <Text style={styles.logText}>{}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// Sets UI styles.
const styles = StyleSheet.create({
  titleContainer: {
    height: 60,
    backgroundColor: '#6200ED',
  },
  title: {
    lineHeight: 60,
    paddingLeft: 15,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  inputCon: {
    paddingVertical: 20,
    marginLeft: '5%',
    width: '90%',
    height: 60,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputBox: {
    marginTop: 15,
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonCon: {
    marginLeft: '2%',
    width: '96%',
    flexDirection: 'row',
    marginTop: 20,
    height: 26,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonCon2: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 200,
    // height: 26,
  },
  eachBtn: {
    height: 40,
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ED',
    borderRadius: 5,
  },
  text: {
    lineHeight: 40,
    color: '#fff',
    fontSize: 16,
  },
  btn2: {
    height: 40,
    width: '45%',
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#6200ED',
    borderRadius: 5,
  },
  logText: {
    padding: 10,
    marginTop: 10,
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});
export default App;
