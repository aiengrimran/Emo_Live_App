import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '../../../../Api/axiosConfig';
import {
  updateUsers,
  updateVisitProfile,
} from '../../../../store/slice/usersSlice';
import Context from '../../../../Context/Context';
import envVar from '../../../../config/envVar';

interface SearchScreenProps {
  navigation: any;
}
export default function Search({navigation}: SearchScreenProps) {
  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {token} = tokenMemo;
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.user.users);
  // const valetRating = useSelector((state: any) => state.valetReducer.rating);

  // const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [query, setQuery] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/chat/active-users');
      // console.log(res.data);
      dispatch(updateUsers(res.data.users));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const followUser = async (item: any) => {
    try {
      const url = item.is_followed
        ? '/user/un-follow-user/' + item.id
        : '/user/follow-user/' + item.id;
      setLoading(true);
      const res = await axiosInstance.get(url);
      setLoading(false);
      dispatch(updateUsers(res.data.users));
    } catch (error: any) {
      console.log(error);
      clearError();
      setError(error.message);
    }
  };

  const searchAccount = async () => {
    try {
      if (query.length < 4) return;
      setSearchLoader(true);
      const url = `/user/search-account/${query}`;
      const res = await axiosInstance.get(url);
      setSearchLoader(false);
      if (res.data.users.length < 1) {
        setError('No User Found');
        clearError();
        return;
      }
      setSearchUsers(res.data.users);
      // setupListeners
    } catch (error: any) {
      clearError();
      console.log(error);
    }
  };
  const clearError = () => {
    setLoading(false);
    setSearchLoader(false);
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Platform.OS == 'ios' ? 60 : 30,
        }}>
        <TextInput
          style={styles.input}
          placeholder="Enter User name...."
          autoCapitalize="none"
          onChangeText={setQuery}
          // onChangeText={text => searchAccount(text)}
          placeholderTextColor={colors.dark_gradient}
        />
        {searchLoader ? (
          <ActivityIndicator size={'small'} color={'blue'} />
        ) : (
          <TouchableOpacity onPress={getUsers} style={{marginLeft: 20}}>
            {/* <TouchableOpacity onPress={searchAccount} style={{marginLeft: 20}}> */}
            <Icon name="magnify" size={25} color={colors.complimentary} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[appStyles.errorText, {marginVertical: 10}]}>{error}</Text>
      )}
      {loading ? (
        <ActivityIndicator
          style={[appStyles.indicatorStyle]}
          size="large"
          color={colors.accent}
        />
      ) : (
        <View style={{marginTop: 40}}>
          <FlatList
            data={searchUsers.length ? searchUsers : users}
            keyExtractor={item => item.id?.toString()}
            renderItem={({item}: any) => (
              <View style={styles.userSection}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(updateVisitProfile(item));
                    navigation.navigate('UserProfile');
                  }}
                  style={styles.profile}>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 25}}
                    source={
                      item.avatar
                        ? {
                            uri: envVar.API_URL + 'display-avatar/' + item.id,
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        : require('../../../../assets/images/place.jpg')
                    }
                  />
                  <View style={{marginLeft: 20}}>
                    <Text style={styles.userText}>
                      {item.first_name + ' ' + item.last_name}
                    </Text>
                    <Text style={styles.userDesc}>ID: {item.id}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => followUser(item)}
                  style={[
                    styles.followBtn,
                    item.is_followed && {backgroundColor: '#494759'},
                  ]}>
                  <Text style={styles.btnText}>
                    {item.is_followed ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f31',
    padding: 10,
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
  input: {
    width: '85%',
    backgroundColor: '#585865',
    borderRadius: 40,
    color: '#fff',
    padding: 10,
  },

  userText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  userDesc: {
    color: '#fff',
    marginTop: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  followBtn: {
    backgroundColor: colors.accent,
    // paddingHorizontal: 10,
    height: 40,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 5,
    borderRadius: 6,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
