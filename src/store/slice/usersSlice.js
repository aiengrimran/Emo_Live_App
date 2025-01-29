import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [],
  visitProfile: '',
  distTip: [],
  rtcTokenRenewed: false,
  loading: false,
};

export const managerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    updateVisitProfile: (state, action) => {
      state.visitProfile = action.payload;
    },
    setRTCTokenRenewed: (state, action) => {
      state.rtcTokenRenewed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateUsers, updateVisitProfile, setRTCTokenRenewed, setLoading} =
  managerSlice.actions;

export default managerSlice.reducer;
