import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import echo from '../utils/echo';
import {io} from 'socket.io-client';
import createEcho from '../utils/echo2';
const REVERB_WS_URL = 'ws://192.168.10.3:8080/app/xjceygqczxvyasqh0c2d';

export default function RealTime() {
  const [letChannel, setLetChannel] = useState<any>('');
  const [connectionStatus, setConnectionStatus] = useState('Initializing...');
  const [messages, setMessages] = useState<any>([]);
  const [echo, setEcho] = useState(null);

  const connect = () => {
    try {
      const socket = io(REVERB_WS_URL, {
        transports: ['websocket'], // Force WebSocket transport
        query: {
          protocol: 7,
          client: 'js',
          version: '8.4.0', // Match backend version
          flash: false,
        },
      });

      // Log successful connection
      socket.on('connect', () => {
        console.log('✅ Connected to Laravel Reverb WebSocket!');
      });

      socket.on('connect_error', err => {
        console.log('❌ Connection Error:', err);
      });

      // Listen for messages
      socket.on('ChatMessage', data => {
        console.log('📩 New message received:', data);
      });

      // Function to send a message
      const sendMessage = message => {
        socket.emit('chat:sendMessage', {message});
      };

      socket.on('disconnect', reason => {
        console.log('Disconnected:', reason);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      // Initialize Echo
      const echoInstance = createEcho();
      setEcho(echoInstance);
      setConnectionStatus('Connecting to Reverb...');

      // Listen to a public channel
      const channel = echoInstance.channel('test-channel');

      // Listen for specific events
      channel.listen('TestEvent', data => {
        console.log('Received TestEvent:', data);
        setMessages(prev => [
          ...prev,
          {
            event: 'TestEvent',
            data,
            timestamp: new Date().toISOString(),
          },
        ]);
      });

      // Handle connection status
      if (echoInstance.connector && echoInstance.connector.pusher) {
        const pusher = echoInstance.connector.pusher;

        pusher.connection.bind('connected', () => {
          setConnectionStatus('Connected to Reverb');
        });

        pusher.connection.bind('disconnected', () => {
          setConnectionStatus('Disconnected from Reverb');
        });

        pusher.connection.bind('error', error => {
          setConnectionStatus(`Error: ${error.message || 'Connection failed'}`);
        });
      }

      // Clean up on unmount
      return () => {
        if (echoInstance) {
          echoInstance.disconnect();
        }
      };
    } catch (error) {
      console.error('Error setting up Echo:', error);
      setConnectionStatus(`Error: ${error.message}`);
    }
  }, []);

  const test2 = () => {
    try {
      // Listen to a public channel
      echo.channel('chat-channel').listen('.TestEvent', (e: any) => {
        console.log('Received event:', e);
      });

      console.log('WebSocket connection established');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>RealTime</Text>
      <Button title="Connect" onPress={connect} />
      <Button title="test2" onPress={test2} />
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
