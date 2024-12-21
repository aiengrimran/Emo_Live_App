import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Games from './Navigations/Games';
import Popular from './Navigations/Popular';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import Battle from './Navigations/Battle';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

// import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import {colors} from '../../../styles/colors';
import appStyles from '../../../styles/styles';

export default function Home({navigation}) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [tab, setTab] = useState(1);
  const translateX = useSharedValue(0);

  const updateTab = (direction: string) => {
    console.log(direction);
    let newTab = tab;
    if (direction === 'right') {
      if (tab < 5) {
        newTab = tab + 1;
      } else {
        newTab = 1; // Wrap around to the first tab
      }
    } else {
      if (tab > 1) {
        newTab = tab - 1;
      } else {
        newTab = 5; // Wrap around to the last tab
      }
    }

    setTab(newTab);

    // Calculate scroll position dynamically
    const scrollToOffset = (newTab - 1) * 140; // Assuming 140px width per tab
    scrollViewRef.current?.scrollTo({x: scrollToOffset, animated: true});
  };
  // Gesture for swiping left
  const swipeGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value < -100) {
        runOnJS(updateTab)('right');
        // Trigger tab change on significant swipe
      }
      if (translateX.value > 100) {
        runOnJS(updateTab)('left');
        // Trigger tab change on significant swipe
      }
      // Reset swipe animation
      translateX.value = withTiming(0);
    });

  // Animated style for swiping
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  return (
    // <ReanimatedSwipeable>

    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          width: '99%',
          marginTop: Platform.OS == 'ios' ? 50 : 20,
        }}>
        <View style={{width: '40%'}} />
        <View
          style={{
            width: '60%',
            alignSelf: 'center',
            flexDirection: 'row',
            // justifyContent:"center",
            justifyContent: 'space-between',
          }}>
          <Text style={styles.heading}>Emo Live</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name="bell-outline" size={24} color={colors.complimentary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View> */}
      <View>
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 20,
          }}
          horizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setTab(1)}
              style={[styles.tab, tab == 1 && {backgroundColor: '#f00044'}]}>
              <Text style={[styles.tabText, tab == 1 && {color: '#fff'}]}>
                Popular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(2)}
              style={[styles.tab, tab == 2 && {backgroundColor: '#f00044'}]}>
              <Text style={[styles.tabText, tab == 2 && {color: '#fff'}]}>
                Live
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(3)}
              style={[styles.tab, tab == 3 && {backgroundColor: '#f00044'}]}>
              <Text style={[styles.tabText, tab == 3 && {color: '#fff'}]}>
                New Host
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(4)}
              style={[styles.tab, tab == 4 && {backgroundColor: '#f00044'}]}>
              <Text style={[styles.tabText, tab == 4 && {color: '#fff'}]}>
                Battle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(5)}
              style={[styles.tab, tab == 5 && {backgroundColor: '#f00044'}]}>
              <Text style={[styles.tabText, tab == 5 && {color: '#fff'}]}>
                Games
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </ScrollView>
      </View>

      <GestureDetector gesture={swipeGesture}>
        <Animated.View
          style={[animatedStyle, {flex: 1}]}>
          {tab == 1 ? (
            <ScrollView contentContainerStyle={{marginTop: 20}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <LiveScreen number={1}></LiveScreen>
                <LiveScreen number={2}></LiveScreen>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 20,
                }}>
                <LiveScreen number={3}></LiveScreen>
                <LiveScreen number={4}></LiveScreen>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <LiveScreen number={5}></LiveScreen>
                <LiveScreen number={6}></LiveScreen>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 20,
                }}>
                <LiveScreen number={7}></LiveScreen>
                <LiveScreen number={8}></LiveScreen>
              </View>
            </ScrollView>
          ) : tab == 4 ? (
            <Battle />
          ) : (
            <Games />
          )}
        </Animated.View>
      </GestureDetector>
    </View>

    // </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f31',
    padding: 10,
  },
  heading: {
    ...appStyles.headline,
    color: colors.complimentary,
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
