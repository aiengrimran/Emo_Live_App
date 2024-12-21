import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//   import appStyles from '../../../../../styles/styles';
import appStyles from '../../styles/styles';
import {colors} from '../../styles/colors';
//   import { colors } from '../../../../../styles/colors';
export default function ForgetPassword({navigation}) {
  const [tab, setTab] = useState(1);
  const [gender, setGender] = useState('female');
  const [emailSent, setEmailSent] = useState(false);

  const updateGender = (valTab: string) => {
    setGender(valTab);
  };
  const updateTab = (valTab: number) => {
    setTab(valTab);
  };

  const sendRequest = () => {
    try {
      alert('please wait ...');
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Platform.OS == 'ios' ? 50 : 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Icon name="arrow-left-thin" color="#fff" size={25} />
        </TouchableOpacity>
        <Text
          style={[
            appStyles.headline,
            {color: colors.complimentary, marginLeft: 10},
          ]}>
          {' '}
          Forget Password
        </Text>
      </View>

      <View style={{marginTop: 30}}>
        {!emailSent ? (
          <View>
            <Text
              style={{
                color: '#737380',
              }}>
              Enter Email Address
            </Text>
            <TextInput
              placeholder="jhon@gmail.com"
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                paddingBottom: 10,
                marginTop: 15,
                color: '#fff',
              }}
              placeholderTextColor="#737380"
            />
          </View>
        ) : (
          <>
            <View style={{marginVertical: 30}}>
              <Text
                style={{
                  color: '#737380',
                }}>
                Enter New Password
              </Text>
              <TextInput
                secureTextEntry={true}
                placeholder="*******"
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  marginTop: 10,
                  color: '#fff',
                }}
                placeholderTextColor="#737380"
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#737380',
                }}>
                Confirm New Password
              </Text>
              <TextInput
                secureTextEntry={true}
                placeholder="*******"
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  marginTop: 10,
                  color: '#fff',
                }}
                placeholderTextColor="#737380"
              />
            </View>
          </>
        )}
      </View>
      <TouchableOpacity style={[appStyles.bottomBtn]} onPress={sendRequest}>
        {/* <TouchableOpacity style={styles.btn} onPress={sendRequest}> */}
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 17}}>
          Send Email
        </Text>
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
  tab: {
    flexDirection: 'row',
    width: '50%',
    paddingBottom: 10,
    borderBottomColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    // width: '30%',
    // position: 'absolute',
    // top: 20,
    left: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
  },
  genderBtn: {
    borderColor: 'grey',
    // borderWidth: 1,
    justifyContent: 'center',
    padding: 15,
    // borderRadius: 10,
    width: '35%',
  },
  genderTxt: {
    color: '#fff',
    textAlign: 'center',
  },
  tabText: {
    color: '#868791',
    fontSize: 18,
    // padding: 10,
    fontWeight: '600',
  },
  image: {
    flex: 1,
    // display: 'flex',
    // justifyContent: 'space-around',
  },
  btn: {
    marginTop: 40,
    backgroundColor: '#ef0143',
    width: '90%',
    position: 'absolute',
    bottom: 20,
    padding: 15,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    width: '25%',
  },
  infoHeading: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 5,
  },
  infoText: {
    color: '#868791',
    fontSize: 17,
    fontWeight: '500',
  },
  text: {
    marginTop: 10,
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  userText: {
    marginTop: 10,
    // textAlign: 'center',
    color: '#666673',
    fontWeight: '500',
    fontSize: 16,
  },
});
