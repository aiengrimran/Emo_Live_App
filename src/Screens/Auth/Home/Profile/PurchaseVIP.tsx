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
export default function PurchaseVIP({navigation}) {
  const [tab, setTab] = useState(1);
  const [card, setCard] = useState(2);

  const updateCard = (valTab: number) => {
    setCard(valTab);
  };
  const updateTab = (valTab: number) => {
    setTab(valTab);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <Icon name="arrow-left-thin" color="#fff" size={40} />
      </TouchableOpacity>
      <View style={{alignSelf: 'center', alignItems: 'center', marginTop: 40}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 100, height: 100, borderRadius: 80}}
            source={require('../../../../assets/images/easy.png')}
          />
          <Image
            style={{width: 100, height: 100, borderRadius: 80}}
            source={require('../../../../assets/images/vip.png')}
          />
        </View>
      </View>
      <View style={{marginTop: 40}}>
        <Text
          style={{
            color: '#737380',
          }}>
          Enter your Easypaisa Mobile Account Number
        </Text>
        <TextInput
          placeholder="e.g 034435434567"
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
          placeholderTextColor="#737380"
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Coin')}>
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 17}}>
          Pay Upto 150000
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
    position: 'absolute',
    top: 20,
    left: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
  },
  tabText: {
    color: '#868791',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    flex: 1,
    // display: 'flex',
    // justifyContent: 'space-around',
  },
  cardCategory: {
    color: '#fff',
    marginVertical: 5,
    fontWeight: '500',
  },
  cardPeriod: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '500',
  },
  cardPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    paddingTop: 10,
    width: '30%',
    height: 150,
    backgroundColor: '#302847',
    borderWidth: 1,
    borderColor: '#403f51',
    alignItems: 'center',
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#ef0143',
    width: '90%',
    padding: 15,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCard: {
    borderColor: '#a30733',
    backgroundColor: '#291118',
  },
  vipText: {
    color: '#868791',
    marginVertical: 10,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  tabBtn: {
    borderBottomColor: 'white',
    paddingBottom: 10,
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
  cardAmount: {
    backgroundColor: '#ed005c',
    borderRadius: 9,
    padding: 5,
    marginTop: -5,
  },
  userText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
});
