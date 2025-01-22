import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../styles/styles';
import {ChatClient, ChatConversationType} from 'react-native-agora-chat';
import {colors} from '../../../../styles/colors';

import Stranger from '../../../../assets/svg/stranger.svg';
import {UseSelector, useDispatch, useSelector} from 'react-redux';
import {setConnected, setInitialized} from '../../../../store/slice/chatSlice';
import axiosInstance from '../../../../Api/axiosConfig';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function Inbox({navigation}) {
  const {connected} = useSelector((state: any) => state.chat);

  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;
  const [inboxMessages, setInboxMessages] = useState<any>([
    {
      convId: '1',
      convType: 0,
      ext: undefined,
      isChatThread: false,
      isPinned: false,
      marks: [],
      pinnedTime: 0,
    },
  ]);
  // const [inboxMessages, setInboxMessages] = useState<any>([]);
  const getAllConversation = async () => {
    try {
      let key = await chatClient.isConnected();
      console.log(key);

      // const conversation =
      //   await chatManager.fetchConversationsFromServerWithCursor();
      const local = await chatManager.getAllConversations();
      console.log(local, 'local');
    } catch (error) {
      console.log(error);
    }
  };
  // const getAllConversation = async () => {
  //   try {
  //     let key = await chatClient.isConnected();

  //     const conversation =
  //       await chatManager.fetchConversationsFromServerWithCursor();
  //     const local = await chatManager.getAllConversations();
  //     console.log(local, 'local');
  //     console.log(conversation);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getUsersFromAPI = async () => {
    // const getUsersFromAPI = convId => {
    try {
      // const ids = inboxMessages.map()
      const data = {
        users: [1, 2, 3],
      };

      const url = 'users-info';
      const res = await axiosInstance.post(url, JSON.stringify(data));
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response);
    }
  };
  const getLastMessages = async () => {
    // const getLastMessages = async (conv: any) => {
    try {
      const lastMessages = await Promise.all(
        inboxMessages.map(async (item: any) => {
          // conv.map(async (item: any) => {
          const message = await chatManager.getLatestMessage(
            String(item.convId),
            ChatConversationType.PeerChat,
          );
          return message || null; // Return null if no message is found
        }),
      );
      console.log(lastMessages);

      console.log(lastMessages.filter(Boolean)); // Filter out null values
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="arrow-left-thin" color={colors.complimentary} size={25} />
          <Text style={styles.heading}>Inbox</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('StrangerMessages')}>
            <Stranger width={25} height={25} />
            {/* <Icon name="panda" color={colors.complimentary} size={25} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={getAllConversation}>
            <Icon name="check-all" color={colors.complimentary} size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 40}}>
        <View style={styles.userSection}>
          <TouchableOpacity style={styles.profile} onPress={getUsersFromAPI}>
            <View style={styles.support}>
              <Icon name="headset" color={colors.complimentary} size={25} />
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Support Chat</Text>
              <Text style={styles.msgText}>Chat with customer support</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userSection}>
          <TouchableOpacity style={styles.profile} onPress={getLastMessages}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../../assets/images/live/girl1.jpg')}
            />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Layla Grace</Text>
              <Text style={styles.msgText}>I want to meet you</Text>
              <Text style={styles.msgTime}>07:59 | 18 -04-2024</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userSection}>
          <TouchableOpacity style={styles.profile}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../../assets/images/live/girl2.jpg')}
            />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Layla Grace</Text>
              <Text style={styles.msgText}>I Love you ❤️</Text>
              <Text style={styles.msgTime}>03:39 | 18 -12-2023</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userSection}>
          <TouchableOpacity style={styles.profile}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../../assets/images/live/girl4.jpg')}
            />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Lily Evelyn</Text>
              <Text style={styles.msgText}>Lets Collab😈</Text>
              <Text style={styles.msgTime}>
                12:59 | 11 -04-2022 07:59 | 18 -04-2024
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f31',
    padding: 10,
  },
  heading: {
    ...appStyles.headline,
    marginLeft: 20,
    color: colors.complimentary,
  },
  image: {
    flex: 1,
    // display: 'flex',
    // justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS == 'ios' ? 60 : 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  support: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userSection: {
    marginTop: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  profile: {
    flexDirection: 'row',
  },
  msgTime: {
    ...appStyles.smallTxt,
    color: colors.body_text,
  },
  userText: {
    color: colors.complimentary,
    ...appStyles.regularTxtMd,
  },
  msgText: {
    color: colors.body_text,
    marginVertical: 5,
    ...appStyles.regularTxtRg,
  },
  userDesc: {
    color: '#82838d',
    marginTop: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  followBtn: {
    backgroundColor: '#ef0143',
    // paddingHorizontal: 10,
    height: 40,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 5,
    borderRadius: 6,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
