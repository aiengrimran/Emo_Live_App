import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Ranking({navigation}) {
  const [tab, setTab] = useState(1);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          // width: '30%',
          alignItems: 'center',
          padding: 10,
        }}>
        <Icon name="arrow-left-thin" color="#fff" size={40} />
        <Text style={styles.heading}>Global Ranking</Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => setTab(1)}
          style={[styles.tab, tab == 1 && {borderBottomWidth: 2}]}>
          <Text style={[styles.tabText, tab == 1 && {color: '#fff'}]}>
            Diamonds
          </Text>
          <Icon
            style={{marginLeft: 5}}
            name="diamond"
            color="#4ea2e6"
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(2)}
          style={[styles.tab, tab == 2 && {borderBottomWidth: 2}]}>
          <Text style={[styles.tabText, tab == 2 && {color: '#fff'}]}>
            Beans
          </Text>
          <Icon name="chevron-right" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        <View style={styles.userSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={styles.profile}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../../../assets/images/live/girl1.jpg')}
            />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Ava Marie</Text>
              <Text style={styles.userDesc}>ID: 234</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.followBtn}>
            <Icon
              style={{marginLeft: 5}}
              name="medal"
              color="#b97d54"
              size={25}
            />
          </View>
        </View>
        <View style={styles.userSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={styles.profile}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../../../assets/images/live/girl2.jpg')}
            />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Ava Marie</Text>
              <Text style={styles.userDesc}>ID: 235</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.followBtn}>
            <Icon
              style={{marginLeft: 5}}
              name="medal"
              color="#eac65d"
              size={25}
            />
          </View>
        </View>
        <View style={styles.userSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={styles.profile}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../../../assets/images/live/girl3.jpg')}
            />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Ava Marie</Text>
              <Text style={styles.userDesc}>ID: 236</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.followBtn}>
            <Icon
              style={{marginLeft: 5}}
              name="medal"
              color="#eac65d"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={styles.profile}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../../../assets/images/live/girl6.jpg')}
            />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userText}>Ava Marie</Text>
              <Text style={styles.userDesc}>ID: 237</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.followBtn}>
            {/* <Text style={styles.btnText}>Following</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f31',
    padding: 10,
  },

  image: {
    flex: 1,
    // display: 'flex',
    // justifyContent: 'space-around',
  },
  heading: {
    fontSize: 22,
    marginLeft: 20,
    fontWeight: '600',
    color: '#fff',
  },
  userSection: {
    marginTop: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  profile: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    width: '50%',
    paddingBottom: 10,
    borderBottomColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#868791',
    fontSize: 18,
    fontWeight: '600',
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
  followBtn: {
    height: 40,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 5,
    borderRadius: 6,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
