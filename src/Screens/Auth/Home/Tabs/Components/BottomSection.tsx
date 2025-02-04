import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {colors} from '../../../../../styles/colors';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../../styles/styles';
import liveStyles from '../styles/liveStyles';
import {
  ChatClient,
  ChatMessage,
  ChatMessageChatType,
} from 'react-native-agora-chat';

import {msgs} from './tempData';
import {useState} from 'react';
interface BottomSectionProps {
  handleOpenSheet: any;
  roomId: string;
}

const BottomSection = ({handleOpenSheet, roomId}: BottomSectionProps) => {
  const chatClient = ChatClient.getInstance();
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState<any>({
    content: '',
    status: 'IDLE',
  });

  const sendChatRoomMessage = async () => {
    console.log(message);
    try {
      let msg;
      msg = ChatMessage.createTextMessage(
        String(roomId),
        message.content,
        ChatMessageChatType.ChatRoom,
      );

      const callback = new (class {
        onProgress(locaMsgId, progress) {
          console.log(`send message process: ${locaMsgId}, ${progress}`);
          setMessage(prevState => ({...prevState, status: 'SENDING'}));
        }
        onError(locaMsgId, error) {
          setMessage((prevState: any) => ({
            ...prevState,
            content: '',
            status: 'FAILED',
          }));
          console.log(
            `send message fail: ${locaMsgId}, ${JSON.stringify(error)}`,
          );
        }
        onSuccess(message: any) {
          console.log(message);
          setMessage((prevState: any) => ({
            ...prevState,
            content: '',
            status: 'SUCCESS',
          }));
          const updatedMessages = [...messages, message];
          setMessages(updatedMessages);
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
    <View style={{marginTop: 30, flex: 1}}>
      {/* <View style={{position: 'absolute', bottom: '5%'}}> */}
      <View style={{flexDirection: 'row', width: '80%'}}>
        <Text style={[appStyles.bodyMd, {color: colors.yellow}]}>
          Emo Live :{' '}
        </Text>
        <Text
          style={[
            appStyles.bodyRg,
            {color: colors.complimentary, textAlign: 'left'},
          ]}>
          {' '}
          Great to see you here. Please don’t use abusive language, enjoy the
          stream, Have fun😊
        </Text>
      </View>
      <View style={{height: '60%', marginTop: 10}}>
        <FlatList
          data={messages}
          // data={msgs}
          keyExtractor={(item: any) => item?.msgId.toString()}
          renderItem={({item}: any) => (
            <View
              style={{
                padding: 4,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
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
          onChangeText={(e: string) =>
            setMessage((prevState: any) => ({...prevState, content: e}))
          }
          value={message.content}
          placeholder="Say hello ...."
          placeholderTextColor={'grey'}
        />
        <View style={styles.action}>
          {/* <TouchableOpacity> */}
          <TouchableOpacity onPress={sendChatRoomMessage}>
            <Icon name="send" color={colors.complimentary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="dots-horizontal"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOpenSheet('tools')}>
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
});

const renderHost = ({item, index}) => (
  <View>
    <Text>{item.localMsgId}</Text>
  </View>
);
