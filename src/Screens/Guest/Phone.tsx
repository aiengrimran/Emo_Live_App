import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React from 'react';

export default function Phone() {
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
                  Enter Phone number to verify OPP
                </Text>
                <Text style={styles.subText}>
                  Enter 6 digit verification code sent to your phone number
                </Text>
              </View>
            </View>
            <View>
              <TextInput style={styles.input} />
              <TextInput style={styles.input} />
              <TextInput style={styles.input} />
              <TextInput style={styles.input} />
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity style={styles.googleBtn}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: '500',
                    }}>
                    Next
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
    backgroundColor: '#EF0143',
    borderRadius: 30,
    width: '100%',
    height: 60,
    justifyContent: 'center',
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
  input: {
    height: 50,
    width: 50,
    borderColor: 'red',
    borderWidth: 1,
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
