import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Search({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 150, height: 150, borderRadius: 85}}
          source={require('../../../../assets/images/live/girl1.jpg')}
        />
        <Text style={styles.userText}>Christian Martinez</Text>
        <Text style={styles.userDesc}>Dreamer, Explorer nature Lover.</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
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
            <Text style={styles.infoHeading}>247k</Text>
            <Text style={styles.infoText}>Beans</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>1.7</Text>
            <Text style={styles.infoText}>Fans</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile')}
          style={styles.followBtn}>
          <Text style={styles.userDesc}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile')}
          style={styles.chatBtn}>
          <Text style={styles.userDesc}>Chat</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.collabBtn}>
        <View
          style={{flexDirection: 'row', width: '50%', alignItems: 'center'}}>
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
