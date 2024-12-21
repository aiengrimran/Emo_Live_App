import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../Context/Context';
import appStyles from '../../styles/styles';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {colors} from '../../styles/colors';

export default function Landing({navigation}) {
  const {userAuthInfo} = useContext(Context);
  const {token, setToken} = userAuthInfo;
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const loginUser = async () => {
    try {
      await AsyncStorage.setItem('loggedUser', 'imran');
      setToken('imran');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId:
        '602860045229-m8m7r8u7pasqll3qh414um0lfe4u02bb.apps.googleusercontent.com', // Replace with your Web client ID from Google Console
      offlineAccess: true,
      iosClientId:
        '602860045229-6tbupkgrkiqlhui0mtdfcsklr9hbfkud.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      AsyncStorage.setItem('loggedUser', JSON.stringify(userInfo));
      console.log('User Info:', userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('google sign in cancelled by user');
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.error('Error:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        //   blurRadius=
        style={styles.image}
        source={require('../../assets/images/parts/landing.png')}>
        {loading ? (
          <ActivityIndicator size={'large'} color="red" />
        ) : (
          <View
            style={{
              flex: 1,
              // backgroundColor: 'rgba(255, 0, 0, 0.5)',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: '35%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}></View>
            <View
              style={{
                height: '65%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <View style={{width: '80%', alignSelf: 'center'}}>
                <Text style={styles.heading}>Emo Live</Text>
                <View>
                  <Text
                    style={[
                      styles.subText,
                      {textAlign: 'center', marginTop: 40},
                    ]}>
                    Experience the Live experience
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}>
                <View>
                  <Text style={styles.subText}>Email:</Text>
                  <TextInput
                    style={styles.emailInput}
                    keyboardType="email-address"
                    placeholder="jhon@gmail.com"
                    placeholderTextColor={colors.body_text}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text style={styles.subText}>Password:</Text>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={true}
                    placeholder="**********"
                    placeholderTextColor={colors.body_text}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setRememberMe(!rememberMe)}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name={
                        rememberMe
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      color={colors.complimentary}
                      size={25}
                    />
                    <Text style={{color: colors.complimentary, marginLeft: 5}}>
                      Remember Me
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={{color: colors.complimentary}}>
                      Forget Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.signInBtn} onPress={loginUser}>
                  <Text
                    style={[
                      appStyles.headline2,
                      {color: colors.complimentary, textAlign: 'center'},
                    ]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUp}>
                <Text style={styles.subText}>New user?</Text>
                <TouchableOpacity
                  style={{marginLeft: 2}}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={[appStyles.headline2, {color: colors.accent}]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={{color: colors.complimentary, textAlign: 'center'}}>
                ------------- OR -------------{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity style={styles.googleBtn} onPress={loginUser}>
                  <Icon
                    name="facebook"
                    size={25}
                    color={colors.complimentary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={signIn}
                  style={[
                    styles.googleBtn,
                    {
                      marginHorizontal: 10,
                    },
                  ]}>
                  <Icon name="google" size={25} color={colors.complimentary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.googleBtn}
                  onPress={() => navigation.navigate('Phone')}>
                  <Icon
                    name="cellphone"
                    size={25}
                    color={colors.complimentary}
                  />
                </TouchableOpacity>
              </View>

              <View style={{marginTop: Platform.OS == 'ios' ? 30 : 10}}>
                <Text style={styles.agreeTxt}>
                  By creating account or signing in, you agree to,
                </Text>
                <Text style={styles.privacyUrl}>
                  our user agreement and privacy policy
                </Text>
              </View>
            </View>
          </View>
        )}
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
  },
  heading: {
    ...appStyles.headline,
    color: colors.complimentary,
    textAlign: 'center',
  },
  subText: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
  },
  googleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailInput: {
    marginTop: 5,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
  },
  signInBtn: {
    padding: 10,
    backgroundColor: colors.accent,
    marginTop: 30,
    borderRadius: 6,
  },
  agreeTxt: {
    ...appStyles.regularTxtRg,
    color: colors.complimentary,
    textAlign: 'center',
  },
  privacyUrl: {
    ...appStyles.regularTxtRg,
    color: colors.semantic,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  passwordInput: {
    marginTop: 5,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
  },
  signUp: {
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
