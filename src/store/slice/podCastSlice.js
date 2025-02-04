import {createSlice} from '@reduxjs/toolkit';

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    podcast: {
      channel: 'ch_26390_4b9f',
      created_at: '2025-02-02T19:59:50.000000Z',
      duration: '20',
      host: 2,
      id: 1,
      listeners_added: 'null',
      status: 'STARTED',
      title: 'test 122',
      type: 'public',
      updated_at: '2025-02-02T19:59:50.000000Z',
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
    podcasts: [],

    // podcast: '',
    podcastListeners: [],
    loading: false,
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
      state.podcastListeners = action.payload;
    },
    setHostLeftPodcast: (state, action) => {
      state.hostLeftPodcast = action.payload;
    },
  },
});

export const {
  setPodcast,
  setPodcasts,
  setRoomId,
  setHostId,
  setLoading,
  setPodcastListeners,
  setRTCTokenRenewed,
  updatePodcastListeners,
  setHostLeftPodcast,
  setLeaveModal,
} = podcastSlice.actions;

export default podcastSlice.reducer;
