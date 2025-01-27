import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import envVar from '../../../../config/envVar';

export default function Battle({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.PodcastUser}
          onPress={() => navigation.navigate('LiveBattle')}>
          <View
            style={{
              width: '100%',
              height: 140,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/male/male.jpeg')}
              />
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/live/girl3.jpg')}
              />
            </View>
            <TouchableOpacity style={styles.waveform}>
              <Icon name="waveform" color={colors.complimentary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userStats}>
              <Icon name="diamond" color={colors.complimentary} size={20} />
              <Text style={styles.userFollower}>10.51K</Text>
            </TouchableOpacity>
            <Text style={styles.userTxt}>
              khan 123
              {/* {item.user.first_name + ' ' + item.user.last_name} */}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.PodcastUser}
          onPress={() => navigation.navigate('LiveBattle')}>
          <View
            style={{
              width: '100%',
              height: 140,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/male/james.jpeg')}
              />
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/live/girl5.jpg')}
              />
            </View>
            <TouchableOpacity style={styles.waveform}>
              <Icon name="waveform" color={colors.complimentary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userStats}>
              <Icon name="diamond" color={colors.complimentary} size={20} />
              <Text style={styles.userFollower}>10.51K</Text>
            </TouchableOpacity>
            <Text style={styles.userTxt}>
              khan 123
              {/* {item.user.first_name + ' ' + item.user.last_name} */}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.PodcastUser}
          onPress={() => navigation.navigate('LiveBattle')}>
          <View
            style={{
              width: '100%',
              height: 140,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/live/girl6.jpg')}
              />
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/live/girl2.jpg')}
              />
            </View>
            <TouchableOpacity style={styles.waveform}>
              <Icon name="waveform" color={colors.complimentary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userStats}>
              <Icon name="diamond" color={colors.complimentary} size={20} />
              <Text style={styles.userFollower}>10.51K</Text>
            </TouchableOpacity>
            <Text style={styles.userTxt}>
              khan 123
              {/* {item.user.first_name + ' ' + item.user.last_name} */}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.PodcastUser}
          onPress={() => navigation.navigate('LiveBattle')}>
          <View
            style={{
              width: '100%',
              height: 140,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/live/girl7.jpg')}
              />
              <Image
                style={styles.userImage}
                source={require('../../../../assets/images/live/girl3.jpg')}
              />
            </View>
            <TouchableOpacity style={styles.waveform}>
              <Icon name="waveform" color={colors.complimentary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userStats}>
              <Icon name="diamond" color={colors.complimentary} size={20} />
              <Text style={styles.userFollower}>10.51K</Text>
            </TouchableOpacity>
            <Text style={styles.userTxt}>
              khan 123
              {/* {item.user.first_name + ' ' + item.user.last_name} */}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  PodcastUser: {
    position: 'relative',
    backgroundColor: 'red',
    marginHorizontal: '2.5%', // Add horizontal margin for spacing
    width: '45%',
    borderRadius: 5,
    marginVertical: 10,
  },
  userStats: {
    top: 10,
    position: 'absolute',
    flexDirection: 'row',
    right: 10,
    backgroundColor: colors.LG,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    borderRadius: 15,
  },
  userImage: {
    // position: 'relative',
    width: '50%',
    height: 140,
    borderWidth: 2,
    borderColor: '#fff',
    // height: '100%',
    borderRadius: 6,
  },
  userFollower: {
    color: colors.complimentary,
    marginLeft: 5,
    ...appStyles.bodyRg,
  },
  userTxt: {
    position: 'absolute',
    bottom: 10,
    marginLeft: 10,
    ...appStyles.regularTxtRg,
    color: colors.complimentary,
  },
  waveform: {
    top: 10,
    left: 5,
    position: 'absolute',
    backgroundColor: colors.LG,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 25,
  },
});
