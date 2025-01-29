import {createSlice} from '@reduxjs/toolkit';

const streamingSlice = createSlice({
  name: 'streaming',
  initialState: {
    guests: null,
    rtcTokenRenewed: false,
    stream: {
      channel: 'ch_49986_f779',
      created_at: '2025-01-29T11:26:26.000000Z',
      duration: 10,
      host: 1,
      id: 4,
      listeners_added: 'null',
      status: 'STARTED',
      listeners: 2,
      title: 'Start Live View',
      type: 'PUBLIC',
      updated_at: '2025-01-29T11:26:26.000000Z',
    },
    // stream: '',
    streamListeners: [],
    streams: [],
  },
  reducers: {
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
    updateStreamListeners: (state, action) => {
      let hosts = Array.from({length: action.payload}, (_, i) => i + 1);
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
