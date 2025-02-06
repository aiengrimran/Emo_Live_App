import {View, Text, Image, Alert, StyleSheet} from 'react-native';
import React, {useContext, useRef, useEffect, useState} from 'react';
import Home from './Home';
import Search from './Tabs/Search';
import Profile from './Tabs/Profile';
import Notifications from './Notifications';
import GoLive2 from './Chat/GoLive2';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StartLive from './Tabs/StartLive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setChatRoomMessages,
  setTokenRenewed,
} from '../../../store/slice/chatSlice';
import NetInfo, {useNetInfo, refresh} from '@react-native-community/netinfo';
import axiosInstance from '../../../Api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../../Context/Context';
const Tab = createBottomTabNavigator();
import {
  ChatClient,
  ChatOptions,
  ChatConnectEventListener,
  ChatMessage,
  ChatMessageEventListener,
  ChatMessageChatType,
} from 'react-native-agora-chat';
import {colors} from '../../../styles/colors';
import envVar from '../../../config/envVar';
import {
  setInitialized,
  setConnected,
  setMessages,
} from '../../../store/slice/chatSlice';
import {useSelector, useDispatch} from 'react-redux';
import appStyles from '../../../styles/styles';
import axios from 'axios';

export default function HomeB() {
  const dispatch = useDispatch();
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;
  const chatClientRef = useRef(chatClient);
  const chatManagerRef = useRef(chatManager);
  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {token} = tokenMemo;
  const {user, setUser} = userAuthInfo;
  const {initialized, messages, chatRoomMessages, connected, error} =
    useSelector((state: any) => state.chat);
  const {unread} = useSelector((state: any) => state.notification);

  useEffect(() => {
    let initializedOnce = false; // Prevents duplicate initialization

    if (!initialized && !initializedOnce && !connected) {
      console.log('Network available, initializing chat SDK...Home');
      // Initialize the chat SDK here
      initializedOnce = true;

      initializedAgoraChat();
    }
  }, [initialized, chatManagerRef.current, chatClientRef.current, connected]);

  const initializedAgoraChat = () => {
    let o = new ChatOptions({
      autoLogin: true,
      appKey: envVar.AGORA_CHAT_KEY,
    });
    chatClient.removeAllConnectionListener();
    chatClient
      .init(o)
      .then(() => {
        loginUser();
        console.log('init success ::::');
        dispatch(setInitialized(true));
        // login();
        let listener: ChatConnectEventListener = {
          onTokenWillExpire() {
            callApiForRenewToken();
            Alert.alert('Token Expired', 'Token will expired soon');
          },
          onTokenDidExpire() {
            callApiForRenewToken();
            console.log('token did expire');
          },
          onConnected() {
            console.log('onConnected');
            // setMessageListener();
            dispatch(setConnected(true));
          },
          onDisconnected() {
            dispatch(setConnected(false));
            // Alert.alert('Disconnected', 'Disconnected from agora');
            console.log('onDisconnected:x');
          },
          onUserAuthenticationFailed() {
            loginUser();
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
      console.log('run message listener ...');
      let msgListener: ChatMessageEventListener = {
        onMessagesReceived(messagesReceived: Array<ChatMessage>): void {
          console.log('message recived ...', messagesReceived);
          if (messagesReceived[0].chatType == ChatMessageChatType.ChatRoom) {
            let roomMessage = [...chatRoomMessages];
            messagesReceived.forEach((message: ChatMessage) => {
              roomMessage.push(message);
            });
            dispatch(setChatRoomMessages(roomMessage));
            return;
          }

          let currentMessages = [...messages]; // Clone current messages to avoid mutation
          messagesReceived.forEach((message: ChatMessage) => {
            const existingConversation = currentMessages.find(
              item => item.conversationId === message.conversationId,
            );

            if (existingConversation) {
              // Append the new message to the existing conversation's messages
              existingConversation.messages.push(message);
            } else {
              // Create a new conversation with this message
              currentMessages.push({
                conversationId: message.conversationId,
                messages: [message],
              });
            }
          });

          // Dispatch the updated messages
          dispatch(setMessages(currentMessages));
          // let currentMessages = messages;
          // messagesReceived.forEach((message: ChatMessage) => {
          //   let added = currentMessages.find(
          //     (item: ChatMessage) =>
          //       item.conversationId == message.conversationId,
          //   );
          //   if (added) {
          //     currentMessages['conversationId'] = [
          //       ...currentMessages['conversationId'],
          //       messagesReceived,
          //     ];
          //   } else {
          //     currentMessages['conversationId'] = [messagesReceived];
          //   }
          // });
          // dispatch(setMessages(currentMessages));
        },
        onMessagesRead: messages => {
          console.log('onMessagesRead: ' + JSON.stringify(messages));
        },
        onMessagesDelivered: messages => {},
        onMessagesRecalled: messages => {},
      };
      chatClient.chatManager.removeAllMessageListener();
      chatClient.chatManager.addMessageListener(msgListener);
    };
    if (connected) {
      setMessageListener();
    }
  }, [connected]);

  // Logs in with an account ID and a token.
  const loginUser = async () => {
    const isLoggedIn = await chatClient.isLoginBefore();
    if (isLoggedIn) {
      dispatch(setConnected(true));
      console.log('User is already logged in.');
      return; // Prevent duplicate login
    }

    if (!initialized) console.log('Perform initialization first.');
    try {
      await chatClient.loginWithToken(String(user.id), user.agora_chat_token);
      console.log('login operation success.');
    } catch (error: any) {
      console.log(error);
      if (error.code == 2) {
        return;
      }
      if (error.code == 111 || error.code == 202) {
        callApiForRenewToken();
      }
    }
  };

  const callApiForRenewToken = async () => {
    try {
      console.log('calling.api.for chat token renew');

      const res = await axiosInstance.get('/renew-agora-token');
      dispatch(setTokenRenewed(true));
      setUser(res.data.user);
      loginUser();
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#1d1f31'},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: colors.complimentary,
          tabBarInactiveTintColor: colors.body_text,
          tabBarIcon: ({focused}) => (
            <View style={{position: 'relative'}}>
              <Icon
                name="alpha-z-circle-outline"
                size={25}
                color={focused ? colors.complimentary : colors.body_text}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarActiveTintColor: colors.complimentary,
          //   tabBarLabelStyle: {fontFamily: 'Inter-Regular', fontSize: 11},
          tabBarInactiveTintColor: colors.body_text,
          tabBarIcon: ({focused}) => (
            <View style={{position: 'relative'}}>
              <Icon
                name="magnify"
                size={25}
                color={focused ? colors.complimentary : colors.body_text}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StartLive"
        component={StartLive}
        options={{
          tabBarLabel: 'StartLive',
          tabBarActiveTintColor: colors.complimentary,
          tabBarInactiveTintColor: colors.body_text,
          tabBarIcon: ({focused}) => (
            <View style={{position: 'relative'}}>
              <Icon
                name="camera-plus-outline"
                size={25}
                color={focused ? colors.complimentary : colors.body_text}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="GoLive2"
        component={GoLive2}
        options={{
          tabBarLabel: 'GoLive',
          tabBarActiveTintColor: colors.complimentary,
          tabBarInactiveTintColor: colors.body_text,
          tabBarIcon: ({focused}) => (
            <View style={{position: 'relative'}}>
              <Icon
                name="camera-plus-outline"
                size={25}
                color={focused ? colors.complimentary : colors.body_text}
              />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        // name="Alerts"
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Alerts',
          tabBarActiveTintColor: colors.complimentary,
          tabBarInactiveTintColor: colors.body_text,
          tabBarIcon: ({focused}) => (
            <View style={{position: 'relative'}}>
              <Icon
                name="bell-ring-outline"
                size={25}
                color={focused ? colors.complimentary : colors.body_text}
              />
              {unread && (
                <View style={styles.unread}>
                  <Text
                    style={[
                      appStyles.smallM,
                      {
                        color: colors.complimentary,
                        fontSize: 10,
                      },
                    ]}>
                    {unread}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'You',
          tabBarActiveTintColor: colors.complimentary,
          tabBarInactiveTintColor: colors.body_text,
          tabBarIcon: () => (
            <View style={{position: 'relative'}}>
              {user.avatar ? (
                <Image
                  style={{width: 25, height: 25, borderRadius: 20}}
                  source={{
                    uri: envVar.API_URL + 'display-avatar/' + user.id,
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }}
                />
              ) : (
                <Icon name="account-circle" size={25} color="grey" />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  unread: {
    position: 'absolute',
    right: -5,
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    top: -4,
  },
});
