import {io} from 'socket.io-client';

// Replace with your Laravel Reverb WebSocket URL
const socket = io('ws://192.168.43.238:6001', {
  transports: ['websocket'], // Force WebSocket transport
  auth: {
    token: 'YOUR_ACCESS_TOKEN', // Optional: If authentication is required
  },
});

// Log connection status
socket.on('connect', () => {
  console.log('Connected to Reverb WebSocket!');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Reverb WebSocket.');
});

// Listen for messages from a specific channel
socket.on('chat:message.sent', data => {
  console.log('Message received:', data);
});

// Emit an event to Laravel
const sendMessage = message => {
  socket.emit('chat:sendMessage', {message});
};

export {socket, sendMessage};
