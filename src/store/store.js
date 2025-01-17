import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './slice/usersSlice';
import chatReducer from './slice/chatSlice';

export const store = configureStore({
  reducer: {
    usersReducer,
    chat: chatReducer,
  },
});
export default store;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
