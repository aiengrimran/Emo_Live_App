import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import appStyles from '../../../../../styles/styles';
import {colors} from '../../../../../styles/colors';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '../../../../../Api/axiosConfig';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Explore() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axiosInstance.get('/live-data');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[appStyles.headline2]}>Explore</Text>
          <Icon name="clock-time-four-outline" color={colors.lines} size={25} />
        </View>
        <View style={styles.live}>
          <Text style={[appStyles.smallTxt, {color: colors.lines}]}>
            No one is currently live streaming
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={[appStyles.headline2, {color: colors.dominant}]}>
            Recommended
          </Text>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.avatar}
                  source={require('../../../../../assets/images/male/male.jpeg')}
                />
                <View style={styles.accountInfo}>
                  <Text style={{color: colors.complimentary}}>TOP</Text>
                </View>
              </View>

              <View style={styles.description}>
                <View>
                  <Text style={styles.name}>Umair Khattak</Text>
                  <Text style={styles.region}>in Space</Text>
                  <Text style={styles.duration}>3h35m</Text>
                  <Text
                    style={[
                      appStyles.bodyRg,
                      {color: colors.body_text, marginTop: 5},
                    ]}>
                    <Icon name="speaker" size={15} color={colors.body_text} />
                    #chammer
                  </Text>
                </View>
                <TouchableOpacity style={styles.followBtn}>
                  <Icon name="plus" size={25} color={colors.complimentary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.avatar}
                  source={require('../../../../../assets/images/live/girl1.jpg')}
                />
                <View style={styles.accountInfo}>
                  <Text style={{color: colors.complimentary}}>TOP</Text>
                </View>
              </View>

              <View style={styles.description}>
                <View>
                  <Text style={styles.name}>MISS </Text>
                  <Text style={styles.region}>in Space</Text>
                  <Text style={styles.duration}>1h6m</Text>
                </View>
                <TouchableOpacity style={styles.followBtn}>
                  <Icon name="plus" size={25} color={colors.complimentary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.avatar}
                  source={require('../../../../../assets/images/live/girl2.jpg')}
                />
                <View style={styles.accountInfo}>
                  <Text style={{color: colors.complimentary}}>HOT</Text>
                </View>
              </View>

              <View style={styles.description}>
                <View>
                  <Text style={styles.name}>Zoya</Text>
                  <Text style={styles.region}>in Space</Text>
                  <Text style={styles.duration}>2h55m</Text>
                  <Text
                    style={[
                      appStyles.bodyRg,
                      {color: colors.body_text, marginTop: 5},
                    ]}>
                    <Icon name="speaker" size={15} color={colors.body_text} />
                    #chammer
                  </Text>
                </View>
                <TouchableOpacity style={styles.followBtn}>
                  <Icon name="plus" size={25} color={colors.complimentary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.avatar}
                  source={require('../../../../../assets/images/live/girl3.jpg')}
                />
                <View style={styles.accountInfo}>
                  <Text style={{color: colors.complimentary}}>HOT</Text>
                </View>
              </View>

              <View style={styles.description}>
                <View>
                  <Text style={styles.name}>HANU</Text>
                  <Text style={styles.region}>in Space</Text>
                  <Text style={styles.duration}>3h35m</Text>
                  <Text
                    style={[
                      appStyles.bodyRg,
                      {color: colors.body_text, marginTop: 5},
                    ]}>
                    <Icon name="speaker" size={15} color={colors.body_text} />
                    #chammer
                  </Text>
                </View>
                <TouchableOpacity style={styles.followBtn}>
                  <Icon name="plus" size={25} color={colors.complimentary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.avatar}
                  source={require('../../../../../assets/images/live/girl4.jpg')}
                />
                <View style={styles.accountInfo}>
                  <Text style={{color: colors.complimentary}}>HOT</Text>
                </View>
              </View>

              <View style={styles.description}>
                <View>
                  <Text style={styles.name}>HEART BEAT55..</Text>
                  <Text style={styles.region}>in Space</Text>
                  <Text style={styles.duration}>1h2m</Text>
                  <Text
                    style={[
                      appStyles.bodyRg,
                      {color: colors.body_text, marginTop: 5},
                    ]}>
                    <Icon name="speaker" size={15} color={colors.body_text} />
                    #CUTY
                  </Text>
                </View>
                <TouchableOpacity style={styles.followBtn}>
                  <Icon name="plus" size={25} color={colors.complimentary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.complimentary,
    position: 'absolute',
    // top:0
    width: '80%',
    zIndex: 2,
    right: 0,
    padding: 10,
    top: Platform.OS == 'ios' ? 55 : 20,
    bottom: 0,
  },
  avatar: {height: 100, width: 100, borderRadius: 4},
  followBtn: {
    height: 30,
    marginLeft: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 15,
  },
  name: {
    ...appStyles.regularTxtMd,
    color: colors.dominant,
  },
  description: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  live: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lines,
  },
  region: {
    ...appStyles.regularTxtMd,
    color: colors.body_text,
    marginVertical: 5,
  },
  duration: {
    ...appStyles.regularTxtMd,
    color: colors.body_text,
  },
  accountInfo: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 9,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
    height: 20,
  },
});
