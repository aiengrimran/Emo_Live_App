import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './slice/usersSlice';
import chatReducer from './slice/chatSlice';
import notificationReducer from './slice/notificationSlice';
import podcastReducer from './slice/podcastSlice';
import streamingReducer from './slice/streamingSlice';
// import {composeWithDevTools} from 'redux-devtools-extension';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    chat: chatReducer,
    notification: notificationReducer,
    podcast: podcastReducer,
    streaming: streamingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'chat/setMessages',
          'chat/setChatRoomMessages',
          'chat/setMessageStatus',
          'chat/setSentMessage',
        ],
        ignoredPaths: [
          'chat.messages',
          'chat.chatRoomMessages',
          'chat.messagesByConversation',
        ], // Ignore this path in the state
      },
    }),
  // enhancers: [composeWithDevTools],
  // middleware:(getDefaultMiddleware) =>
});
export default store;
// export type AppDispatch = typeof store.dispatch

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
// chat.messagesByConversation
