import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../../styles/styles';

export default function BlockedUsers({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left-thin" size={25} color={colors.complimentary} />
        </TouchableOpacity>
        <Text
          style={[
            appStyles.headline,
            {color: colors.complimentary, marginLeft: 10},
          ]}>
          Blocked List
        </Text>
      </View>
      <View>
        <View style={{marginTop: 30}}>
          <View style={styles.userSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}
              style={styles.profile}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={require('../../../../../assets/images/live/girl1.jpg')}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.userText}>Ava Marie</Text>
                <Text style={styles.userDesc}>ID: 234</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.btnText}>Unblock</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}
              style={styles.profile}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={require('../../../../../assets/images/live/girl2.jpg')}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.userText}>Ava Marie</Text>
                <Text style={styles.userDesc}>ID: 235</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.btnText}>Unblock</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}
              style={styles.profile}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={require('../../../../../assets/images/live/girl3.jpg')}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.userText}>Ava Marie</Text>
                <Text style={styles.userDesc}>ID: 236</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.btnText}>Unblock</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}
              style={styles.profile}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={require('../../../../../assets/images/live/girl6.jpg')}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.userText}>Ava Marie</Text>
                <Text style={styles.userDesc}>ID: 237</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.btnText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark_gradient,
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
  profile: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  userText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  tabText: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
    marginLeft: 10,
  },
  userSection: {
    marginTop: 20,
    borderBottomColor: 'grey',
    // paddingHorizontal:100,
    borderBottomWidth: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  userDesc: {
    color: '#fff',
    marginTop: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  followBtn: {
    marginRight: 10,
    backgroundColor: '#494759',
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
