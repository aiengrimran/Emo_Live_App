import {createSlice} from '@reduxjs/toolkit';

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    engine: null,
    podcast: '',
    podcastListeners: [],
    roomId: null,
    hostId: null,
    modalInfo: {
      modal: false,
      isHost: '',
    },
    hostLeftPodcast: false,
    rtcTokenRenewed: false,
  },
  reducers: {
    setPodcast: (state, action) => {
      state.podcast = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setHostId(state, action) {
      state.hostId = action.payload;
    },
    setRTCTokenRenewed(state, action) {
      state.rtcTokenRenewed = action.payload;
    },
    setModalInfo(state, action) {
      state.modalInfo.modal = action.payload.modal;
      state.modalInfo.isHost = action.payload.isHost;
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
  setRoomId,
  setHostId,
  setPodcastListeners,
  setRTCTokenRenewed,
  setHostLeftPodcast,
  setModalInfo,
} = podcastSlice.actions;

export default podcastSlice.reducer;
