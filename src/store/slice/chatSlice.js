import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ChatClient, ChatOptions} from 'react-native-agora-chat';
import envVar from '../../config/envVar';
const AGORA_CHAT_KEY = envVar.AGORA_CHAT_KEY;
// const chatManager = chatClient.chatManager;

// Async thunk for initializing the chat SDK

// Async thunk for adding connection listeners
// export const setupConnectionListeners = createAsyncThunk(
//   'chat/setupConnectionListeners',
//   async (_, {dispatch, rejectWithValue}) => {
//     try {
//       const connectionListener = {
//         onConnected: () => {
//           console.log('Connected to chat server');
//           dispatch(setConnectionStatus(true));
//         },
//         onDisconnected: errorCode => {
//           console.log('Disconnected from chat server:', errorCode);
//           dispatch(setConnectionStatus(false));
//         },
//         onTokenWillExpire: () => {
//           console.log('Token will expire soon.');
//         },
//         onTokenDidExpire: () => {
//           console.log('Token has expired.');
//         },
//       };

//       chatClient.addConnectionListener(connectionListener);
//     } catch (error) {
//       console.error('Failed to set up connection listeners:', error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    initialized: false,
    connected: false,
    error: null,
    tokenRenewed: false,
    messages: [],
    chatRoomMessage: [],
  },
  reducers: {
    setConnectionStatus(state, action) {
      state.connected = action.payload;
    },
    setModalInfo(state, action) {
      state.modalInfo.modal = action.payload.modal;
      state.modalInfo.isHost = action.payload.isHost;
    },
    setHostLeftPodcast(state, action) {
      state.hostLeftPodcast = action.payload;
    },
    setChatRoomMessages: (state, action) => {
      state.chatRoomMessage = action.payload;
    },

    setTokenRenewed(state, action) {
      state.tokenRenewed = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
    setConnected(state, action) {
      state.connected = action.payload;
    },
  },
});

export const {
  setConnectionStatus,
  setTokenRenewed,
  setMessages,
  setInitialized,
  setChatRoomMessages,
  setConnected,
} = chatSlice.actions;

export default chatSlice.reducer;
