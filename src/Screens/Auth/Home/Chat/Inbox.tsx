import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../styles/styles';
import {ChatClient, ChatConversationType} from 'react-native-agora-chat';
import {colors} from '../../../../styles/colors';
import envVar from '../../../../config/envVar';
import Context from '../../../../Context/Context';
import Stranger from '../../../../assets/svg/stranger.svg';
import {UseSelector, useDispatch, useSelector} from 'react-redux';
import {setConnected, setInitialized} from '../../../../store/slice/chatSlice';
import {selectInbox} from '../../../../store/selectors/selectors';
import axiosInstance from '../../../../Api/axiosConfig';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

interface InboxProps {
  navigation: any;
}
export default function Inbox({navigation}: InboxProps) {
  const {tokenMemo} = useContext(Context);
  const inbox = useSelector(selectInbox);
  const {token} = tokenMemo;

  const {connected} = useSelector((state: any) => state.chat);
  const [error, setError] = useState('');

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
  const [conversation, setConversation] = useState<any>({
    lastMessages: [],
    local: [
      {
        convId: '1',
        convType: 0,
        ext: undefined,
        isChatThread: false,
        isPinned: false,
        marks: [Array],
        pinnedTime: 0,
      },
    ],
    messagesGet: true,
    users: [],
    usersGet: true,
    finalConversation: [],
  });
  const [users1, setUsers] = useState<any>([]);
  const getAllConversation = async () => {
    try {
      setError('');
      const local = await chatManager.getAllConversations();
      if (local.length > 0) {
        console.log('calling apis', local.length);
        getUsersFromAPI(local);
        getLastMessages(local);
        setConversation((prevState: any) => ({...prevState, local: local}));
      }
    } catch (error) {
      setError('error occurred: please check internet connection(SDK)');
      console.log(error);
    }
  };

  useEffect(() => {
    if (conversation.usersGet && conversation.lastMessageGet) {
      console.log('sss');
      mergeData();
    }
  }, [conversation.usersGet, conversation.lastMessageGet]);

  const getUsersFromAPI = async (local: any) => {
    try {
      const idsArray = local.map((item: any) => item.convId);
      let data = {
        users: idsArray,
      };
      console.log(data);
      const url = 'users-info';
      const res = await axiosInstance.post(url, data);
      // const res = await axiosInstance.post(url, JSON.stringify(data));
      console.log(res.data);
      if (res.data.users.length > 0) {
        const users = res.data.users;
        setConversation((prevState: any) => ({
          ...prevState,
          users: users,
          usersGet: true,
        }));
      }
    } catch (error: any) {
      setError('error occurred: please check internet connection(API)');
      console.log(error['_response']);
    }
  };
  const getLastMessages = async (conv: any) => {
    try {
      let lastMessages1 = [];
      console.log('getting last messages ');
      let lastMessages = await Promise.all(
        conv.map(async (item: any) => {
          // conv.map(async (item: any) => {
          const message = await chatManager.getLatestMessage(
            String(item.convId),
            ChatConversationType.PeerChat,
          );
          lastMessages1.push(message);

          return message || null; // Return null if no message is found
        }),
      );
      console.log(lastMessages1);
      // lastMessages = lastMessages.filter(Boolean);
      setConversation((prevState: any) => ({
        ...prevState,
        lastMessages: lastMessages1,
        messagesGet: true,
      }));
      console.log(lastMessages, 's');
    } catch (error) {
      setError('error occurred: please check internet connection(m)');
      console.log(error);
    }
  };
  const getLastMessages2 = async (conv: any) => {
    try {
      // conv.map(async (item: any) => {
      const message = await chatManager.getLatestMessage(
        String(1),
        ChatConversationType.PeerChat,
      );
      console.log(message);
    } catch (error) {
      setError('error occurred: please check internet connection(m)');
      console.log(error);
    }
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp);

    // Get the time components

    // Extract components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear()).padStart(2, '0');

    // Create the formatted string
    const formattedTime = `${hours}:${minutes} | ${day}-${month}-${year}`;
    return formattedTime;
  };
  const mergeData = () => {
    try {
      console.log('merging data...');
      const mergedArray = conversation.users
        .map((item1: any) => {
          const match = conversation.lastMessages.find(
            (item2: any) => item1.id === Number(item2.conversationId),
            // (item2: any) => item1.id === Number(item2.convId),
          );
          return match ? {...item1, ...match} : null; // Merge objects if there's a match
        })
        .filter((item: any) => item !== null);

      setConversation((prevState: any) => ({
        ...prevState,
        finalConversation: mergedArray,
      }));

      console.log(mergedArray);
    } catch (error) {}
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
          <TouchableOpacity onPress={getLastMessages2}>
            {/* onPress={() => navigation.navigate('StrangerMessages')}> */}
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

      <Text
        style={{marginTop: 40, color: '#fff'}}
        onPress={() => console.log(conversation)}>
        {' '}
        test user
      </Text>
      {error && <Text style={[appStyles.errorText]}>{error}</Text>}
      {/* <Text style={{color: '#fff', fontSize: 20}}>
        {JSON.stringify(conversation)}
      </Text> */}
      <Text style={{color: '#fff'}} onPress={mergeData}>
        mergeData
      </Text>
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
        <FlatList
          data={conversation.finalConversation}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}: any) => (
            <View style={styles.userSection}>
              <TouchableOpacity
                style={styles.profile}
                onPress={() =>
                  navigation.navigate('Chat', {receiverUser: item})
                }>
                <Image
                  style={{width: 50, height: 50, borderRadius: 25}}
                  loadingIndicatorSource={require('../../../../assets/images/place.jpg')}
                  source={
                    item.avatar
                      ? {
                          uri: envVar.API_URL + 'display-avatar/' + item.id,
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      : require('../../../../assets/images/place.jpg')
                  }
                  // source={require('../../../../assets/images/live/girl4.jpg')}
                />
                <View style={{marginLeft: 20}}>
                  <Text style={styles.userText}>
                    {item.first_name + ' ' + item.last_name}
                  </Text>
                  {item.body.type == 'voice' ? (
                    <View style={{marginVertical: 5, flexDirection: 'row'}}>
                      <Icon
                        name={'microphone'}
                        size={20}
                        color={colors.accent}
                      />
                      <Text style={{color: colors.complimentary}}>0:25</Text>
                    </View>
                  ) : (
                    <Text style={styles.msgText}></Text>
                  )}
                  <Text style={styles.msgTime}>
                    {formatTime(item.localTime)}
                  </Text>
                  {/* <Text style={styles.msgTime}>12:59 | 11 -04-2022 07:59</Text> */}
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
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
