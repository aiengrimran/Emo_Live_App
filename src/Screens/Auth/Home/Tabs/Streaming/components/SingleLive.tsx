import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {RtcSurfaceView} from 'react-native-agora';
import {colors} from '../../../../../../styles/colors';
const deviceHeight = Dimensions.get('window').height;

export default function SingleLive({user}) {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'green', flex: 1}}>
        {user ? <RtcSurfaceView canvas={{uid: user.id}} /> : <></>}
      </View>
      <View style={styles.guest}>
        <View style={styles.screen1}></View>
        <View style={styles.screen2}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // backgroundColor: colors.LG,
  },
  guest: {
    width: '40%',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 80,
  },
  screen2: {
    marginTop: 20,
    backgroundColor: 'black',
    height: deviceHeight * 0.2,
    borderColor: colors.yellow,
    borderWidth: 5,
    borderRadius: 5,
  },
  screen1: {
    backgroundColor: 'black',
    height: deviceHeight * 0.2,
    borderColor: colors.yellow,
    borderWidth: 5,
    borderRadius: 5,
  },
});
