import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../../styles/colors';
import appStyles from '../../../../../styles/styles';
import {ChatClient} from 'react-native-agora-chat';
import {useSelector, useDispatch} from 'react-redux';
// import setModalInfo from '../../'
import {
  setHostLeftPodcast,
  setModalInfo,
} from '../../../../../store/slice/podcastSlice';
import axios from 'axios';
import envVar from '../../../../../config/envVar';

export default function EndLive({user, endPodcastForUser, navigation, id}) {
  const chatClient = ChatClient.getInstance();
  const dispatch = useDispatch();
  const {hostId, hostLeftPodcast, modalInfo} = useSelector(
    (state: any) => state.podcast,
  );
  const endPodcast = () => {
    try {
      let payload = {
        modal: false,
        isHost: modalInfo.host,
      };
      dispatch(setModalInfo(payload));
      dispatch(setHostLeftPodcast(false));
      if (modalInfo.isHost) {
        apiCall();
        return;
      }
      navigation.navigate('HomeB');
    } catch (error) {
      console.log(error);
    }
  };
  const apiCall = async () => {
    try {
      const url = envVar.LOCAL_URL + 'podcast/end' + id;
      const res = await axios.get(url);
      console.log(res.data);
      endPodcastForUser();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelLeave = () => {
    let payload = {
      modal: false,
      isHost: modalInfo.host,
    };
    dispatch(setModalInfo(payload));
  };

  return (
    <View>
      <Modal
        visible={modalInfo.modal}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelLeave}>
        {/* Backdrop */}
        <View style={styles.backdrop}>
          {/* Modal Content */}
          <View style={styles.modalView}>
            <Text style={[appStyles.title1, {color: colors.complimentary}]}>
              Podcast End
            </Text>
            <View style={{marginVertical: 20}}>
              <Text style={[appStyles.regularTxtMd, {color: colors.body_text}]}>
                {hostLeftPodcast
                  ? 'Host Has Left PodCast'
                  : modalInfo.isHost
                  ? 'Are you sure to end this podcast Host'
                  : 'Are you sure to left this Podcast.'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={endPodcast}
              style={[styles.deleteButton]}>
              <Text style={styles.deleteText}>
                {hostLeftPodcast ? 'Ok' : 'Confirm'}
              </Text>
            </TouchableOpacity>
            {!hostLeftPodcast && (
              <TouchableOpacity
                onPress={cancelLeave}
                style={styles.cancelButton}>
                <Text style={[appStyles.paragraph1, {color: colors.unknown2}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
