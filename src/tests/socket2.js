import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import WebSocketService from '../utils/webSocket';
export default function SocketIO() {
  const [prices, setPrices] = useState(null);

  //   useEffect(() => {
  //     const socket = io('wss://ws.coincap.io/prices?assets=bitcoin,ethereum', {
  //     // const socket = io('wss://ws.coincap.io/prices?assets=bitcoin,ethereum', {
  //       transports: ['websocket'],
  //     });

  //     socket.on('connect', () => {
  //       console.log('✅ Connected to CoinCap WebSocket');
  //     });

  //     // ✅ Correct event listener for receiving prices
  //     socket.on('data', data => {
  //       console.log('📊 Crypto Prices:', data);
  //       setPrices(data); // Update state with received data
  //     });

  //     return () => {
  //       console.log('🔴 Disconnecting WebSocket...');
  //       socket.disconnect(); // Cleanup to avoid memory leaks
  //     };
  //   }, []);

  const reverb2 = () => {
    try {
      const ws = new WebSocket('ws://localhost:8080/app/xjceygqczxvyasqh0c2d');
      ws.onopen = () => {
        console.log('✅ Connected to Laravel Reverb WebSocket');

        // Example: Subscribe to a channel (if using Pusher-like channels)
        ws.send(
          JSON.stringify({
            event: 'pusher:subscribe',
            data: {channel: 'chat-channel'},
          }),
        );
      };

      ws.onmessage = event => {
        console.log('📩 Message from Laravel Reverb:', event.data);
      };

      ws.onerror = error => {
        console.error('❌ WebSocket Error:', error);
      };

      ws.onclose = () => {
        console.log('❌ ccWebSocket Disconnected');
      };
    } catch (error) {
      console.log('Error in connecting:', error);
    }
  };

  const test = () => {
    try {
      WebSocketService.disconnect();

      // const res =
    } catch (error) {
      console.log('error', error);
    }
  };

  const stop = () => {};
  return (
    <View style={styles.container}>
      <Text>SocketIO</Text>
      <Text>{JSON.stringify(prices, null, 2)}</Text>

      <Button title="reverb2" onPress={reverb2} />
      <Button title="stop " onPress={stop} />
      <Button title="test WS" onPress={test} />
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
