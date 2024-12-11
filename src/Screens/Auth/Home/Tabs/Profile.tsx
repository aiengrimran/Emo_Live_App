import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome6';

export default function Search({navigation}) {
  const LogoutUser = () => {
    try {
      alert('logout');
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('VIP')}
        style={styles.vipBtn}>
        <Icon name="crown" color="#f0df00" size={20} />
        <Text style={{color: '#f0df00'}}>Check VIP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile')}
        style={styles.editBtn}>
        <Icon name="account-edit" color="#fff" size={30} />
      </TouchableOpacity>
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 120, height: 120, borderRadius: 80}}
          source={require('../../../../assets/images/live/girl1.jpg')}
        />
        <Text style={styles.userText}>Emma Smith</Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            width: '60%',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.userDesc}>ID:388</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              style={{marginTop: 5}}
              name="google-maps"
              color="#fff"
              size={20}
            />
            <Text style={[styles.userDesc, {marginLeft: 2}]}>Chicago, USA</Text>
          </View>
        </View>

        <View style={styles.accountInfo}>
          <View style={styles.gender}>
            <Icon name="gender-male" color="#fff" size={20} />
            <Text style={styles.genderTxt}>Female</Text>
          </View>
          <View style={styles.level}>
            <Text style={styles.levelTxt}>Lv:17</Text>
          </View>
          <View style={styles.gender}>
            <Icon name="security" color="#fff" size={20} />
            <Text style={styles.infoHeading}>Top-up Agent</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        {/* account */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View style={styles.info}>
              <Text style={styles.infoHeading}>23m</Text>
              <Text style={styles.infoText}>Fans</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeading}>154</Text>
              <Text style={styles.infoText}>Following</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeading}>42</Text>
              <Text style={styles.infoText}>Friends</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              // justifyContent: 'center',
              justifyContent: 'space-evenly',
              // justifyContent: 'space-between',
              // justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={styles.info}>
              <Text style={styles.infoHeading}>1435</Text>
              <Text style={styles.infoText}>Diamond</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeading}>247.4k</Text>
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
                  size={35}
                  color="#fff"
                />
              </View>
              <Text style={styles.actionTxr}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Agency')}
              style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon name="account-group" size={35} color="#fff" />
              </View>
              <Text style={styles.actionTxr}>Agencies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon name="weight-lifter" size={35} color="#fff" />
              </View>
              <Text style={styles.actionTxr}>Create Family</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconsRow}>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon name="wallet" size={35} color="#fff" />
              </View>
              <Text style={styles.actionTxr}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate('JoinAgency')}>
              <View style={styles.icon}>
                <IconF name="handshake-simple" size={35} color="#fff" />
              </View>
              <Text style={styles.actionTxr}>Join Agency</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon name="star" size={35} color="#fff" />
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
                  size={35}
                  color="#fff"
                />
              </View>
              <Text style={styles.actionTxr}>Ranking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon
                  name="book-open-page-variant-outline"
                  size={35}
                  color="#fff"
                />
              </View>
              <Text style={styles.actionTxr}>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon name="bag-checked" size={35} color="#fff" />
              </View>
              <Text style={styles.actionTxr}>Baggage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconsRow}>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon
                  name="message-processing-outline"
                  size={35}
                  color="#fff"
                />
              </View>
              <Text style={styles.actionTxr}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon
                  name="book-open-page-variant-outline"
                  size={35}
                  color="#fff"
                />
              </View>
              <Text style={styles.actionTxr}>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.icon}>
                <Icon name="logout" size={35} color="#fff" />
              </View>
              <Text style={styles.actionTxr}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  info: {
    width: '25%',
    // alignSelf: 'center',
  },
  levelTxt: {
    color: 'black',
    fontWeight: '600',
    fontSize: 17,
  },
  accountInfo: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  gender: {
    backgroundColor: 'grey',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 5,
  },
  genderTxt: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  iconBtn: {alignItems: 'center', width: '30%'},
  level: {
    backgroundColor: '#07fef8',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 5,
  },
  infoHeading: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
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
    color: '#868791',
    fontSize: 17,
    fontWeight: '500',
  },
  vipBtn: {
    flexDirection: 'row',
    width: '30%',
    position: 'absolute',
    top: 20,
    left: 10,
    alignItems: 'center',
    backgroundColor: '#494759',
    padding: 10,
    borderRadius: 16,
  },
  editBtn: {
    flexDirection: 'row',
    width: '20%',
    position: 'absolute',
    top: 10,
    right: -20,
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
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  userDesc: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  followBtn: {
    backgroundColor: '#ef0143',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  actionTxr: {
    marginTop: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
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
