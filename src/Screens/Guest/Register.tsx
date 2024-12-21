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
  import React, {useState, useContext} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  import Context from '../../Context/Context';
  import appStyles from '../../styles/styles';
  import {colors} from '../../styles/colors';
  
  export default function Register({navigation}) {
    const {userAuthInfo} = useContext(Context);
    const {token, setToken} = userAuthInfo;
    const [loading, setLoading] = useState(false);
  
    const LoginUser = async () => {
      try {
        await AsyncStorage.setItem('loggedUser', 'imran');
        setToken('imran');
      } catch (error) {
        console.log(error);
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
                    <Text style={[styles.subText, {textAlign: 'center',marginVertical:15}]}>
                      Experience the Live experience
                    </Text>
                  </View>
                </View>
                <View style={{width: '90%', justifyContent: 'center',paddingLeft:20}}>
                  <View>
                    <Text style={styles.label}>Fist Name:</Text>
                    <TextInput
                      style={{
                        marginTop:5,
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 12,
                        borderRadius: 4,
                      }}
                      keyboardType="email-address"
                      placeholder='jhon@gmail.com'
                      placeholderTextColor={colors.body_text}
                    />
                  </View>
                  <View>
                    <Text style={styles.label}>Last Name:</Text>
                    <TextInput
                      style={{
                        marginTop:5,
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 12,
                        borderRadius: 4,
                      }}
                      keyboardType="email-address"
                      placeholder='jhon@gmail.com'
                      placeholderTextColor={colors.body_text}
                    />
                  </View>
                  <View>
                    <Text style={styles.label}>Address:</Text>
                    <TextInput
                      style={{
                        marginTop:5,
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 12,
                        borderRadius: 4,
                      }}
                      keyboardType="email-address"
                      placeholder='jhon@gmail.com'
                      placeholderTextColor={colors.body_text}
                    />
                  </View>
                  <View>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                      style={{
                        marginTop:5,
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 12,
                        borderRadius: 4,
                      }}
                      keyboardType="email-address"
                      placeholder='jhon@gmail.com'
                      placeholderTextColor={colors.body_text}
                    />
                  </View>
  
              
                  <View style={{marginTop:10}}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                      style={{
                        marginTop:5,
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 12,
                        borderRadius: 4,
                      }}
                      secureTextEntry={true}
                      placeholder='**********'
                      placeholderTextColor={colors.body_text}
                    />
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={styles.label}>Confirm Password:</Text>
                    <TextInput
                      style={{
                        marginTop:5,
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 12,
                        borderRadius: 4,
                      }}
                      secureTextEntry={true}
                      placeholder='**********'
                      placeholderTextColor={colors.body_text}
                    />
                  </View>
                  <TouchableOpacity style={{padding:10,backgroundColor:colors.accent,marginTop:30,borderRadius:6}}>
                    <Text style={[appStyles.headline2, {color:colors.complimentary,textAlign:"center"}]}>Register</Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignSelf:"center",marginVertical:10,flexDirection:"row",alignItems:"center"}}>
                  <Text style={styles.subText}>Already have account?</Text>
                  <TouchableOpacity style={{marginLeft:2}} onPress={()=>navigation.navigate("Landing")}>
                    <Text style={[appStyles.headline2,{color:colors.accent}]}>Login</Text>
                  </TouchableOpacity>
                </View>
  
                <Text style={{color:colors.complimentary,textAlign:"center"}}>------------- OR ------------- </Text>
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
      marginTop:10
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
    faceBtn: {
      marginTop: 20,
      backgroundColor: '#4055c6',
      // borderRadius: 30,
      justifyContent: 'center',
      // alignItems: 'center',
      width: '30%',
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
  });
  