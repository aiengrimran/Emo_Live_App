import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [],
  visitProfile: '',
  distTip: [],
  rtcTokenRenewed: false,
  loading: false,
  isJoined: false,
  liveStatus: 'IDLE',
  selectedGuest: '',
  chatConnected: false,
  chatUser: '',
  roomId: '',
  liveForm: {
    liveType: null,
    title: 'test 122',
    duration: '20',
    listeners: null,
    type: null,
  },
  guestUser: {
    joined: null,
    user: '',
  },
};

export const managerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedGuest: (state, action) => {
      state.selectedGuest = action.payload;
    },
    setGuestUser: (state, {}) => {
      state.guestUser.joined = payload.state;
      state.guestUser.user = payload.user;
    },
    setLiveForm: (state, {payload}) => {
      state.liveForm = {
        ...state.liveForm,
        [payload.field]: payload.value,
      };
      console.log(state.liveForm);
    },
    setLiveFormFull: (state, {payload}) => {
      state.liveForm = payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setChatUser: (state, action) => {
      state.chatUser = action.payload;
    },
    setLiveStatus: (state, action) => {
      state.liveStatus = action.payload;
    },
    setIsJoined(state, action) {
      state.isJoined = action.payload;
    },
    setChatConnected(state, action) {
      state.chatConnected = action.payload;
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
export const {
  updateUsers,
  setRoomId,
  updateVisitProfile,
  setRTCTokenRenewed,
  setIsJoined,
  setSelectedGuest,
  setLiveForm,
  setChatConnected,
  setChatUser,
  setLiveFormFull,
  setGuestUser,
  setLoading,
  setLiveStatus,
} = managerSlice.actions;

export default managerSlice.reducer;
