import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome6';
import Context from '../../../../Context/Context';
import {colors} from '../../../../styles/colors';
import {ChatClient} from 'react-native-agora-chat';
import appStyles from '../../../../styles/styles';
import scripts from '../../../../scripts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../../../../Api/axiosConfig';
import envVar from '../../../../config/envVar';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Search({navigation}) {
  const {userAuthInfo, tokenMemo, chatClientMemo} = useContext(Context);
  const {chatClientInstance} = chatClientMemo;
  const {user} = userAuthInfo;
  const chatClient = ChatClient.getInstance();
  const {token} = tokenMemo;
  const [error, setError] = useState(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const createAgoraChatToken = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/agora/user/create-token');
      console.log(res.data);
      let user = res.data.user;
      // setUser(user);
      // await AsyncStorage.setItem('user', JSON.stringify(user));
      scripts.clearError(setError, setLoading);
    } catch (error: any) {
      scripts.clearError(setError, setLoading);
      setError(error.message);
      console.log(error);
    }
  };
  const getUnreadMessages = async () => {
    try {
      const count = await chatClientInstance.chatManager.getUnreadCount();
      setUnreadMessageCount(count);
      console.log(count);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      const res = await axiosInstance.get('/logout');
      console.log(res.data);

      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      await AsyncStorage.removeItem('user');
      userAuthInfo.setUser(null);
      console.log('All keys removed from AsyncStorage');
    } catch (error) {
      console.log(error);
      console.error('Error removing keys from AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={appStyles.indicatorStyle}
          size="large"
          color={colors.complimentary}
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('VIP')}
            style={styles.vipBtn}>
            <Icon name="crown" color={colors.yellow} size={25} />
            <Text style={[appStyles.bodyMd, {color: colors.yellow}]}>
              Check VIP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.editBtn}>
            <Icon name="account-edit" color={colors.complimentary} size={25} />
          </TouchableOpacity>

          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: Platform.OS == 'ios' ? 50 : 10,
            }}>
            <Image
              style={appStyles.userAvatar}
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
            <Text style={styles.userText} onPress={getUnreadMessages}>
              {user.first_name + ' ' + user.last_name}{' '}
            </Text>
            <View style={styles.userInfo}>
              <Text style={styles.userDesc}>ID:{user.id}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={{marginTop: 5}}
                  name="google-maps"
                  color={colors.complimentary}
                  size={25}
                />

                <Text style={[styles.userDesc, {marginLeft: 2}]}>
                  {user.address ? user.address : 'Please Provide'}
                </Text>
              </View>
            </View>

            <View style={styles.accountInfo}>
              <View style={styles.gender}>
                <Icon
                  name={
                    ['male,female'].includes(user.gender)
                      ? 'gender-' + user.gender
                      : 'gender-male-female'
                  }
                  color={colors.complimentary}
                  size={20}
                />
                <Text style={styles.genderTxt}>{user.gender}</Text>
              </View>
              <View style={styles.level}>
                <Text style={styles.levelTxt}>Lv:17</Text>
              </View>
              <View
                style={[
                  styles.gender,
                  {
                    backgroundColor: colors.LG,
                    borderColor: colors.lines,
                    borderWidth: 1,
                    borderRadius: 25,
                  },
                ]}>
                {/* <Icon name="security" color="#fff" size={20} /> */}
                <Text style={styles.infoHeading}>Top-up Agent</Text>
              </View>
            </View>
          </View>
          <ScrollView>
            {/* account */}
            <View>
              <View style={styles.account}>
                <View style={styles.info}>
                  <Text style={styles.accountStatus}>23m</Text>
                  <Text style={styles.infoText}>Fans</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.accountStatus}>154</Text>
                  <Text style={styles.infoText}>Following</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.accountStatus}>42</Text>
                  <Text style={styles.infoText}>Friends</Text>
                </View>
              </View>
              <View style={styles.secondRow}>
                <View style={styles.info}>
                  <Text style={styles.accountStatus}>1435</Text>
                  <Text style={styles.infoText}>Diamond</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.accountStatus}>247.4k</Text>
                  <Text style={styles.infoText}>Beans</Text>
                </View>
              </View>
            </View>
            {/* info end */}

            <View style={{marginTop: 20}}>
              <View style={styles.actionBtn}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Inbox')}
                  style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="message-processing-outline"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Messages</Text>
                  {unreadMessageCount > 0 && (
                    <View style={styles.unreadMessages}>
                      <Text
                        style={[
                          appStyles.regularTxtMd,
                          {color: colors.complimentary},
                        ]}>
                        {unreadMessageCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Agency')}
                  style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="account-group"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Agencies</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="weight-lifter"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Create Family</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconsRow}>
                <TouchableOpacity style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="wallet"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => navigation.navigate('JoinAgency')}>
                  <View style={styles.icon}>
                    <IconF
                      name="handshake-simple"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Join Agency</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon name="star" size={33} color={colors.complimentary} />
                  </View>
                  <Text style={styles.actionTxr}>Level</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconsRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Ranking')}
                  style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="message-processing-outline"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Ranking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={createAgoraChatToken}>
                  <View style={styles.icon}>
                    <Icon
                      name="book-open-page-variant-outline"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Terms</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="bag-checked"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Baggage</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconsRow}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => navigation.navigate('Settings')}>
                  <View style={styles.icon}>
                    <Icon
                      name="message-processing-outline"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="book-open-page-variant-outline"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Terms</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={styles.iconBtn}>
                  <View style={styles.icon}>
                    <Icon
                      name="logout"
                      size={33}
                      color={colors.complimentary}
                    />
                  </View>
                  <Text style={styles.actionTxr}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
    padding: 10,
  },

  image: {
    flex: 1,
  },
  userSection: {
    marginTop: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  profile: {
    flexDirection: 'row',
  },
  secondRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  info: {
    width: '25%',
  },
  levelTxt: {
    color: colors.dominant,
    ...appStyles.bodyRg,
  },
  accountInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  unreadMessages: {
    position: 'absolute',
    right: 0,
    top: -10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.accent,
  },
  gender: {
    backgroundColor: 'grey',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  accountStatus: {
    ...appStyles.headline2,
    color: colors.complimentary,
  },
  genderTxt: {
    marginLeft: 3,
    marginTop: 2,
    ...appStyles.bodyRg,
    color: colors.complimentary,
    textTransform: 'capitalize',
  },
  account: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  userInfo: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
  },
  iconBtn: {alignItems: 'center', width: '30%'},
  level: {
    backgroundColor: colors.semantic,
    borderRadius: 25,
    width: 72,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  infoHeading: {
    color: colors.body_text,
    ...appStyles.bodyRg,
    marginLeft: 5,
  },
  actionBtn: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
  },
  iconsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '95%',
    justifyContent: 'space-between',
  },
  infoText: {
    ...appStyles.regularTxtRg,
    color: colors.body_text,
  },
  vipBtn: {
    flexDirection: 'row',
    width: 108,
    height: 32,
    // width: '30%',
    position: 'absolute',
    top: Platform.OS == 'ios' ? 80 : 20,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lines,
    borderRadius: 25,
  },
  editBtn: {
    flexDirection: 'row',
    width: '20%',
    position: 'absolute',
    top: Platform.OS == 'ios' ? 70 : 20,
    right: 0,
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
  },
  icon: {
    borderWidth: 1,
    width: 90,
    height: 90,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    borderColor: '#494759',
    // backgroundColor:
  },

  userText: {
    ...appStyles.headline,
    marginTop: 10,
    textAlign: 'center',
    color: colors.complimentary,
  },
  userDesc: {
    ...appStyles.regularTxtRg,
    textAlign: 'center',
    color: colors.complimentary,
    marginTop: 5,
  },
  followBtn: {
    backgroundColor: '#ef0143',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  actionTxr: {
    ...appStyles.regularTxtRg,
    marginTop: 5,
    color: colors.complimentary,
  },
  chatBtn: {
    backgroundColor: '#211f34',
    height: 60,
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
