import {View, Text, Image, Alert} from 'react-native';
import React, {useContext, useRef, useEffect, useState} from 'react';
import Home from './Home';
import Search from './Tabs/Search';
import Profile from './Tabs/Profile';
import Notifications from './Notifications';
import GoLive2 from './Chat/GoLive2';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo, {useNetInfo, refresh} from '@react-native-community/netinfo';

import Context from '../../../Context/Context';
const Tab = createBottomTabNavigator();
import {ChatClient, ChatOptions} from 'react-native-agora-chat';
import {colors} from '../../../styles/colors';
import envVar from '../../../config/envVar';
import {setInitialized, setConnected} from '../../../store/slice/chatSlice';
import {useSelector, useDispatch} from 'react-redux';

export default function HomeB() {
  const dispatch = useDispatch();
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;
  const chatClientRef = useRef(chatClient);
  const chatManagerRef = useRef(chatManager);
  const {userAuthInfo, chatClientMemo, tokenMemo} = useContext(Context);
  const {setChatClientInstance} = chatClientMemo;
  const {token} = tokenMemo;
  const [init, setInit] = useState(false);
  const {user} = userAuthInfo;
  const {initialized, connected, error} = useSelector(
    (state: any) => state.chat,
  );

  useEffect(() => {
    let initializedOnce = false; // Prevents duplicate initialization
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log(state.isConnected);

      if (state.isConnected) {
        if (!initialized && !initializedOnce) {
          initializedOnce = true;
          console.log('Network available, initializing chat SDK...Home');
          // Initialize the chat SDK here
          initializedAgoraChat();
        }
      } else {
        console.log('No network connection.');
        Alert.alert('Network Error', 'Please check your internet connection.');
      }
    });

    return () => {
      console.log('Cleaning up network listener...');
      unsubscribe(); // Unsubscribe from NetInfo listener
    };
  }, [initialized, chatManagerRef.current, chatClientRef.current]);

  const initializedAgoraChat = () => {
    let o = new ChatOptions({
      autoLogin: true,
      appKey: envVar.AGORA_CHAT_KEY,
    });
    chatClient.removeAllConnectionListener();
    chatClient
      .init(o)
      .then(() => {
        console.log('init success');
        dispatch(setInitialized(true));
        addToContext();

        // setChatCLient(chatClient);
        // setChatManager(chatManager);
        let listener = {
          onTokenWillExpire() {
            console.log('token expire.');
          },
          onTokenDidExpire() {
            console.log('token did expire');
          },
          onConnected() {
            console.log('onConnected');
            // setMessageListener();
            dispatch(setConnected(true));
            // setStatus({...status, connected: true});
          },
          onDisconnected(errorCode: any) {
            dispatch(setConnected(false));
            // setStatus({...status, connected: false});
            console.log('onDisconnected:x' + errorCode);
            // console.log('onDisconnected:' + errorCode);
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

  const addToContext = () => {
    try {
      console.log('i add value to context');
      setChatClientInstance(chatClient);
    } catch (error) {}
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
      />
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
