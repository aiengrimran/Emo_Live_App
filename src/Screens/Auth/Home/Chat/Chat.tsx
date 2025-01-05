import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import stylesC from '../../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatSearchDirection,
  ChatMessage,
} from 'react-native-agora-chat';
import Context from '../../../../Context/Context';
import {colors} from '../../../../styles/colors';
import ENV from '../../../../config/envVar';
import axiosInstance from '../../../../Api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {msg} from './tempData/messag  .e';
import {tempMessages} from './tempData/message';
// import {tempMessages} from './tempData/message';
let AGORA_KEY = ENV.AGORA_CHAT_KEY;
let appKey = '611258830#1451592';
let AGORA_APP_TOKEN = ENV.CHAT_APP_TOKEN;
import {useSelector, useDispatch} from 'react-redux';
import appStyles from '../../../../styles/styles';

interface ChatProps {
  navigation: any;
  route: any;
}
export default function Chat({navigation, route}: ChatProps) {
  console.log(tempMessages);
  const visitProfile = useSelector(
    (state: any) => state.usersReducer.visitProfile,
  );
  const {userAuthInfo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const receiverUser = {
    id: 2,
    user_name: null,
    first_name: 'zalkip',
    last_name: 'khan',
    phone: null,
    dob: '1997-03-15',
    gender: 'male',
    email: 'zalkip@gmail.com',
    agora_chat_token:
      '007eJxTYPB6XqEhvVVMXf3r1akC3050sgmUKEX5P5AJrT+84PiHvnoFhuQkQ3MLC1PLtDQDQxMDgxQLg5RkE4OUVENz87TUlKTkp98L0qeKFqZ3aKgwMjKwMjACIYivwmCUYmpuaGlqoJtsmmSqa2iYmqabaJFsrmtkmWxhkZhomGiWkgoAfXAoxA==',
    agora_chat_uid: null,
    account_verified: 0,
    provider: null,
    provider_id: null,
    avatar: null,
    address: 'buner kpk',
    bio: 'something should happen special',
    created_at: '2024-12-28T19:50:57.000000Z',
    updated_at: '2024-12-29T07:19:01.000000Z',
  };
  // const receiverUser = route.params.receiverUser;
  const [logText, setWarnText] = useState('Show log area');
  const [initialized, setInitialized] = useState(false);
  const chatClient = ChatClient.getInstance();
  const [receiverId, setReceiverId] = useState(1);
  const [modalInfo, setModalInfo] = useState({
    modal: false,
    type: '',
  });
  // const [modal, setShowModal] = useState(true);
  const [content, setContent] = useState('');
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState(tempMessages);
  const [list, setList] = useState([]);

  const [text, setText] = useState(false);

  const chatManager = chatClient.chatManager;
  // useEffect(() => {
  //   logText.split('\n').forEach((value, index, array) => {
  //     if (index === 0) {
  //       console.log(value);
  //     }
  //   });
  // }, [logText]);

  // useEffect(() => {
  //   // Registers listeners for messaging.
  //   const setMessageListener = () => {
  //     let msgListener = {
  //       onMessagesReceived(messages: any) {
  //         console.log(messages);
  //         return;
  //         let msgs = messages;
  //         for (let index = 0; index < messages.length; index++) {
  //           msgs.push(messages[index]);
  //           console.log('received msgId: ' + messages[index].msgId);
  //         }
  //         setMessages(msgs);
  //       },
  //       onCmdMessagesReceived: messages => {
  //         // let msgs= messages
  //         // msgs.push(messages)
  //         // setMessages(msgs)
  //       },
  //       onMessagesRead: messages => {
  //         console.log('onMessagesRead: ' + JSON.stringify(messages));
  //       },
  //       onGroupMessageRead: groupMessageAcks => {},
  //       onMessagesDelivered: messages => {},
  //       onMessagesRecalled: messages => {},
  //       onConversationsUpdate: () => {},
  //       onConversationRead: (from, to) => {},
  //     };
  //     chatManager.removeAllMessageListener();
  //     chatManager.addMessageListener(msgListener);
  //   };
  //   // Initializes the SDK.
  //   // Initializes any interface before calling it.
  //   const init = () => {
  //     let o = new ChatOptions({
  //       autoLogin: true,
  //       appKey: appKey,
  //     });
  //     chatClient.removeAllConnectionListener();
  //     chatClient
  //       .init(o)
  //       .then(() => {
  //         console.log('init success||||||');
  //         console.log('init success');
  //         setInitialized(true);
  //         let listener = {
  //           onTokenWillExpire() {
  //             console.log('token expire.');
  //           },
  //           onTokenDidExpire() {
  //             console.log('token did expire');

  //             console.log('token did expire');
  //           },
  //           onConnected() {
  //             console.log('onConnected');
  //             setMessageListener();
  //           },
  //           onDisconnected(errorCode: any) {
  //             console.log('onDisconnected:' + errorCode);
  //           },
  //         };
  //         chatClient.addConnectionListener(listener);
  //       })
  //       .catch(error => {
  //         console.log(
  //           'init fail: ' +
  //             (error instanceof Object ? JSON.stringify(error) : error),
  //         );
  //       });
  //   };
  //   init();
  // }, [chatClient, chatManager, appKey]);

  // Logs in with an account ID and a token.
  const login = async () => {
    if (!initialized) console.log('Perform initialization first.');
    console.log('start login ...');
    try {
      await chatClient.loginWithToken(String(user.id), user.agora_chat_token);
      console.log('login operation success.');
    } catch (error) {
      //     callApiForRenewToken();
      console.log(error);
    }
  };
  // Logs out from server.
  const logout = async () => {
    if (!initialized) console.log('Perform initialization first.');
    console.log('start logout ...');
    try {
      await chatClient.logout();
      console.log('logout success.');
    } catch (error) {
      console.log('logout fail:' + JSON.stringify(error));
    }
  };
  // Sends a text message to somebody.
  const sendMsg = () => {
    if (!initialized) console.log('Perform initialization first.');
    let msg = ChatMessage.createTextMessage(
      String(receiverId),
      // String(receiverUser.id),
      content,
      ChatMessageChatType.PeerChat,
    );
    console.log(msg);
    const callback = new (class {
      onProgress(locaMsgId, progress) {
        console.log(`send message process: ${locaMsgId}, ${progress}`);
      }
      onError(locaMsgId, error) {
        console.log(
          `send message fail: ${locaMsgId}, ${JSON.stringify(error)}`,
        );
      }
      onSuccess(message) {
        console.log('send message success: ' + message.localMsgId);
      }
    })();
    console.log('start send message ...');
    chatClient.chatManager
      .sendMessage(msg, callback)
      .then(() => {
        setContent('');
        console.log('send message: ' + msg.localMsgId);
      })
      .catch(reason => {
        console.log('send fail: ' + JSON.stringify(reason));
      });
  };

  const getPrevConversation = () => {
    chatManager
      .getAllConversations()
      .then(conversations => {
        console.log('conversations: ' + JSON.stringify(conversations));
      })
      .catch(reason => {
        console.log('get conversations fail: ' + JSON.stringify(reason));
      });
    console.log('ss');
  };

  // const getFromLocalStorage = () => {
  //   try {
  //     // const res = chatManager.getAllConversations()
  //     // const res = chatManager.loadMess
  //     const conversation = chatManager.getConversation('2', 0);
  //     console.log(conversation);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getPreviousMessages = async () => {
    try {
      const params = {
        convId: String(receiverId), // The conversation ID
        // convId: String('2/ios_dbf4dde4-ad4c-ad45-e8bc-29c2666d8dea'), // The conversation ID
        // convId: String(receiverUser.id), // The conversation ID
        convType: 0, // 0 for single chat
        // convType: ChatMessageChatType.PeerChat, // 0 for single chat
        startMsgId: '', // Leave empty to fetch the most recent messages
        pageSize: 20, // Number of messages to fetch
      };

      // Fetch messages
      const messages = await chatManager.getMsgs(params);
      console.log('Fetched messages:', messages);
      setMessages(messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fromServer = async () => {
    try {
      // Parameters for fetching history messages

      const params = {
        pageSize: 20, // Number of messages to fetch
        startMsgId: '', // Start with the most recent messages
        direction: ChatSearchDirection.UP, // Fetch older messages ('backward') or newer ('forward')
      };

      // Fetch messages from the local database or server
      const result = await chatManager.fetchHistoryMessages('2', 0, params);

      console.log('Messages fetched:', result);
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  const serverMessage = async () => {
    try {
      const res = await chatManager.fetchConversationsFromServerWithCursor();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // chatManager
    //   .fetchConversationsFromServerWithCursor()
    //   .then(res => {
    //     console.log('get conversions success', res);
    //   })
    //   .catch(reason => {
    //     console.log('get conversions fail.', reason);
    //   });
  };
  const clearMessages = async () => {
    try {
      await chatManager.deleteAllMessageAndConversation(true);
      console.log('conversation cleared');
    } catch (error) {
      console.log(error);
    }
  };

  const importMessages = async () => {
    try {
      // const chatManager = ChatClient.getInstance().chatManager;

      // Define the conversation ID and parameters
      const conversationId = String(receiverId); // Replace '2' with the actual conversation ID
      const params = {
        pageSize: 20, // Number of messages to fetch
        startMsgId: '', // Start with the most recent messages
        direction: ChatSearchDirection.UP, // Fetch older messages ('backward') or newer ('forward')
      };

      // Fetch history messages from the server
      const messagesResponse = await chatManager.fetchHistoryMessages(
        conversationId,
        0,
        params,
      );
      console.log(messagesResponse.list);
      // setList(messagesResponse.list);
      // console.log('Fetched messages:', messagesResponse);

      // Process the messages as needed
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp);

    // Get the time components
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format the date components
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'}); // Short month name
    const year = date.getFullYear();

    // Create the formatted string
    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm} ${day} ${month} ${year}`;
    return formattedTime;
  };
  const test1 = () => {
    try {
      console.log(tempMessages);
      console.log(messages);
    } catch (error) {}
  };
  const callApiForRenewToken = async () => {
    try {
      const res = await axiosInstance.get('/renew-agora-token');
      console.log(res.data.user);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <>
        <View style={styles.chatHeader}>
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
                source={
                  receiverUser.avatar
                    ? {uri: receiverUser.avatar}
                    : require('../../../../assets/images/place.jpg')
                }
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.user}>
                  {visitProfile.first_name + ' ' + visitProfile.last_name} ::{' '}
                  {visitProfile.id} |||{user.id}
                </Text>
                {/* <Text style={styles.user}>
                  {receiverId == 2
                    ? receiverUser.first_name + ' ' + receiverUser.last_name
                    : 'imran' + ' ' + 'khan'}{' '}
                  :: {receiverId} |||{user.id}
                </Text> */}
                <Text
                  style={styles.userStatus}
                  onPress={() => navigation.navigate('Chat2')}>
                  offline
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                console.log(list);
              }}>
              <Icon
                name="trash-can-outline"
                size={25}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10}} onPress={login}>
              <Icon
                name="information-outline"
                size={25}
                color={colors.complimentary}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* chat messages ... */}
        {/* <View style={{flexDirection: 'row'}}> */}
        {/* <Button title="Pre Message" onPress={getPreviousMessages} /> */}
        {/* <Button title="Renew Token" onPress={callApiForRenewToken} /> */}
        {/* <Button title="from local" onPress={getPreviousMessages} /> */}
        {/* </View> */}
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button title="clear messages" onPress={clearMessages} />
          <Button title="from server" onPress={fromServer} />
          <Button
            title="update Id"
            onPress={() => {
              if (receiverId === 1) {
                setReceiverId(2);
              } else {
                setReceiverId(1);
              }
            }}
          />
        </View> */}
        {/* <View style={{flexDirection: 'row'}}>
          <Button onPress={importMessages} title="import" />
          <Button onPress={serverMessage} title="import from server" />
        </View> */}
        {/* <Text onPress={test1} style={{color: '#fff'}}>
          {JSON.stringify(messages)} :::
        </Text> */}
        <View style={{marginTop: 30}}>
          <FlatList
            data={tempMessages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: any) => {
              return (
                <TouchableOpacity
                  onLongPress={() => {
                    setModalInfo({modal: true, type: 'delete'});
                  }}>
                  <View style={styles.myMessage}>
                    <Text
                      style={[stylesC.bodyRg, {color: colors.complimentary}]}>
                      {item.body?.content}
                    </Text>
                  </View>
                  <Text style={[stylesC.smallTxt, {color: '#7B8095'}]}>
                    {formatTime(item.localTime)}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Modal
          visible={modalInfo.modal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}>
          {/* Backdrop */}
          <View style={styles.backdrop}>
            {/* Modal Content */}
            <View style={styles.modalView}>
              <Text style={[appStyles.title1, {color: colors.complimentary}]}>
                {modalInfo.type === 'delete'
                  ? 'Delete Conversation'
                  : 'Report a Problem'}
              </Text>
              <View style={{marginVertical: 20}}>
                <Text
                  style={[appStyles.regularTxtMd, {color: colors.body_text}]}>
                  {modalInfo.type == 'delete'
                    ? 'All will be permanently deleted for yourself'
                    : 'Nudity, indecent exposure fake profile etc.'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalInfo({...modalInfo, modal: false})}
                style={[styles.deleteButton]}>
                <Text style={styles.deleteText}>
                  {modalInfo.type == 'delete' ? 'Delete' : 'Report'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalInfo({...modalInfo, modal: false})}
                style={styles.cancelButton}>
                <Text style={[appStyles.paragraph1, {color: colors.unknown2}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <View style={{marginTop: 20}}>
            <View
              style={{
                width: '90%',
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                onLongPress={() => {
                  setModalInfo({modal: true, type: 'report'});
                }}
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
              </TouchableOpacity>
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
        </View>

        <View style={styles.chatInput}>
          <View style={styles.textInput}>
            {/* <KeyboardAvoidingView> */}
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <TextInput
              placeholder="Say hello ..."
              placeholderTextColor={colors.body_text}
              style={styles.input}
              value={content}
              onFocus={() => {
                console.log('i am clicking it..');
                setText(true);
              }}
              onBlur={() => {
                console.log('i am clicking outside..');
                setText(false);
              }}
              onChangeText={setContent}
            />
            {/* </TouchableWithoutFeedback> */}
            {/* </KeyboardAvoidingView> */}

            <Icon name="camera" size={25} color={colors.body_text} />
          </View>
          <TouchableOpacity style={styles.voiceBtn} onPress={sendMsg}>
            <View>
              <Icon
                name={text ? 'send' : 'microphone'}
                size={23}
                color={colors.complimentary}
              />
              {/* <Icon name="microphone" size={25} color={colors.complimentary} /> */}
            </View>
          </TouchableOpacity>
        </View>
      </>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Custom RGBA backdrop color
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  modalView: {
    // width: 300,
    padding: 20,
    backgroundColor: colors.LG,
    alignSelf: 'center',
    width: '90%',
    // minWidth
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 26,
  },
  modalBody: {
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    // backgroundColor: 'red',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '99%',
    marginTop: Platform.OS == 'ios' ? 50 : 20,
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
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 12,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteText: {
    color: colors.offwhite,
    ...appStyles.paragraph1,
  },
  cancelButton: {
    padding: 16,
  },
  input: {
    width: '80%',
    padding: 16,
    borderRadius: 40,
    color: colors.complimentary,
  },
  textInput: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#685670',
    borderRadius: 40,
    paddingLeft: 10,
  },
  myMessage: {
    marginVertical: 10,
    backgroundColor: colors.LG,
    width: '90%',
    padding: 20,
    borderEndEndRadius: 16,
    borderStartStartRadius: 16,
    borderEndStartRadius: 16,
  },
});
