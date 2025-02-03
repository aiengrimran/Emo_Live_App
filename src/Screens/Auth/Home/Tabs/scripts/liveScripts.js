import {
  setLeaveModal,
  setPodcastListeners,
  setPodcast,
} from '../../../../../store/slice/podcastSlice';
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
export const resetLiveStreaming = dispatch => {
  console.log('function run');
  dispatch(setLeaveModal(false));
  dispatch(setIsJoined(false));
  dispatch(setStreamListeners([]));
  dispatch(setStream(''));
  dispatch(setLiveStatus('IDLE'));
};
