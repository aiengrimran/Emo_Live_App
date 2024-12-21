import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../styles/colors';
import appStyles from '../../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Room6On from '../../../../assets/svgs/room6.svg';
import Room6 from '../../../../assets/svgs/room6Off.svg';
import Room9 from '../../../../assets/svgs/room9Off.svg';
import Room9On from '../../../../assets/svgs/room9.svg';

export default function GoLive2({navigation}) {
  const [room, setRoom] = useState(null);
  const [btnColor, setBtnColor] = useState(colors.body_text);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '40%'}}>
            <Image
              style={[appStyles.userAvatar, {height: 40, width: 40}]}
              source={require('../../../../assets/images/live/girl1.jpg')}
            />
            <Text
              style={[
                appStyles.headline2,
                {color: colors.complimentary, marginLeft: 10},
              ]}>
              Emma Maratha
            </Text>
          </View>
          <View
            style={{
              width: '10%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Icon name="close" color={colors.complimentary} size={25} />
          </View>
        </View>
      <View style={{marginTop: 40, width: '100%', overflow: 'scroll'}}>
        <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
          Add Tags
        </Text>
        <View style={styles.row}>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Explore
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #ExploreEverywhere
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Explore
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Explore
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #ExploreEverywhere
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Awaits
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #DiscoverMore
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #InstaTravel
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Wanderlust
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Roam
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Roam
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
              #Roam
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.room}>
        <TouchableOpacity onPress={() => setRoom(1)}>
          <View
            style={[
              styles.singleRoom,
              {
                backgroundColor: room == 1 ? colors.accent : colors.body_text,
              },
            ]}></View>
          <Text style={styles.seatTxt}>1 Seat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRoom(4)}>
          <View
            style={{
              width: 33,
              height: 33,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      room == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      room == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 2,
              }}>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      room == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
              <View
                style={[
                  styles.room4,
                  {
                    backgroundColor:
                      room == 4 ? colors.accent : colors.body_text,
                  },
                ]}></View>
            </View>
          </View>
          <Text style={styles.seatTxt}>4 Seat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRoom(6)}>
          {room == 6 ? (
            <Room6On width={32} height={32} />
          ) : (
            <Room6 width={32} height={32} />
          )}

          <Text style={styles.seatTxt}>6 Seat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRoom(9)}>
          {room == 9 ? (
            <Room9On width={32} height={32} />
          ) : (
            <Room9 width={32} height={32} />
          )}
          <Text style={styles.seatTxt}>9 Seat</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('GoLive')}>
        <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
          Go Live
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:Platform.OS == 'ios' ? 40: 5,
    justifyContent: 'space-between',
  },
  row: {
    marginTop: 30,
    // flex: 1 / 2,

    flexDirection: 'row',
    // width: '20%',
    justifyContent: 'space-around',
  },
  room: {
    width: '90%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: colors.lines,
  },
  btn: {
    marginTop: 40,
    backgroundColor: '#ef0143',
    width: '90%',
    position: 'absolute',
    bottom: 20,
    padding: 15,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatTxt: {marginTop: 10, ...appStyles.bodyMd, color: colors.unknown},
  singleRoom: {
    height: 32,
    width: 32,
  },
  room4: {
    height: 15,
    width: 15,
  },
});
