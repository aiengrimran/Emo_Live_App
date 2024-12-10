import {View, Text} from 'react-native';
import React from 'react';
import Home from './Home';
import Search from './Tabs/Search';
import Alerts from './Tabs/Alerts';
import Profile from './Tabs/Profile';
import GoLive from './Tabs/GoLive';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function HomeB() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#1d1f31'},
        // tabBarBackground: () => (
        // <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        //   ),
      }}>
      {/* <Tab.Screen name="Home" component={Home} /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#0171A1',
          //   tabBarLabelStyle: {fontFamily: 'Inter-Regular', fontSize: 11},
          tabBarInactiveTintColor: '#6D858F',
          tabBarIcon: () => (
            <View style={{position: 'relative'}}>
              <Icon name="alpha-z-circle-outline" size={25} color="grey" />
              {/* {currentTabActive === 'Chat' ? <ChatActive /> : <ChatIcon />} */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarActiveTintColor: '#0171A1',
          //   tabBarLabelStyle: {fontFamily: 'Inter-Regular', fontSize: 11},
          tabBarInactiveTintColor: '#6D858F',
          tabBarIcon: () => (
            <View style={{position: 'relative'}}>
              <Icon name="magnify" size={25} color="grey" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="GoLive"
        component={GoLive}
        options={{
          tabBarLabel: 'GoLive',
          tabBarActiveTintColor: '#0171A1',
          //   tabBarLabelStyle: {fontFamily: 'Inter-Regular', fontSize: 11},
          tabBarInactiveTintColor: '#6D858F',
          tabBarIcon: () => (
            <View style={{position: 'relative'}}>
              <Icon name="camera-plus-outline" size={25} color="grey" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={Alerts}
        options={{
          tabBarLabel: 'Alerts',
          tabBarActiveTintColor: '#0171A1',
          //   tabBarLabelStyle: {fontFamily: 'Inter-Regular', fontSize: 11},
          tabBarInactiveTintColor: '#6D858F',
          tabBarIcon: () => (
            <View style={{position: 'relative'}}>
              <Icon name="bell-ring-outline" size={25} color="grey" />
              {/* {currentTabActive === 'Chat' ? <ChatActive /> : <ChatIcon />} */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: '#0171A1',
          tabBarInactiveTintColor: '#6D858F',
          tabBarIcon: () => (
            <View style={{position: 'relative'}}>
              <Icon name="account-circle" size={25} color="grey" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};
