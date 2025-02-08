import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import axiosInstance from '../../Api/axiosConfig';

export const getUserInfoFromAPI = createAsyncThunk(
  'podcast/getUserInfoFromAPI',
  async (id, {getState, dispatch}) => {
    // async (id: number, {getState, dispatch}) => {
    try {
      console.log(id, 'user id from podcast');
      const {podcastListeners} = getState().podcast;
      // Check if user already exists in the list
      const currentUsers = podcastListeners;

      if (currentUsers.some(item => item.user?.id === id)) return;

      // Fetch user data from API
      const {data} = await axiosInstance.post('users-info', {users: [id]});

      if (data.users?.[0]) {
        // Find an empty slot where `occupied` is false and `user` is not assigned
        const emptyRoomIndex = currentUsers.findIndex(
          item => !item.occupied && !item.user,
        );

        if (emptyRoomIndex !== -1) {
          // Create a new array with updated user information (immutably)
          const updatedUsers = currentUsers.map((item, index) =>
            index === emptyRoomIndex
              ? {...item, user: data.users[0], occupied: true}
              : item,
          );

          // Dispatch an action to update the state
          dispatch(setPodcastListeners(updatedUsers));
        } else {
          console.warn('No empty rooms available');
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error; // Re-throw the error to handle it in the component if needed
    }
  },
);
const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    podcast: {
      channel: 'ch_52581_d01d',
      created_at: '2025-02-05T10:49:41.000000Z',
      duration: '20',
      host: 2,
      chat_room_id: '271952572907522',
      id: 1,
      listeners: 5,
      listeners_added: [],
      status: 'STARTED',
      title: 'test 122',
      type: 'PUBLIC',
      updated_at: '2025-02-05T10:49:41.000000Z',
      user: {
        account_verified: 0,
        address: 'buner kpk',
        agora_chat_token:
          '007eJxTYOCp36dep/BO+u8DD9Eft8wdvT8t4mLJPDfRritg88JDR00UGJKTDM0tLEwt09IMDE0MDFIsDFKSTQxSUg3NzdNSU5KSm+7Wpxv9rk9P/vyPkZGBlYERCEF8IAkA20sh0g==',
        agora_chat_uid: null,
        agora_rtc_token:
          '007eJxTYNjwjX/yhy87D5Wn8VxKMJb6/K695tOfBpMdod/f83Y9fmGuwJCcZGhuYWFqmZZmYGhiYJBiYZCSbGKQkmpobp6WmpKU7Oq0OL0hkJEh+RUvKyMDIwMLEIMAE5hkBpMsYJKXITkj3tTI1MIwPsXAMIWRwQgACwckSg==',
        avatar: 'users/avatars/1736177116.jpg',
        bio: 'something should happen special',
        can_create_chat_room: 1,
        created_at: '2024-12-28T09:50:57.000000Z',
        dob: '1997-03-15',
        email: 'zalkip@gmail.com',
        first_name: 'zalkip',
        gender: 'male',
        id: 2,
        last_name: 'khan',
        phone: null,
        provider: null,
        provider_id: null,
        updated_at: '2025-02-05T10:49:41.000000Z',
        user_name: null,
      },
    },
    podcasts: [],

    // podcast: '',
    podcastListeners: [],
    loading: false,
    error: '',
    hostId: null,
    leaveModal: false,
    hostLeftPodcast: false,
    rtcTokenRenewed: false,
  },
  reducers: {
    setPodcast: (state, action) => {
      state.podcast = action.payload;
    },
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
    updatePodcastListeners: (state, action) => {
      let hosts = Array.from({length: action.payload}, (_, i) => ({
        id: null,
        seatNo: i + 1,
        user: null,
        occupied: false,
        muted: false,
      }));
      // let hosts = Array.from({length: action.payload}, (_, i) => i + 1);
      state.podcastListeners = hosts;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHostId(state, action) {
      state.hostId = action.payload;
    },
    setRTCTokenRenewed(state, action) {
      state.rtcTokenRenewed = action.payload;
    },
    setLeaveModal(state, action) {
      state.leaveModal = action.payload;
    },
    setPodcastListeners: (state, action) => {
      console.log('i updated array ....');
      state.podcastListeners = action.payload;
    },
    updatePodcastRoomId: (state, {payload}) => {
      let podcast = state.payload;
      podcast = {...podcast, chat_room_id: payload};
      state.podcast = podcast;
    },
    setHostLeftPodcast: (state, action) => {
      state.hostLeftPodcast = action.payload;
    },
    setUserInState: (state, {payload}) => {
      let currentUsers = state.podcastListeners;
      // Check if user already exists in the list
      let joined = currentUsers.find(item => item.user?.id == payload.id);
      if (joined) return;

      // Find an empty room (unoccupied slot)
      const emptyRoomIndex = currentUsers.findIndex(item => !item.occupied);
      console.log(emptyRoomIndex, 'emptyRoomIndex', 'i am adding myself');

      if (emptyRoomIndex !== -1) {
        // Create a new array with the updated user (immutable update)
        const updatedUsers = currentUsers.map((item, index) =>
          index === emptyRoomIndex
            ? {...item, user: payload, occupied: true}
            : item,
        );
        state.podcastListeners = updatedUsers;

        // dispatch(setPodcastListeners(updatedUsers));
      } else {
        console.warn('No empty rooms available');
      }
    },
    setPrevUsersInPodcast: (state, {payload}) => {
      let currentUsers = state.podcastListeners;

      const existingUserIds = new Set(currentUsers.map(item => item.user?.id));

      const newUsers = payload
        .filter(user => !existingUserIds.has(user.id))
        .map(user => ({
          user,
          occupied: true,
          seatNo: null, // Default value (or set based on logic)
          muted: false, // Default value (or set based on logic)
        }));
      state.podcastListeners = [...currentUsers, ...newUsers];
    },
    updatedMuteUnmuteUser: (state, {payload}) => {
      state.streamListeners = state.streamListeners.map(listener =>
        listener.user?.id === payload
          ? {...listener, muted: !listener.muted} // Create a new object with updated muted property
          : listener,
      );
    },
    removeUserFromPodcast: (state, {payload}) => {
      let currentUsers = state.podcastListeners;
      console.log('Copy run key ... filtering out user', currentUsers);

      // Find the index of the user in the occupied rooms
      const emptyRoomIndex = currentUsers.findIndex(
        item => item.occupied && item.user?.id === payload,
      );

      if (emptyRoomIndex !== -1) {
        // Get the user details safely
        let leaveUser = currentUsers[emptyRoomIndex]?.user;

        // Free the room
        currentUsers[emptyRoomIndex] = {
          ...currentUsers[emptyRoomIndex],
          user: null,
          occupied: false,
        };

        // Show alert if leaveUser exists
        if (leaveUser) {
          Alert.alert('User Left:', leaveUser?.first_name || 'Unknown');
        }
      } else {
        console.warn('User not found in listener');
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserInfoFromAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfoFromAPI.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getUserInfoFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPodcast,
  setPodcasts,
  setRoomId,
  setHostId,
  setLoading,
  updatedMuteUnmuteUser,
  updatePodcastRoomId,
  setPodcastListeners,
  setRTCTokenRenewed,
  updatePodcastListeners,
  setHostLeftPodcast,
  setLeaveModal,
  setUserInState,
  setPrevUsersInPodcast,
  removeUserFromPodcast,
} = podcastSlice.actions;

export default podcastSlice.reducer;
