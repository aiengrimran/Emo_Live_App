import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    // podcast: ,
    podcasts: [],

    podcast: '',
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
      console.log('i updated array ....');
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
