import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles/colors';
export default function ConnectionError() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: '600', marginVertical: 20}}>
        Disconnected
      </Text>
      <Icon name="access-point-off" size={90} color={colors.body_text} />
      <Text style={{color: colors.accent, fontSize: 18, marginVertical: 20}}>
        Please check internet Connection .!!
      </Text>
    </View>
  );
}
