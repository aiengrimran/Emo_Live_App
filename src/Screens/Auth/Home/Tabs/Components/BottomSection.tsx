import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet,
} from 'react-native';
import {colors} from '../../../../../styles/colors';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../../styles/styles';
import {setGuestUser} from '../../../../../store/slice/usersSlice';
import liveStyles from '../styles/liveStyles';
import {setChatRoomMessages} from '../../../../../store/slice/chatSlice';
import {
  ChatClient,
  ChatMessage,
  ChatMessageChatType,
} from 'react-native-agora-chat';

import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
interface BottomSectionProps {
  handleOpenSheet: any;
  roomId: string;
}

const BottomSection = ({handleOpenSheet, roomId}: BottomSectionProps) => {
  const chatClient = ChatClient.getInstance();
  const dispatch = useDispatch();
  const {chatRoomMessages} = useSelector((state: any) => state.chat);
  const {guestUser} = useSelector((state: any) => state.user);
  const [message, setMessage] = useState<string>('');

  // create an animated value for opacity
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (guestUser.joined) {
      fadeInAndOut();
    }
  }, [guestUser]);
  // Function to start the fade-in and fade-out animation
  const fadeInAndOut = () => {
    // First, set the initial opacity to 1 (fully visible)
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500, // Fade in duration (0.5 seconds)
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => {
      console.log('i am start', 'value => ', fadeAnim);

      // After fading in, start fading out after 3 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, // Fully transparent
          duration: 2500, // Fade out duration (2.5 seconds)
          useNativeDriver: true,
        }).start();
        // update state
        dispatch(setGuestUser({state: null, user: ''}));
      }, 3000); // Wait 3 seconds before starting the fade-out
    });
  };

  const sendChatRoomMessage = async () => {
    if (!roomId) {
      Alert.alert('Slow network', 'Chat room is not created');
      return;
    }
    console.log(message);
    try {
      let msg;
      msg = ChatMessage.createTextMessage(
        String(roomId),
        message,
        ChatMessageChatType.ChatRoom,
      );
      setMessage('');

      let roomMessage = [...chatRoomMessages];
      roomMessage.push(msg);
      dispatch(setChatRoomMessages(roomMessage));
      const callback = new (class {
        onProgress(localMsgId: any, progress: any) {
          console.log(`send message process: ${localMsgId}, ${progress}`);
        }
        onError(localMsgId: any, error: any) {
          let updated = chatRoomMessages.map((roomMessage: ChatMessage) => {
            if (roomMessage.localMsgId === localMsgId) {
              return {...roomMessage, status: 3}; // Return updated message
            }
            return roomMessage; // Keep other messages unchanged
          });
          dispatch(setChatRoomMessages(updated));
          console.log(
            `send message fail: ${localMsgId}, ${JSON.stringify(error)}`,
          );
        }
        onSuccess(message: any) {
          console.log(message);
          let updated = chatRoomMessages.map((roomMessage: ChatMessage) => {
            if (roomMessage.localMsgId === message.localMsgId) {
              return {...roomMessage, status: 2}; // Return updated message
            }
            return roomMessage; // Keep other messages unchanged
          });
          dispatch(setChatRoomMessages(updated));

          // console.log('send message success: ' + message.localMsgId);
        }
      })();
      await chatClient.chatManager.sendMessage(msg, callback);
      // Push the new message to the messages array and update the state
    } catch (error) {
      console.error('Unexpected error occurred:', error);
    }
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      {/* <View style={{position: 'absolute', bottom: '5%'}}> */}
      <View style={styles.sheetMessage}>
        <Text
          onPress={fadeInAndOut}
          style={[appStyles.bodyMd, {color: colors.yellow, lineHeight: 20}]}>
          Emo Live :{' '}
          <Text style={[appStyles.bodyRg, {color: colors.complimentary}]}>
            {' '}
            Great to see you here. Please don’t use abusive language, enjoy the
            stream, Have fun 😊
          </Text>
        </Text>
      </View>
      {guestUser.joined && (
        <Animated.View
          style={{
            opacity: fadeAnim, // Bind the opacity to animated value
          }}>
          <JoinUser guestUser={guestUser} />
        </Animated.View>
      )}
      <View style={{height: '60%', marginTop: 10}}>
        <FlatList
          data={chatRoomMessages}
          keyExtractor={(item: any) => item?.msgId.toString()}
          renderItem={({item}: any) => (
            <View style={styles.list}>
              <View>
                <Image
                  style={{height: 30, width: 30, borderRadius: 20}}
                  source={require('../../../../../assets/images/live/girl1.jpg')}
                />
              </View>
              <Text style={styles.roomMessage}>{item.body.content}</Text>
              {item.status == 3 && (
                <View style={{marginLeft: 5}}>
                  <IconM
                    name="error-outline"
                    size={20}
                    color={colors.complimentary}
                  />
                </View>
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.btn1}>
        <TextInput
          style={styles.inputBox}
          onChangeText={setMessage}
          value={message}
          placeholder="Say hello ...."
          placeholderTextColor={'grey'}
        />
        <View style={styles.action}>
          {/* <TouchableOpacity> */}
          <TouchableOpacity onPress={sendChatRoomMessage}>
            <Icon name="send" color={colors.complimentary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenSheet('tools')}>
            <Icon
              name="dots-horizontal"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <IconM
              name="emoji-emotions"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenSheet('gifts')}>
            <Image
              source={require('../../../../../assets/images/bag.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default BottomSection;

const styles = StyleSheet.create({
  ...liveStyles,
  roomMessage: {
    marginLeft: 5,
    color: colors.complimentary,
    ...appStyles.bodyRg,
  },
  sheetMessage: {
    flexDirection: 'row',
    width: '95%',
    paddingHorizontal: 20,
    borderRadius: 4,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  guest: {
    marginTop: 20,
    paddingVertical: 10,
    width: '95%',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  list: {
    padding: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const JoinUser = ({guestUser}: any) => {
  return (
    <View style={styles.guest}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 2,
          backgroundColor: colors.yellow,
          borderRadius: 9,
        }}>
        <Text style={[appStyles.small, {color: colors.dominant}]}>
          Official{' '}
        </Text>
      </View>
      <View style={{marginLeft: 10, flexDirection: 'row'}}>
        <Text style={[appStyles.bodyMd, {color: colors.yellow}]}>
          Mr {guestUser.user?.first_name}:
        </Text>
        <Text
          style={[
            appStyles.bodyRg,
            {color: colors.complimentary, marginLeft: 5},
          ]}>
          Join Room
        </Text>
      </View>
    </View>
  );
};
