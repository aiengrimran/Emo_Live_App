import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    initialized: false,
    connected: false,
    error: null,
    tokenRenewed: false,
    messages: [],
    messagesByConversation: {},
    activeConversationId: '',
    chatRoomMessages: [],
  },
  reducers: {
    setModalInfo(state, action) {
      state.modalInfo.modal = action.payload.modal;
      state.modalInfo.isHost = action.payload.isHost;
    },
    setHostLeftPodcast(state, action) {
      state.hostLeftPodcast = action.payload;
    },
    setChatRoomMessages: (state, {payload}) => {
      let roomMessage = [...state.chatRoomMessages];
      payload.forEach(message => {
        roomMessage.push(message);
      });
      state.chatRoomMessages = roomMessage;
    },
    resetChatRoomMessage: state => {
      state.chatRoomMessages = [];
    },
    setTokenRenewed(state, action) {
      state.tokenRenewed = action.payload;
    },
    setMessages(state, {payload}) {
      console.log(payload);
      // Loop through each incoming message in the payload
      payload.forEach(message => {
        // return;
        const {from} = message;
        // Append the new message to the existing conversation's messages
        state.messagesByConversation[from] = [
          ...(state.messagesByConversation[from] || []), // Existing messages (or empty array if none)
          message, // New message
        ];
      });
    },
    setSentMessage: (state, {payload}) => {
      const {to} = payload; // Extract the recipient ID (conversationId)

      // Append the new message to the existing conversation's messages
      state.messagesByConversation[to] = [
        ...(state.messagesByConversation[to] || []), // Existing messages (or empty array if none)
        payload, // New message
      ];
    },
    setMessagesx(state, {payload}) {
      // console.log(payload);
      // Loop through each incoming message in the payload
      payload.forEach(message => {
        // return;
        const {from} = message;
        // Append the new message to the existing conversation's messages
        state.messagesByConversation[conversationId] = [
          ...(state.messagesByConversation[conversationId] || []), // Existing messages (or empty array if none)
          message, // New message
        ];
      });
    },
    setMessageStatus: (state, {payload}) => {
      const {conversationId, msgId, status} = payload;
      console.log(conversationId, msgId, status);

      // Check if the conversation exists
      if (!state.messagesByConversation[conversationId]) {
        console.warn(`Conversation ID ${conversationId} not found in state.`);
        return;
      }

      // Update the specific message's status
      state.messagesByConversation[conversationId] =
        state.messagesByConversation[conversationId].map(message =>
          message.localMsgId === msgId ? {...message, status} : message,
        );
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
  setMessageStatus,
  setTokenRenewed,
  setMessages,
  setInitialized,
  setChatRoomMessages,
  setConnected,
  setSentMessage,
  resetChatRoomMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
