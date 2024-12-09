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

export default function Landing() {
  return (
    <View style={styles.container}>
      <ImageBackground
        //   blurRadius=
        style={styles.image}
        source={require('../../assets/images/girl.jpeg')}>
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
              //   borderT
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text style={styles.heading}>Meow Live</Text>
              <View>
                <Text style={styles.subText}>
                  Experience the Live experience
                </Text>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity style={styles.googleBtn}>
                <View
                  style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '98%',
                    marginLeft: '1%',
                    justifyContent: 'center',
                  }}>
                  <Icon name="google" size={30} color="#900" />
                  <Text
                    style={{
                      marginLeft: 10,
                      //   textAlign: 'center',
                      //   color: '#fff',
                      fontWeight: '500',
                    }}>
                    Google
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.faceBtn]}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: '500',
                    }}>
                    Login In With Facebook
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.phoneBtn]}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: '500',
                    }}>
                    Login In With Phone
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.agreeTxt}>
                By creating account or signing in, you agree to,
              </Text>
              <Text style={styles.privacyUrl}>
                our user agreement and privacy policy
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
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
  googleBtn: {
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    height: 60,
    // justifyContent: 'center',
  },
  faceBtn: {
    marginTop: 20,
    backgroundColor: '#4055c6',
    borderRadius: 30,
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    height: 60,
  },
  phoneBtn: {
    marginTop: 20,
    backgroundColor: '#1d1f31',
    borderRadius: 30,
    justifyContent: 'center',
    // alignItems: 'center',
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
