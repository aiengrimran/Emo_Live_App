import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home({navigation}) {
  const [tab, setTab] = useState(1);

  const updateTab = (valTab: number) => {
    setTab(valTab);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View style={{width: '20%'}}></View>
        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.heading}>Meow Live</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name="bell-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <TouchableOpacity
          onPress={() => updateTab(1)}
          style={[styles.tab, tab == 1 && {backgroundColor: '#f00044'}]}>
          <Text style={[styles.tabText, tab == 1 && {color: '#fff'}]}>
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateTab(2)}
          style={[styles.tab, tab == 2 && {backgroundColor: '#f00044'}]}>
          <Text style={[styles.tabText, tab == 2 && {color: '#fff'}]}>
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateTab(3)}
          style={[styles.tab, tab == 3 && {backgroundColor: '#f00044'}]}>
          <Text style={[styles.tabText, tab == 3 && {color: '#fff'}]}>
            New Host
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateTab(4)}
          style={[styles.tab, tab == 4 && {backgroundColor: '#f00044'}]}>
          <Text style={[styles.tabText, tab == 4 && {color: '#fff'}]}>
            Battle
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => updateTab(4)}
          style={[styles.tab, tab == 4 && {backgroundColor: '#f00044'}]}>
          <Text style={[styles.tabText, tab == 4 && {color: '#fff'}]}>
            Games
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={{marginTop: 30}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <LiveScreen number={1}></LiveScreen>
          <LiveScreen number={2}></LiveScreen>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <LiveScreen number={3}></LiveScreen>
          <LiveScreen number={4}></LiveScreen>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <LiveScreen number={5}></LiveScreen>
          <LiveScreen number={6}></LiveScreen>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <LiveScreen number={7}></LiveScreen>
          <LiveScreen number={8}></LiveScreen>
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
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  tab: {
    // backgroundColor: '#f00044',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // color: '#fff',
    borderRadius: 30,
  },
  tabText: {
    color: '#868791',
    fontWeight: '500',
    fontSize: 16,
  },
});

interface LiveScreenProps {
  number: number;
}
const LiveScreen = ({number}: LiveScreenProps) => {
  const images = {
    1: require('../../../assets/images/live/girl1.jpg'),
    2: require('../../../assets/images/live/girl2.jpg'),
    3: require('../../../assets/images/live/girl3.jpg'),
    4: require('../../../assets/images/live/girl4.jpg'),
    5: require('../../../assets/images/live/girl5.jpg'),
    6: require('../../../assets/images/live/girl6.jpg'),
    7: require('../../../assets/images/live/girl7.jpg'),
    8: require('../../../assets/images/live/girl8.jpg'),
  };
  return (
    <View style={{position: 'relative'}}>
      <Text
        style={{
          color: '#fff',
        }}>{`../../../assets/images/live/girl${number}.jpeg`}</Text>
      <View
        style={{
          width: 160,
          height: 160,
        }}>
        <Image
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 6,
          }}
          source={images[number]} // Use the mapping here
          //   source={require('../../../assets/images/live/girl' + number + '.jpg')}
        />
        <TouchableOpacity
          style={{
            top: 10,
            position: 'absolute',
            backgroundColor: '#64534b',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            borderRadius: 25,
          }}>
          <Icon name="waveform" color="#fff" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            top: 10,
            position: 'absolute',
            flexDirection: 'row',
            right: 10,
            backgroundColor: '#64534b',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: 90,
            borderRadius: 15,
          }}>
          <Icon name="diamond" color="#fff" size={20} />
          <Text style={{color: '#fff', marginLeft: 5}}>10.51K</Text>
        </TouchableOpacity>
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            fontSize: 20,
            color: '#fff',
            fontWeight: '500',
          }}>
          Emily Jhonson
        </Text>
      </View>
    </View>
  );
};
