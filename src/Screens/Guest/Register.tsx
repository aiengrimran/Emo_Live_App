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
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../Context/Context';
import appStyles from '../../styles/styles';
import {colors} from '../../styles/colors';
import axiosInstance from '../../Api/axiosConfig';
// import {ScrollView} from 'react-native-gesture-handler';

export default function Register({navigation}) {
  const [error, setError] = useState<any>('');
  const {userAuthInfo} = useContext(Context);
  const {setToken, setUser} = userAuthInfo;
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    bio: '',
    address: '',
    email: '',
    password: '',
    dob: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post('/register', form);
      console.log(res.data);
      setLoading(false);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      await AsyncStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setToken(res.data.access_token);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      clearError();
    }
  };
  const clearError = () => {
    setLoading(false);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        //   blurRadius=
        style={styles.image}
        source={require('../../assets/images/parts/landing.png')}>
        {loading ? (
          <ActivityIndicator
            style={appStyles.indicatorStyle}
            size={'large'}
            color="blue"
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: '10%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}></View>
            <View
              style={{
                height: '90%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <View style={{width: '80%', alignSelf: 'center'}}>
                <Text style={styles.heading}>Emo Live</Text>
                <View>
                  <Text
                    style={[
                      styles.subText,
                      {textAlign: 'center', marginVertical: 15},
                    ]}>
                    Experience the Live experience
                  </Text>
                </View>
              </View>
              {error && (
                <Text style={[appStyles.errorText, {marginTop: 10}]}>
                  {error}
                </Text>
              )}

              <View style={{height: '70%'}}>
                <ScrollView>
                  <View
                    style={{
                      width: '90%',
                      justifyContent: 'center',
                      paddingLeft: 20,
                      // height: '10%',
                      // alignSelf: 'center',
                    }}>
                    <View>
                      <Text style={styles.label}>Fist Name:</Text>
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(e: any) =>
                          setForm({...form, first_name: e})
                        }
                        value={form.first_name}
                        placeholder="First Name"
                        placeholderTextColor={colors.body_text}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Last Name:</Text>
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(e: any) =>
                          setForm({...form, last_name: e})
                        }
                        value={form.last_name}
                        placeholder="Last Name"
                        placeholderTextColor={colors.body_text}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Address:</Text>
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(e: any) =>
                          setForm({...form, address: e})
                        }
                        autoCapitalize="none"
                        value={form.address}
                        keyboardType="default"
                        placeholder="City State "
                        placeholderTextColor={colors.body_text}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Bio:</Text>
                      <TextInput
                        style={styles.inputBox}
                        value={form.bio}
                        autoCapitalize="none"
                        keyboardType="default"
                        onChangeText={(e: any) => setForm({...form, bio: e})}
                        placeholder="bio ...."
                        placeholderTextColor={colors.body_text}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>DOB:</Text>
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(e: any) => setForm({...form, dob: e})}
                        placeholder="yyyy-mm-dd"
                        placeholderTextColor={colors.body_text}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Email:</Text>
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(e: any) => setForm({...form, email: e})}
                        value={form.email}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="jhon@gmail.com"
                        placeholderTextColor={colors.body_text}
                      />
                    </View>

                    <View style={{marginTop: 10}}>
                      <Text style={styles.label}>Password:</Text>
                      <TextInput
                        style={styles.inputBox}
                        secureTextEntry={true}
                        onChangeText={(e: any) =>
                          setForm({...form, password: e})
                        }
                        value={form.password}
                        placeholder="**********"
                        placeholderTextColor={colors.body_text}
                      />
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text style={styles.label}>Confirm Password:</Text>
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(e: any) =>
                          setForm({...form, password_confirmation: e})
                        }
                        value={form.password_confirmation}
                        secureTextEntry={true}
                        placeholder="**********"
                        placeholderTextColor={colors.body_text}
                      />
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text style={styles.label}>Gender:</Text>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          width: '99%',
                          paddingRight: 10,
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => setForm({...form, gender: 'female'})}
                          style={[
                            styles.genderBtn,
                            form.gender == 'female' && {
                              backgroundColor: '#64566e',
                            },
                            {
                              borderWidth: 1,
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius: 10,
                            },
                          ]}>
                          <Text style={styles.genderTxt}>Female</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setForm({...form, gender: 'male'})}
                          style={[
                            styles.genderBtn,
                            form.gender == 'male' && {
                              backgroundColor: '#64566e',
                            },

                            {borderTopWidth: 1, borderBottomWidth: 1},
                          ]}>
                          <Text style={styles.genderTxt}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setForm({...form, gender: 'other'})}
                          style={[
                            styles.genderBtn,
                            form.gender == 'other' && {
                              backgroundColor: '#64566e',
                            },
                            {
                              borderWidth: 1,
                              borderTopRightRadius: 10,
                              borderBottomEndRadius: 10,
                            },
                          ]}>
                          <Text style={styles.genderTxt}>Other</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={registerUser}
                      style={styles.submitBtn}>
                      <Text
                        style={[
                          appStyles.headline2,
                          {color: colors.complimentary, textAlign: 'center'},
                        ]}>
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>

              <View style={styles.loginBox}>
                <Text style={styles.subText}>Already have account?</Text>
                <TouchableOpacity
                  style={{marginLeft: 2}}
                  onPress={() => navigation.navigate('Landing')}>
                  <Text style={[appStyles.headline2, {color: colors.accent}]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={{color: colors.complimentary, textAlign: 'center'}}>
                ------------- OR -------------{' '}
              </Text>
              <View style={{marginTop: Platform.OS == 'ios' ? 30 : 15}}>
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
  label: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
    marginTop: 10,
  },
  googleBtn: {
    backgroundColor: '#fff',
    // borderRadius: 30,
    flexDirection: 'row',
    // alignItems: 'center',
    width: '30%',
    height: 60,
    // justifyContent: 'center',
  },
  inputBox: {
    marginTop: 5,
    borderColor: colors.complimentary,
    borderWidth: 1,
    color: colors.complimentary,
    padding: 12,
    borderRadius: 4,
  },
  loginBox: {
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderTxt: {
    color: '#fff',
    textAlign: 'center',
  },
  faceBtn: {
    marginTop: 20,
    backgroundColor: '#4055c6',
    justifyContent: 'center',
    width: '30%',
    height: 60,
  },
  genderBtn: {
    borderColor: 'grey',
    justifyContent: 'center',
    padding: 15,
    width: '35%',
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
  submitBtn: {
    padding: 10,
    backgroundColor: colors.accent,
    marginTop: 20,
    borderRadius: 6,
  },
});
