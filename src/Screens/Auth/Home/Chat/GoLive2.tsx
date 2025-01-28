import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from 'react-native';

import React, {useState, useContext} from 'react';
import {colors} from '../../../../styles/colors';
import appStyles from '../../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Room6On from '../../../../assets/svg/room6.svg';
import Room6 from '../../../../assets/svg/room6Off.svg';
import Room9 from '../../../../assets/svg/room9Off.svg';
import Room9On from '../../../../assets/svg/room9.svg';
import axiosInstance from '../../../../Api/axiosConfig';
import Context from '../../../../Context/Context';
import envVar from '../../../../config/envVar';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  setGuests,
  updateStreamListeners,
} from '../../../../store/slice/streamingSlice';

export default function GoLive2({navigation}) {
  const {guests} = useSelector((state: any) => state.streaming);
  const dispatch = useDispatch();
  const createChannelToken = async () => {
    try {
      const res = await axiosInstance.get('/agora/create-channel-token');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const {token} = tokenMemo;
  const [room, setRoom] = useState(null);
  const localToken = user.id == 1 ? envVar.IMRAN_TOKEN : envVar.ZALKIP_TOKEN;
  const [btnColor, setBtnColor] = useState(colors.body_text);

  const startLive = async () => {
    try {
      // setUser
      if (!guests) {
        Alert.alert('error', 'select seat');
        return;
      }
      // navigation.navigate('LiveStreaming');
      // return;
      const url = envVar.LOCAL_URL + 'stream/start';
      // const url = envVar + 'podcast/start';
      const data = {
        title: 'Start View',
        duration: 10,
        listeners: guests,
        type: 'PUBLIC',
      };
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      });
      // JSON.stringify('')
      if (res.status == 201) {
        setUser((user: any) => ({
          ...user,
          agora_rtc_token: res.data.user.agora_rtc_token,
        }));
        dispatch(setGuests(guests));
        dispatch(updateStreamListeners(guests));
      }
      // const res = await axiosInstance.post(url, JSON.stringify(data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '40%'}}>
          <Image
            style={[appStyles.userAvatar, {height: 40, width: 40}]}
            source={
              user.avatar
                ? {
                    uri: envVar.API_URL + 'display-avatar/' + user.id,
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                : require('../../../../assets/images/place.jpg')
            }
          />
          <Text
            style={[
              appStyles.headline2,
              {color: colors.complimentary, marginLeft: 10},
            ]}>
            {user.first_name + ' ' + user.last_name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeB')}
          style={styles.closeBtn}>
          <Icon name="close" color={colors.complimentary} size={25} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 40, width: '100%', overflow: 'scroll'}}>
        <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
          Add Tags
        </Text>
        <View style={styles.row}>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #InstaTravel
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Wanderlust
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Roam
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Roam
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Roam
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.room}>
        <TouchableOpacity onPress={() => dispatch(setGuests(1))}>
          <View
            style={[
              styles.singleRoom,
              {
                backgroundColor: guests == 1 ? colors.accent : colors.body_text,
              },
            ]}></View>
          <Text style={styles.seatTxt}>1 Seat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setGuests(4))}>
          <View
            style={{
              width: 33,
              height: 33,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      guests == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      guests == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 2,
              }}>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      guests == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      guests == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
            </View>
          </View>
          <Text style={styles.seatTxt}>4 Seat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setGuests(6))}>
          {guests == 6 ? (
            <Room6On width={32} height={32} />
          ) : (
            <Room6 width={32} height={32} />
          )}

          <Text style={styles.seatTxt}>6 Seat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setGuests(9))}>
          {guests == 9 ? (
            <Room9On width={32} height={32} />
          ) : (
            <Room9 width={32} height={32} />
          )}
          <Text style={styles.seatTxt}>9 Seat</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} onPress={startLive}>
        <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
          Go Live
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 40 : 5,
    justifyContent: 'space-between',
  },
  row: {
    marginTop: 30,
    // flex: 1 / 2,

    flexDirection: 'row',
    // width: '20%',
    justifyContent: 'space-around',
  },
  room: {
    width: '90%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: colors.lines,
  },
  closeBtn: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 40,
    backgroundColor: '#ef0143',
    width: '90%',
    position: 'absolute',
    bottom: 30,
    padding: 15,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatTxt: {marginTop: 10, ...appStyles.bodyMd, color: colors.unknown},
  singleRoom: {
    height: 32,
    width: 32,
  },
  room4: {
    height: 15,
    width: 15,
  },
});
