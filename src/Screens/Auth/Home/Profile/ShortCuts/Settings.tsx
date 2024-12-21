import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import appStyles from '../../../../../styles/styles';
import {colors} from '../../../../../styles/colors';
import React,{useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../../../../Context/Context';

export default function Settings({navigation}) {
  const {userAuthInfo} = useContext(Context);
  console.log(userAuthInfo)


  const logout = async () => {
    try {
      // const keys = await AsyncStorage.getAllKeys();
      // await AsyncStorage.multiRemove(keys);
      // await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('loggedUser');
      userAuthInfo.setToken(null);
      console.log('All keys removed from AsyncStorage');
    } catch (error) {
      console.error('Error removing keys from AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={[appStyles.backBtn]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left-thin" size={25} color={colors.complimentary} />
        </TouchableOpacity>
        <Text
          style={[
            appStyles.headline,
            {color: colors.complimentary, marginLeft: 10},
          ]}>
          Settings
        </Text>
      </View>
      <ScrollView>
        <View style={{marginTop: 20}}>
          <TouchableOpacity style={styles.tab}>
            <View style={styles.icon}>
              <Icon name="history" size={25} color={colors.complimentary} />
              <Text style={styles.tabText}>Payout History</Text>
            </View>

            <Icon name="chevron-right" size={25} color={colors.lines} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('NotificationSettings')}>
            <View style={styles.icon}>
              <Icon name="bell-ring" size={25} color={colors.complimentary} />
              <Text style={styles.tabText}>Notifications</Text>
            </View>

            <Icon name="chevron-right" size={25} color={colors.lines} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <View style={styles.icon}>
              <Icon name="history" size={25} color={colors.complimentary} />
              <Text style={styles.tabText}>Privacy Policy</Text>
            </View>

            <Icon name="chevron-right" size={25} color={colors.lines} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('BlockedUsers')}>
            <View style={styles.icon}>
              <Icon
                name="account-lock"
                size={25}
                color={colors.complimentary}
              />
              <Text style={styles.tabText}>Blocked List</Text>
            </View>

            <Icon name="chevron-right" size={25} color={colors.lines} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('UpdatePassword')}>
            <View style={styles.icon}>
              <Icon name="lock" size={25} color={colors.complimentary} />
              <Text style={styles.tabText}>Manage Password</Text>
            </View>

            <Icon name="chevron-right" size={25} color={colors.lines} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <View style={styles.icon}>
              <Icon
                name="link-variant"
                size={25}
                color={colors.complimentary}
              />
              <Text style={styles.tabText}>Link Account</Text>
            </View>

            <Icon name="chevron-right" size={25} color={colors.lines} />
          </TouchableOpacity>
          <View>
            <Text
              style={[
                appStyles.regularTxtMd,
                {color: colors.body_text, paddingLeft: 16},
              ]}>
              Others
            </Text>
            <TouchableOpacity style={[styles.tab, {marginTop: 30}]}>
              <View style={styles.icon}>
                <Icon
                  name="delete-restore"
                  size={25}
                  color={colors.complimentary}
                />
                <Text style={styles.tabText}>Clean Cache</Text>
              </View>

              <Icon name="chevron-right" size={25} color={colors.lines} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <View style={styles.icon}>
                <Icon name="account" size={25} color={colors.complimentary} />
                <Text style={styles.tabText}>Connected Account</Text>
              </View>

              <Icon name="shield-check" size={25} color={'#0DB561'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <View style={styles.icon}>
                <Icon
                  name="information-outline"
                  size={25}
                  color={colors.complimentary}
                />
                <Text style={styles.tabText}>About us</Text>
              </View>

              <Icon name="chevron-right" size={25} color={colors.lines} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={[appStyles.bottomBtn]} onPress={logout}>
        <Text style={[styles.tabText, {alignSelf: 'center'}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark_gradient,
    // padding: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '99%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.lines,
    paddingRight: 10,
    paddingBottom: 15,
    marginVertical: 10,
  },
  icon: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
  },
  tabText: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
    marginLeft: 10,
  },
  tabFloat: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: colors.alpha_dark,
    width: '80%',
    borderRadius: 24,
    padding: 10,
    alignSelf: 'center',
  },
});
