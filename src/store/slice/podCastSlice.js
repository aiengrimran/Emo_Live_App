import {createSlice} from '@reduxjs/toolkit';

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    engine: null,
    // podcast: {
    //   channel: 'ch_38881_70cf',
    //   created_at: '2025-01-29T08:21:21.000000Z',
    //   duration: '20',
    //   host: 2,
    //   id: 16,
    //   listeners_added: 'null',
    //   status: 'STARTED',
    //   title: 'test 122',
    //   type: 'public',
    //   updated_at: '2025-01-29T08:21:21.000000Z',
    // },
    podcasts: [],

    podcast: '',
    podcastListeners: [],
    roomId: '',
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
    setRoomId: (state, action) => {
      state.roomId = action.payload;
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
    setEngine: (state, action) => {
      state.engine = action.payload;
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
  setHostLeftPodcast,
  setLeaveModal,
} = podcastSlice.actions;

export default podcastSlice.reducer;
