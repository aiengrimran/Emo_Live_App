import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ChatClient} from 'react-native-agora-chat';

export default function Chats1() {
  const chatClient = ChatClient.getInstance();
  console.log(chatClient);
  return (
    <View style={styles.container}>
      <Text>Chats1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
