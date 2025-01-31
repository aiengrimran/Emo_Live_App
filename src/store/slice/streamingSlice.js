import {createSlice} from '@reduxjs/toolkit';

const streamingSlice = createSlice({
  name: 'streaming',
  initialState: {
    guests: null,
    rtcTokenRenewed: false,
    stream: '',
    streamListeners: [],
    // streamListeners: [Array.from({length: 2}, (_, i) => i + 1)],
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
