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
export default function Coin({navigation}) {
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
        style={{
          flexDirection: 'row',
          width: '30%',
          position: 'absolute',
          top: 20,
          left: 10,
          alignItems: 'center',
          padding: 10,
          borderRadius: 16,
        }}>
        <Icon name="arrow-left-thin" color="#fff" size={40} />
      </TouchableOpacity>
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 120, height: 120, borderRadius: 80}}
          source={require('../../../../assets/images/live/girl1.jpg')}
        />
        <Text style={styles.userText}>Emma Smith</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            // justifyContent: 'center',
            justifyContent: 'space-evenly',
            // justifyContent: 'space-between',
            // justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>1435</Text>
            <Text style={styles.infoText}>Diamond</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>247k</Text>
            <Text style={styles.infoText}>Beans</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
        }}>
        <TouchableOpacity>
          <Text style={styles.infoHeading}>Account Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={styles.infoHeading}>Payouts</Text>
          <Icon name="chevron-right" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
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
      {tab == 1 ? (
        <Diamond></Diamond>
      ) : (
        <Beans></Beans>

        //   <Beans></Beans>
      )}
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

const Diamond = () => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>900</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$1.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>2700</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$2.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>5400</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$9.99</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>9000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$14.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>18000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$29.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>45000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$34.99</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Beans = () => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>900</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$1.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>2700</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$2.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>5400</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$9.99</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>9000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$14.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>18000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$29.9</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>45000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$34.99</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
