import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '../../../../Api/axiosConfig';
import {colors} from '../../../../styles/colors';
import axios from 'axios';
import {setPodcast} from '../../../../store/slice/podcastSlice';
import envVar from '../../../../config/envVar';
import appStyles from '../../../../styles/styles';
import {useDispatch} from 'react-redux';
const token = '';

export default function Popular({navigation}) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getPodcast = async () => {
    try {
      const url = envVar.LOCAL_URL + 'active-podcasts';
      console.log(url);
      const res = await axios.get(url);
      if (res.data.podcasts.length) {
        setData(res.data.podcasts);
      }
      // dispatch(setPodcast(res.data))
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinPodcast = (item: any) => {
    dispatch(setPodcast(item));
    navigation.navigate('GoLive');
    console.log(item);
  };

  return (
    <View>
      <View style={{marginTop: 20}}>
        <Text
          onPress={getPodcast}
          style={{marginVertical: 20, color: colors.complimentary}}>
          GetPodcast
        </Text>

        <View
          style={{flexDirection: 'row', justifyContent: 'space-around'}}></View>
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id?.toString()}
          numColumns={2}
          renderItem={({item}: any) => (
            <TouchableOpacity
              style={styles.PodcastUser}
              onPress={() => joinPodcast(item)}>
              <View
                style={{
                  width: '100%',
                  height: 180,
                }}>
                <Image
                  style={styles.userImage}
                  source={
                    item.user.avatar
                      ? {
                          uri: envVar.API_URL + 'display-avatar/' + item.id,
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      : require('../../../../assets/images/parts/placeBlack.png')
                  }
                />
                <TouchableOpacity style={styles.waveform}>
                  <Icon
                    name="waveform"
                    color={colors.complimentary}
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.userStats}>
                  <Icon name="diamond" color={colors.complimentary} size={20} />
                  <Text style={styles.userFollower}>10.51K</Text>
                </TouchableOpacity>
                <Text style={styles.userTxt}>
                  {item.user.first_name + ' ' + item.user.last_name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waveform: {
    top: 10,
    left: 5,
    position: 'absolute',
    backgroundColor: colors.LG,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 25,
  },
  PodcastUser: {
    position: 'relative',
    backgroundColor: 'red',
    marginHorizontal: '2.5%', // Add horizontal margin for spacing
    width: '45%',
    borderRadius: 5,
    marginVertical: 10,
  },
  userStats: {
    top: 10,
    position: 'absolute',
    flexDirection: 'row',
    right: 10,
    backgroundColor: colors.LG,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    borderRadius: 15,
  },
  userTxt: {
    position: 'absolute',
    bottom: 10,
    marginLeft: 10,
    ...appStyles.regularTxtRg,
    color: colors.complimentary,
  },
  userFollower: {
    color: colors.complimentary,
    marginLeft: 5,
    ...appStyles.bodyRg,
  },
  userImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
});
