import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../../styles/colors';
import appStyles from '../../../../../styles/styles';
import {ChatClient} from 'react-native-agora-chat';
import {useSelector, useDispatch} from 'react-redux';
// import setModalInfo from '../../'
import {
  setHostLeftPodcast,
  setLeaveModal,
} from '../../../../../store/slice/podcastSlice';
import axios from 'axios';
import envVar from '../../../../../config/envVar';
import axiosInstance from '../../../../../Api/axiosConfig';

interface EndLiveProps {
  user: any;
  endPodcastForUser: any;
  navigation: any;
  id: any;
  live: boolean;
}
export default function EndLive({
  user,
  endPodcastForUser,
  navigation,
  id,
  live = false,
}: EndLiveProps) {
  const chatClient = ChatClient.getInstance();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const {leaveModal, hostLeftPodcast, modalInfo, podcast} = useSelector(
    (state: any) => state.podcast,
  );
  const {stream} = useSelector((state: any) => state.streaming);
  const endPodcast = () => {
    try {
      setDisabled(true);
      if (user.id == podcast.host || user.id == stream.host) {
        apiCall();
        return;
      }
      setDisabled(false);
      endPodcastForUser();

      // dispatch(setHostLeftPodcast(false));
    } catch (error: any) {
      console.log(error.response);
    }
  };
  const apiCall = async () => {
    try {
      console.log('ending', live ? 'live' : 'podcast');
      const url = envVar.API_URL + live ? 'stream' : 'podcast' + '/end/' + id;
      // const url = envVar.API_URL + 'podcast/end/' + id;
      const res = await axiosInstance.get(url);
      console.log(res.data);
      setDisabled(false);

      endPodcastForUser();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelLeave = () => {
    dispatch(setLeaveModal(false));
  };

  return (
    <View>
      <Modal
        visible={leaveModal}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelLeave}>
        {/* Backdrop */}
        <View style={styles.backdrop}>
          {/* Modal Content */}
          {disabled ? (
            <ActivityIndicator
              animating={disabled}
              size={'large'}
              color={colors.complimentary}
            />
          ) : (
            <View style={styles.modalView}>
              <Text style={[appStyles.title1, {color: colors.complimentary}]}>
                {live ? 'Live Streaming' : 'Podcast'} End
              </Text>
              <View style={{marginVertical: 20}}>
                {live ? (
                  <Text
                    style={[appStyles.regularTxtMd, {color: colors.body_text}]}>
                    {hostLeftPodcast
                      ? 'Host Has Left Stream'
                      : user.id == podcast.id
                      ? 'Are you sure to end this podcast Host'
                      : 'Are you sure to left this Stream.'}
                  </Text>
                ) : (
                  <Text
                    style={[appStyles.regularTxtMd, {color: colors.body_text}]}>
                    {hostLeftPodcast
                      ? 'Host Has Left PodCast'
                      : user.id == podcast.id
                      ? 'Are you sure to end this podcast Host'
                      : 'Are you sure to left this Podcast.'}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                disabled={disabled}
                onPress={endPodcast}
                style={[styles.deleteButton]}>
                <Text style={styles.deleteText}>
                  {hostLeftPodcast ? 'Ok' : 'Confirm'}
                </Text>
              </TouchableOpacity>
              {!hostLeftPodcast && (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={cancelLeave}
                  style={styles.cancelButton}>
                  <Text
                    style={[appStyles.paragraph1, {color: colors.unknown2}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </Modal>
      {/* <Text>EndLive</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Custom RGBA backdrop color
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  modalView: {
    // width: 300,
    padding: 20,
    backgroundColor: colors.LG,
    alignSelf: 'center',
    width: '90%',
    // minWidth
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 26,
  },
  deleteButton: {
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 12,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteText: {
    color: colors.offwhite,
    ...appStyles.paragraph1,
  },
  cancelButton: {
    padding: 16,
  },
});
