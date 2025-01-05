import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [],
  visitProfile: '',
  pendingRequests: [],
  setteledRequests: [],
  busyValets: [],
  distTip: [],
};

export const managerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    updateVisitProfile: (state, action) => {
      state.visitProfile = action.payload;
    },
    updateTotalValets: (state, action) => {
      state.totalValets = action.payload;
    },
    updatePendingRequest: (state, action) => {
      state.pendingRequests = action.payload;
    },
    updateSetteledRequests: (state, action) => {
      state.setteledRequests = action.payload;
    },
    updateBusyValets: (state, action) => {
      state.busyValets = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUsers,
  updateVisitProfile,
  updatePendingRequest,
  updateSetteledRequests,
  updateDistTip,
  updateBusyValets,
} = managerSlice.actions;

export default managerSlice.reducer;
