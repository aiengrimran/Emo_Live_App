import {createSlice} from '@reduxjs/toolkit';

const streamingSlice = createSlice({
  name: 'streaming',
  initialState: {
    guests: null,
    rtcTokenRenewed: false,
    stream: {
      channel: 'ch_84536_0b85',
      created_at: '2025-02-02T08:22:16.000000Z',
      duration: 10,
      host: 2,
      id: 3,
      listeners: 6,
      listeners_added: 'null',
      status: 'STARTED',
      title: 'Some title',
      type: 'PUBLIC',
      updated_at: '2025-02-02T08:22:16.000000Z',
      user: {
        account_verified: 0,
        address: 'buner kpk',
        agora_chat_token:
          '007eJxTYOCp36dep/BO+u8DD9Eft8wdvT8t4mLJPDfRritg88JDR00UGJKTDM0tLEwt09IMDE0MDFIsDFKSTQxSUg3NzdNSU5KSm+7Wpxv9rk9P/vyPkZGBlYERCEF8IAkA20sh0g==',
        agora_chat_uid: null,
        agora_rtc_token:
          '007eJxTYHATlnp6aJNrRo7Mdsm8GTvPTvy15EJL4xr2+J+v7nQLXnivwJCcZGhuYWFqmZZmYGhiYJBiYZCSbGKQkmpobp6WmpKUbKE9P70hkJEhm8WJkZGBkYEFiEGACUwyg0kWMMnLkJwRb2FiamwWb5BkYcrIYAQAESchvA==',
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
        updated_at: '2025-02-02T08:22:16.000000Z',
        user_name: null,
      },
    },
    streamListeners: [],
    streams: [],
  },
  reducers: {
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
    updateStreamListeners: (state, action) => {
      let hosts = Array.from({length: action.payload}, (_, i) => ({
        id: null,
        seatNo: i + 1,
        user: null,
        occupied: false,
        muted: false,
      }));
      // let hosts = Array.from({length: action.payload}, (_, i) => i + 1);
      state.streamListeners = hosts;
    },
    setStream: (state, action) => {
      state.stream = action.payload;
    },
    setStreams: (state, action) => {
      state.streams = action.payload;
    },
    setStreamListeners: (state, action) => {
      state.streamListeners = action.payload;
    },
    setUserInState: (state, {payload}) => {
      let currentUsers = state.streamListeners;
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
        state.streamListeners = updatedUsers;

        // dispatch(setPodcastListeners(updatedUsers));
      } else {
        console.warn('No empty rooms available');
      }
    },
    setPrevUsersInStream: (state, {payload}) => {
      let currentUsers = state.streamListeners;
      const existingUserIds = new Set(currentUsers.map(item => item.user?.id));

      const newUsers = payload
        .filter(user => !existingUserIds.has(user.id))
        .map(user => ({
          user,
          occupied: true,
          seatNo: null, // Default value (or set based on logic)
          muted: false, // Default value (or set based on logic)
        }));
      state.streamListeners = [...currentUsers, ...newUsers];
    },
    removeUserFromStream: (state, {payload}) => {
      let currentUsers = state.streamListeners;
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
        state.streamListeners = currentUsers;
      } else {
        console.warn('User not found in listener');
      }
    },
  },
});

export const {
  setGuests,
  setStream,
  setStreamListeners,
  updateStreamListeners,
  setStreams,
  setUserInState,
  setPrevUsersInStream,
  removeUserFromStream,
} = streamingSlice.actions;

export default streamingSlice.reducer;
