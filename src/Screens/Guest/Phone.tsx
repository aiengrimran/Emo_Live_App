import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Phone() {
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const sendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setShowInput(true);
      setLoading(true);
    }, 600);
  };
  const VerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setShowInput(false);
      setLoading(true);
    }, 600);
  };
  const submitAction = () => {
    if (showInput) {
      VerifyOtp();
      return;
    }
    sendCode();
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/images/girl.jpeg')}>
        <View
          style={{
            flex: 1,
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
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'red',
              }}>
              <View style={{width: 20}}>
                <Icon name="chevron-down" color="#fff" size={20} />
              </View>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  //   backgroundColor: 20,
                  borderColor: '#494759',
                  borderWidth: 1,
                  borderRadius: 3,
                  //   width: '20%',
                  width: 30,
                  height: 50,
                  //   padding: 40,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
              }}>
              <TextInput keyboardType="decimal-pad" style={styles.input} />
              <TextInput keyboardType="decimal-pad" style={styles.input} />
              <TextInput keyboardType="decimal-pad" style={styles.input} />
              <TextInput keyboardType="decimal-pad" style={styles.input} />
            </View>
            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 20, width: '40%'}}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 20,
                  color: '#ed0043',
                }}>
                Resend Code
              </Text>
            </TouchableOpacity>

            <View style={{marginTop: 30}}>
              <TouchableOpacity onPress={submitAction} style={styles.googleBtn}>
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
    marginTop: 20,
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
    borderColor: '#494759',
    borderWidth: 1,
    borderRadius: 3,
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
