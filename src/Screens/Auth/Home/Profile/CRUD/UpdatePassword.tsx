import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome6';
export default function JoinAgency({navigation}) {
  const [tab, setTab] = useState(1);
  const [gender, setGender] = useState('female');

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <Icon name="arrow-left-thin" color="#fff" size={40} />
      </TouchableOpacity>
      <View style={{marginTop: 30}}>
        <View>
          <Text
            style={{
              color: '#737380',
            }}>
            Enter old Password
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
      </View>
      <TouchableOpacity style={styles.btn} onPress={sendRequest}>
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 17}}>
          Update Password
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
    width: '30%',
    // position: 'absolute',
    top: 20,
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
