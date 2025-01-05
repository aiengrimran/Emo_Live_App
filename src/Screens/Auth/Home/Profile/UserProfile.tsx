import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import axiosInstance from '../../../../Api/axiosConfig';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateUsers,
  updateVisitProfile,
} from '../../../../store/slice/usersSlice';

export default function UserProfile({navigation}) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const visitProfile = useSelector(
    (state: any) => state.usersReducer.visitProfile,
  );

  const [loading, setLoading] = useState(false);
  const followUser = async () => {
    try {
      const url = visitProfile.is_followed
        ? '/user/un-follow-user/' + visitProfile.id
        : '/user/follow-user/' + visitProfile.id;
      setLoading(true);
      const res = await axiosInstance.get(url);
      dispatch(updateUsers(res.data.users));
      const user = res.data.users.find(
        (item: any) => item.id === visitProfile.id,
      );
      dispatch(updateVisitProfile(user));
      setLoading(false);
    } catch (error: any) {
      clearError();
      setError(error.message);
    }
  };

  const clearError = () => {
    setLoading(false);
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginLeft: 30,
          top: 60,
          position: 'absolute',
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" color="#fff" size={30} />
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 50 : 10,
        }}>
        <Image
          style={{width: 150, height: 150, borderRadius: 85}}
          source={
            visitProfile.avatar
              ? {uri: visitProfile.avatar}
              : require('../../../../assets/images/place.jpg')
          }
        />
        <Text style={styles.userText}>
          {visitProfile.first_name + ' ' + visitProfile.last_name}
        </Text>
        <Text style={styles.userDesc}>{visitProfile.bio}.</Text>
        {/* <Text style={styles.userDesc}>Dreamer, Explorer nature Lover.</Text> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            alignItems: 'center',
            width: '90%',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>1435</Text>
            <Text style={styles.infoText}>Diamond</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>247k</Text>
            <Text style={styles.infoText}>Beans</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>1.7</Text>
            <Text style={styles.infoText}>Fans</Text>
          </View>
        </View>
      </View>
      {error && (
        <Text style={[appStyles.errorText, {marginVertical: 10}]}>{error}</Text>
      )}
      {loading ? (
        <ActivityIndicator
          style={[appStyles.indicatorStyle, {marginTop: 100}]}
          size={'large'}
          color={colors.accent}
        />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={followUser}
              style={[
                styles.followBtn,
                visitProfile.is_followed && {backgroundColor: '#494759'},
              ]}>
              <Text style={styles.userDesc}>
                {visitProfile.is_followed ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat')}
              style={styles.chatBtn}>
              <Text style={styles.userDesc}>Chat</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.collabBtn}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                alignItems: 'center',
              }}>
              <Icon name="account-group" color="#fff" size={30} />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Collaborates
              </Text>
            </View>
            <Icon name="chevron-right" color="#fff" size={30} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f31',
    padding: 10,
    // paddingTop: 0,
  },

  image: {
    flex: 1,
    // display: 'flex',
    // justifyContent: 'space-around',
  },
  userSection: {
    marginTop: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  profile: {
    flexDirection: 'row',
  },
  info: {
    width: '33%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  infoHeading: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
  infoText: {
    color: '#868791',
    fontSize: 17,
    fontWeight: '500',
  },

  userText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  userDesc: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  followBtn: {
    backgroundColor: '#ef0143',
    width: '45%',
    height: 50,
    alignItems: 'center',
    // paddingHorizontal: 40,
    justifyContent: 'center',
    borderRadius: 9,
  },
  chatBtn: {
    backgroundColor: '#211f34',
    // paddingHorizontal: 20,
    height: 50,
    borderColor: '#494759',
    borderWidth: 1,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  collabBtn: {
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
    width: '99%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#494759',
    // justifyContent: 'flex-start',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
