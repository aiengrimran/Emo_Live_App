import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async ids => {
    try {
      // Fetch user data from API
      const {data} = await axiosInstance.post('users-info', {users: ids});
      return data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error; // Re-throw the error to handle it in the component if needed
    }
  },
);

const initialState = {
  users: [],
  visitProfile: '',
  distTip: [],
  rtcTokenRenewed: false,
  loading: false,
  userDetails: {},
  error: '',
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
    setGuestUser: (state, {payload}) => {
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
  extraReducers: builder => {
    builder
      .addCase(fetchUserDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = false;
        // Merge the fetched user details into the existing userDetails object
        action.payload.forEach(user => {
          state.userDetails[user.id] = user;
        });
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
