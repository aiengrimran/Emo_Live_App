import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './slice/usersSlice';
import chatReducer from './slice/chatSlice';
import notificationReducer from './slice/notificationSlice';
import podcastReducer from './slice/podcastSlice';
import streamingReducer from './slice/streamingSlice';

export const store = configureStore({
  reducer: {
    user: usersReducer,
    chat: chatReducer,
    notification: notificationReducer,
    podcast: podcastReducer,
    streaming: streamingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['chat/setMessages'],
        ignoredPaths: ['chat.messages'], // Ignore this path in the state
      },
    }),
  // middleware:(getDefaultMiddleware) =>
});
export default store;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
