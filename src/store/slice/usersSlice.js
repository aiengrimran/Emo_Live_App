import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [],
  visitProfile: '',
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
  },
});

// Action creators are generated for each case reducer function
export const {updateUsers, updateVisitProfile} = managerSlice.actions;

export default managerSlice.reducer;
