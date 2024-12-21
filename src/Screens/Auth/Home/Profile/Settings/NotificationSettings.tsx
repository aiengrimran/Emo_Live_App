import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../../styles/styles';
export default function NotificationSettings({navigation}) {
  const [muteNotifications, setMuteNotifications] = useState(false);
  const [blockNotifications, setBlockNotifications] = useState(false);
  const updateNotification = () =>
    setMuteNotifications(previousState => !previousState);
  const updateBlockNotification = () =>
    setBlockNotifications(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left-thin" size={25} color={colors.complimentary} />
        </TouchableOpacity>
        <Text
          style={[
            appStyles.headline,
            {color: colors.complimentary, marginLeft: 10},
          ]}>
          Notification Settings
        </Text>
      </View>
      <View style={{marginTop: 40}}>
        <TouchableOpacity style={styles.tab}>
          <View style={styles.icon}>
            <Icon
              name={muteNotifications ? 'bell-off' : 'bell-ring'}
              size={25}
              color={colors.complimentary}
            />
            <Text style={styles.tabText}>Mute All Notifications</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={muteNotifications ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updateNotification}
            value={muteNotifications}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <View style={styles.icon}>
            <Icon
              name={blockNotifications ? 'bell-cancel' : 'bell'}
              size={25}
              color={colors.complimentary}
            />
            <Text style={styles.tabText}>Block All Notifications</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={blockNotifications ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updateBlockNotification}
            value={blockNotifications}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark_gradient,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '99%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.lines,
    paddingRight: 10,
    paddingBottom: 15,
    marginVertical: 10,
  },
  icon: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
  },
  tabText: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
    marginLeft: 10,
  },
});
