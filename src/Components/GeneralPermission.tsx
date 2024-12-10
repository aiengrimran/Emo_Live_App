import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

export default function Landing({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'rgba(255, 0, 0, 0.5)',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: '40%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}></View>
          <View
            style={{
              height: '60%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            }}>
            <View style={{width: '80%', alignSelf: 'center', marginTop: 50}}>
              <Text style={styles.heading}>Camera</Text>
              <View>
                <Text style={styles.subText}>
                  Allow Access to take pictures Live & videos
                </Text>
              </View>
            </View>

            <View style={{marginTop: 60}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={[styles.faceBtn]}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: '500',
                    }}>
                    Allow
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Phone')}
                style={[styles.phoneBtn]}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: '500',
                    }}>
                    Don't Allow
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // display: 'flex',
    // justifyContent: 'space-around',
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  subText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    marginTop: 40,
    textAlign: 'center',
  },
  faceBtn: {
    marginTop: 20,
    backgroundColor: '#ef0143',
    borderRadius: 30,
    justifyContent: 'center',
    width: '100%',
    height: 60,
  },
  phoneBtn: {
    marginTop: 20,
    backgroundColor: '#1D1F31',
    borderRadius: 30,
    justifyContent: 'center',
    width: '100%',
    height: 60,
  },
  agreeTxt: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  privacyUrl: {
    fontSize: 18,
    color: '#868791',
    textAlign: 'center',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
