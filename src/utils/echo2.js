// echo.js
import Echo from 'laravel-echo';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

// Configure Pusher for React Native
const configurePusher = () => {
  // For development/debugging
  Pusher.logToConsole = true;

  return Pusher;
};

// Create Echo instance
const createEcho = () => {
  const PusherInstance = configurePusher();

  // Setup Echo with Reverb configuration
  const echo = new Echo({
    broadcaster: 'reverb',
    key: 'xjceygqczxvyasqh0c2d', // Replace with your Reverb app key
    wsHost: 'localhost', // For Android emulator (use 'localhost' for iOS simulator or your Mac's IP)
    wsPort: 8080, // Default Reverb port
    wssPort: 8080, // Same port for secure connections
    forceTLS: false, // Set to false for local development
    enabledTransports: ['ws', 'wss'],
    client: PusherInstance,
  });

  return echo;
};

export default createEcho;
