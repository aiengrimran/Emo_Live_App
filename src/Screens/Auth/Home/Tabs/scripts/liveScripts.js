import {
  setLeaveModal,
  setPodcastListeners,
  setPodcast,
} from '../../../../../store/slice/podcastSlice';
import envVar from '../../../../../config/envVar';
import axiosInstance from '../../../../../Api/axiosConfig';
import {
  setStreamListeners,
  setStream,
} from '../../../../../store/slice/streamingSlice';
import {
  setIsJoined,
  setLiveStatus,
} from '../../../../../store/slice/usersSlice';

export const resetPodcastState = dispatch => {
  console.log('function run');
  dispatch(setIsJoined(false));
  dispatch(setPodcastListeners([]));
  dispatch(setPodcast(''));
  dispatch(setLiveStatus('IDLE'));
};

export const getPodcastUsers = async id => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = axiosInstance + 'podcast/users/' + id;
      const res = await axiosInstance.get(url);
      resolve(res.data.users);
    } catch (error) {
      console.log(error);
      reject(error); // Reject the Promise on error
    }
  });
};

export const getLiveUsers = (id, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = axiosInstance + type + '/users/' + id;
      const res = await axiosInstance.get(url);
      resolve(res.data.users);
    } catch (error) {
      console.log(error);
      reject(error); // Reject the Promise on error
    }
  });
};
export const resetLiveStreaming = dispatch => {
  console.log('function run');
  dispatch(setLeaveModal(false));
  dispatch(setIsJoined(false));
  dispatch(setStreamListeners([]));
  dispatch(setStream(''));
  dispatch(setLiveStatus('IDLE'));
};
