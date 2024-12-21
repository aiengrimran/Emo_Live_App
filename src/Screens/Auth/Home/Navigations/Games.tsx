import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import appStyles from '../../../../styles/styles';
import { colors } from '../../../../styles/colors';

export default function Games() {
  return (
    <View style={styles.container}>
      <Text style={[appStyles.headline,{color:colors.complimentary}]}>Games</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center"
  },
});