import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initializeAgoraSDK = createAsyncThunk({});
const podCastSlice = createSlice({
  initialState: {
    engine: null,
  },
  reducers: {
    setEngine: (state, action) => {
      state.engine = action.payload;
    },
  },
  extraReducers: {},
});
