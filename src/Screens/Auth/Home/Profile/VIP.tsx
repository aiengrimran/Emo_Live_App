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
import IconF from 'react-native-vector-icons/FontAwesome6';
export default function VIP({navigation}) {
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
        <Icon name="arrow-left-thin" color="#fff" size={25} />
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: Platform.OS == 'ios' ? 60 : 10,
        }}>
        <Image
          style={{width: 120, height: 120, borderRadius: 80}}
          source={require('../../../../assets/images/live/girl1.jpg')}
        />
        <Text style={styles.userText}>Emma Smith</Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
            width: '60%',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.userDesc}>ID:388</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={[styles.tabBtn, tab == 1 && {borderBottomWidth: 1}]}
          onPress={() => updateTab(1)}>
          <Text style={[styles.tab, tab == 1 && {color: '#fff'}]}>
            Brilliant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab == 2 && {borderBottomWidth: 1}]}
          onPress={() => updateTab(2)}>
          <Text style={[styles.tab, tab == 2 && {color: '#fff'}]}>Crystal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab == 3 && {borderBottomWidth: 1}]}
          onPress={() => updateTab(3)}>
          <Text style={[styles.tab, tab == 3 && {color: '#fff'}]}>Diamond</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab == 4 && {borderBottomWidth: 1}]}
          onPress={() => updateTab(4)}>
          <Text style={[styles.tab, tab == 4 && {color: '#fff'}]}>Luxury</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => updateCard(1)}
          style={[styles.card, card == 1 && styles.activeCard]}>
          <Icon name="diamond" color="#fff" size={30} />
          <Text style={styles.cardCategory}>Basic</Text>
          <Text style={styles.cardPeriod}>1 Month</Text>
          <Text style={styles.cardPrice}>$2.99</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateCard(2)}
          style={[styles.card, card == 2 && styles.activeCard]}>
          <Icon name="diamond" color="#cede6a" size={30} />
          <Text style={styles.cardCategory}>Basic</Text>
          <Text style={styles.cardPeriod}>1 Month</Text>
          <Text style={styles.cardPrice}>$2.99</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateCard(3)}
          style={[styles.card, card == 3 && styles.activeCard]}>
          <Icon name="diamond" color="#a2d9ff" size={30} />
          <Text style={styles.cardCategory}>Basic</Text>
          <Text style={styles.cardPeriod}>1 Month</Text>
          <Text style={styles.cardPrice}>$2.99</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.vipText}>VIP license agreement </Text>
      <ScrollView style={{marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="message-processing-outline" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>Entrance Effect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="account-group" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>PrivFunc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="weight-lifter" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>Chat Bubbles</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            width: '95%',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="wallet" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>Profile Decor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <IconF name="handshake-simple" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>VIP Medal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="star" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>VIP SLing</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="message-processing-outline" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>VIP Diamond</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon
                name="book-open-page-variant-outline"
                size={35}
                color="#fff"
              />
            </View>
            <Text style={styles.actionTxr}>Profile Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="bag-checked" size={35} color="#fff" />
            </View>
            <Text style={styles.actionTxr}>Speed up Upgrading</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Coin')}>
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 17}}>
          Get VIP Pass
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
    fontWeight: '500',
    fontSize: 18,
    color: '#83848e',
  },
  image: {
    flex: 1,
    // display: 'flex',
    // justifyContent: 'space-around',
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
  cardCategory: {
    color: '#fff',
    marginVertical: 5,
    fontWeight: '500',
  },
  cardPeriod: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '400',
  },
  backBtn: {
    flexDirection: 'row',
    width: '30%',
    position: 'absolute',
    top: Platform.OS == 'ios' ? 60 : 20,
    left: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
  },
  cardPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    paddingTop: 10,
    width: 100,
    height: 150,
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
    bottom: Platform.OS == 'ios' ? 30 : 20,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCard: {
    borderColor: '#a30733',
    backgroundColor: '#291118',
  },
  profile: {
    flexDirection: 'row',
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
    // alignSelf: 'center',
  },
  gender: {
    backgroundColor: 'grey',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 5,
  },
  level: {
    backgroundColor: '#07fef8',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 5,
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
  icon: {
    borderWidth: 1,
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    borderColor: '#494759',
    // backgroundColor:
  },

  userText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  userDesc: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  followBtn: {
    backgroundColor: '#ef0143',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  actionTxr: {
    marginTop: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  chatBtn: {
    backgroundColor: '#211f34',
    height: 60,
    borderColor: '#494759',
    borderWidth: 1,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  collabBtn: {
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
    width: '99%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#494759',
    // justifyContent: 'flex-start',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
