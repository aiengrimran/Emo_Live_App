import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';

import {colors} from '../../../../../styles/colors';
import appStyles from '../../../../../styles/styles';
import React from 'react';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

interface HeaderProps {
  user: any;
  onLive: boolean;
  navigation: any;
  token: string;
  envVar: any;
  leavePodcast: any;
  connected: boolean;
}
export default function Header({
  user,
  onLive,
  navigation,
  token,
  envVar,
  leavePodcast,
  connected,
}: HeaderProps) {
  const {loading} = useSelector((state: any) => state.podcast);
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={
            user.avatar
              ? {
                  uri: envVar.API_URL + 'display-avatar/' + user.id,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              : require('../../../../../assets/images/place.jpg')
          }
          style={{width: 28, height: 28, borderRadius: 15}}
        />
        <Text style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
          {user.last_name}
        </Text>
        <View style={{backgroundColor: '#08FEF8', padding: 2, borderRadius: 1}}>
          <Text style={{color: 'black', fontSize: 6, fontWeight: '500'}}>
            LV:1
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Icon name="plus" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
      <ActivityIndicator
        animating={loading}
        size={'small'}
        color={colors.accent}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '30%',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TempUI')}>
          <IconM name="warning" size={25} color={'red'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="eye"
            size={25}
            color={onLive ? '#F0DF00' : colors.accent}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={leavePodcast}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('HomeB')}> */}
          <Icon
            name="close"
            size={25}
            color={connected ? colors.complimentary : colors.accent}
          />
          {/* <Icon name="close" size={25} color="#fff" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS == 'ios' ? 40 : 0,
    flexDirection: 'row',
    width: '98%',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    alignItems: 'center',
  },
  addBtn: {
    padding: 2,
    backgroundColor: '#F00044',
    borderRadius: 20,
  },
});
