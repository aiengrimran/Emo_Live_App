import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Notifications() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View style={{width: '20%'}}></View>
        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.heading}>Meow Live</Text>
          <TouchableOpacity onPress={() => alert('clearing....')}>
            <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 40}}>
        <View style={styles.userSection}>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={require('../../../assets/images/live/girl1.jpg')}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.userText}>Ava Marie</Text>
            <Text style={styles.userDesc}>is Perfuming Live</Text>
          </View>
        </View>
        <View style={styles.userSection}>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={require('../../../assets/images/live/girl2.jpg')}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.userText}>Ava Marie</Text>
            <Text style={styles.userDesc}>is Perfuming Live</Text>
          </View>
        </View>
        <View style={styles.userSection}>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={require('../../../assets/images/live/girl3.jpg')}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.userText}>Ava Marie</Text>
            <Text style={styles.userDesc}>is Perfuming Live</Text>
          </View>
        </View>
        <View style={styles.userSection}>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={require('../../../assets/images/live/girl6.jpg')}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.userText}>Ava Marie</Text>
            <Text style={styles.userDesc}>is Perfuming Live</Text>
          </View>
        </View>
      </View>
      {/* <Text>Notifications</Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f31',
    padding: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  userSection: {
    marginTop: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
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
});
