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
  },
});

export const {
  setGuests,
  setStream,
  setStreamListeners,
  updateStreamListeners,
  setStreams,
} = streamingSlice.actions;

export default streamingSlice.reducer;
