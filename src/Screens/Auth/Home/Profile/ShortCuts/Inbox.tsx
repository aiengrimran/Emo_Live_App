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

export default function Inbox({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <TextInput
          style={{
            width: '85%',
            backgroundColor: '#585865',
            borderRadius: 40,
            color: '#fff',
          }}
        />
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => alert('searching ...')}>
          <Icon name="magnify" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 40}}>
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
            <Text style={styles.btnText}>Follow</Text>
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
          <TouchableOpacity
            style={[styles.followBtn, {backgroundColor: '#494759'}]}>
            <Text style={styles.btnText}>Following</Text>
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
            <Text style={styles.btnText}>Follow</Text>
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
          <TouchableOpacity
            style={[styles.followBtn, {backgroundColor: '#494759'}]}>
            <Text style={styles.btnText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#ef0143',
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
