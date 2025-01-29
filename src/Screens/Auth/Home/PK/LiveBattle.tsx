import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
export default function LiveBattle({navigation}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: Platform.OS == 'ios' ? 60 : 10,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 3,
          padding: 4,
          backgroundColor: '#1C041C',
        }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F7C3CB',
          }}>
          <Image
            style={{height: 40, width: 40, borderRadius: 20}}
            source={require('../../../../assets/images/male/james.jpeg')}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 10}}>
            <Text style={{color: '#E7DADF'}}>Love. Lizzy L.</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Icon name="heart" color="#B1A6AB" size={12} />
              <Text style={{color: '#B1A6AB', marginLeft: 3}}>37.4k</Text>
            </View>
          </View>

          <View
            style={{
              marginLeft: 10,
              width: 60,
              borderRadius: 20,
              height: 40,
              backgroundColor: '#fff',
              alignItems: 'center',
            }}>
            <Icon name="heart-cog" color="#FFA84F" size={35} />
          </View>
          <View style={{flexDirection: 'row', marginLeft: 10}}>
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: '#FBFBD0',
              }}
              source={require('../../../../assets/images/live/girl3.jpg')}
            />
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: '#FBFBD0',
              }}
              source={require('../../../../assets/images/live/girl7.jpg')}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="human-male" color="#AB9EAC" size={20} />
            <Text style={{color: '#AB9EAC'}}>270</Text>
          </View>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.goBack()}>
            <Icon name="close" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* match info */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="axe-battle" size={12} color={'#FDC506'} />
          <Text style={styles.info}>LIVE Match</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="fire" size={12} color={'#FDC506'} />
          <Text style={styles.info}>Weekly Ranking</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="microsoft-internet-explorer"
            color={'#FF64DF'}
            size={12}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.info}>Explore</Text>
            <Icon name="chevron-right" size={12} color={colors.complimentary} />
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', borderRadius: 6}}>
        <View style={{backgroundColor: '#2c0619', width: '50%'}}>
          {/* < */}
          <View
            style={{
              borderBottomWidth: 1,
              flexDirection: 'row',
              paddingBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Image
              style={{height: 40, width: 40}}
              source={require('../../../../assets/images/live/gift-box.png')}
            />
            <View>
              <Text style={{color: '#BA9783', fontSize: 20}}>
                0<Text style={{color: '#fff'}}>/1</Text>
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '50%',
            backgroundColor: '#7F1D17',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            borderRadius: 8,
          }}>
          <Text style={styles.heading}>Live Trending is Here!</Text>
          <Image
            style={{height: 40, width: 40}}
            source={require('../../../../assets/images/live/angel.png')}
          />
          {/* emoji */}
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{backgroundColor: '#e93d53', width: '60%'}}>
          <Text style={styles.countLeft}>1221312</Text>
        </View>
        <View style={{backgroundColor: '#058CFF', width: '40%'}}>
          <Text style={[styles.count, {textAlign: 'right'}]}>1221312</Text>
        </View>
      </View>
      <View style={{position: 'relative'}}>
        {/* style={{backgroundColor: 'red', width: '99%', position: 'relative'}}> */}
        <View
          style={{
            backgroundColor: '#36332e',
            width: '40%',
            alignSelf: 'center',
            // top: ,
            padding: 2,
            alignItems: 'center',
            position: 'absolute',
            borderBottomEndRadius: 12,
            zIndex: 3,
            borderBottomStartRadius: 12,
          }}>
          <Text style={{color: colors.complimentary}}>
            V<Text style={{color: '#6E5ED4'}}>S</Text> 2:05
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%', height: 30}}>
            <Image
              style={{
                height: 300,
                width: '100%',
                resizeMode: 'stretch',
                // resizeMode: 'contain',
                margin: 'auto', // Center the image
              }}
              // style={{height: 300}}
              source={require('../../../../assets/images/male/james.jpeg')}
            />
            <View
              style={{
                position: 'absolute',
                left: 15,
                top: 15,
                paddingHorizontal: 15,
                paddingVertical: 3,
                backgroundColor: '#756B61',
                borderRadius: 10,
              }}>
              <Text style={[appStyles.regularTxtMd, {color: '#F8E4B6'}]}>
                WIN
                <Text style={[appStyles.bodyMd, {color: '#fff'}]}>x 1</Text>
              </Text>
            </View>
          </View>
          <View style={{width: '50%', position: 'relative'}}>
            <Image
              style={{
                height: 300,
                width: '100%',
                resizeMode: 'stretch',
                margin: 'auto', // Center the image
              }}
              // style={{height: 300}}
              source={require('../../../../assets/images/live/girl3.jpg')}
            />
            <View
              style={{
                position: 'absolute',
                right: 15,
                top: 15,
                paddingHorizontal: 15,
                paddingVertical: 3,
                backgroundColor: '#756B61',
                borderRadius: 10,
              }}>
              <Text style={[appStyles.regularTxtMd, {color: '#F8E4B6'}]}>
                WIN
                <Text style={[appStyles.bodyMd, {color: '#fff'}]}>x 10</Text>
              </Text>
            </View>
          </View>
        </View>
        {/* live support viewers */}
        <View
          style={{
            backgroundColor: '#251444',
            height: 60,
            width: '100%',
            // Shadow for iOS
            shadowColor: '#000', // Shadow color
            shadowOffset: {width: 0, height: 2}, // Shadow offset (x, y)
            shadowOpacity: 0.2, // Shadow opacity
            shadowRadius: 4, // Shadow blur radius

            // Shadow for Android
            elevation: 5, // Elevation for Android
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5,
              paddingTop: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.liveViewerLeft}
                source={require('../../../../assets/images/live/girl2.jpg')}
              />
              <Image
                source={require('../../../../assets/images/live/girl6.jpg')}
                style={styles.liveViewerLeft}
              />
              <Image
                source={require('../../../../assets/images/live/girl7.jpg')}
                style={styles.liveViewerLeft}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.liveViewerRight}
                source={require('../../../../assets/images/live/girl2.jpg')}
              />
              <Image
                source={require('../../../../assets/images/live/girl6.jpg')}
                style={styles.liveViewerRight}
              />
              <Image
                source={require('../../../../assets/images/live/girl7.jpg')}
                style={styles.liveViewerRight}
              />
            </View>
          </View>
        </View>

        {/* end */}

        {/* comment section */}
        <View style={{marginTop: 10, padding: 4}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.avatar}>
              <Icon
                name="heart-outline"
                size={15}
                color={colors.complimentary}
              />
            </View>
            <View style={styles.accountFirst}>
              <Icon name="diamond" size={12} color={colors.complimentary} />
              <Text style={{color: colors.complimentary}}>24</Text>
            </View>
            <View style={styles.accountSecond}>
              <Icon name="heart" size={12} color={'#FFAA5B'} />
              <Text style={{color: colors.complimentary}}>||</Text>
            </View>
            <Text style={styles.comments}>
              <Text style={styles.commentsName}>Erickson Villiola</Text> No
              roses
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View style={styles.avatar}>
              <Image
                style={{height: '100%', width: '100%', borderRadius: 20}}
                source={require('../../../../assets/images/live/girl3.jpg')}
              />
              {/* <Icon
                  name="heart-outline"
                  size={15}
                  color={colors.complimentary}
                /> */}
            </View>
            <View style={styles.accountFirst}>
              <Icon name="diamond" size={12} color={colors.complimentary} />
              <Text style={{color: colors.complimentary}}>24</Text>
            </View>
            <View style={styles.accountSecond}>
              <Icon name="heart" size={12} color={'#FFAA5B'} />
              <Text style={{color: colors.complimentary}}>||</Text>
            </View>
            <Text style={styles.comments}>
              <Text style={styles.commentsName}>shinzpu wp sasageuo</Text>{' '}
              reached
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.avatar}>
              <Icon
                name="heart-outline"
                size={12}
                color={colors.complimentary}
              />
            </View>
            <View style={styles.accountFirst}>
              <Icon name="diamond" size={12} color={colors.complimentary} />
              <Text style={{color: colors.complimentary}}>24</Text>
            </View>
            <View style={styles.accountSecond}>
              <Icon name="heart" size={12} color={'#FFAA5B'} />
              <Text style={{color: colors.complimentary}}>||</Text>
            </View>
            <Text style={{color: '#fff', marginLeft: 5}}>
              <Text style={styles.commentsName}>Mama Bear & CO.</Text> Like the
              LIVE
            </Text>
          </View>
        </View>
      </View>

      {/* battle input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          width: '92%',
          alignSelf: 'center',
          marginHorizontal: 10,
        }}>
        <TouchableOpacity style={{width: '15%', marginLeft: 5}}>
          <View style={styles.subIcon}>
            <Icon name="star" size={15} color="#fff" />
          </View>
          <Text style={styles.btnTxt}>Subsc...</Text>
        </TouchableOpacity>
        <TextInput
          placeholderTextColor="#B9B3C2"
          placeholder="Add com..."
          style={{
            backgroundColor: '#28203A',
            borderRadius: 20,
            width: '40%',
            padding: 10,
          }}
        />
        <TouchableOpacity style={{width: '12%'}}>
          <Icon name="poll" color={colors.complimentary} size={25} />
          <Text style={styles.btnTxt}>Poll</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '12%'}}>
          <Icon name="flower-outline" color="#F35058" size={25} />
          <Text style={styles.btnTxt}>Rose</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '12%'}}>
          <Icon name="gift" color="#F97CA1" size={25} />
          <Text style={styles.btnTxt}>Gift</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '12%'}}>
          <Icon name="share-outline" color={colors.complimentary} size={25} />
          <Text style={styles.btnTxt}>78</Text>
        </TouchableOpacity>
      </View>

      {/* end */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
    // padding: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  count: {
    ...appStyles.bodyMd,
    marginRight: 30,
    color: colors.complimentary,
  },
  heading: {
    ...appStyles.regularTxtMd,
    width: '60%',

    color: colors.complimentary,
  },
  countLeft: {
    marginLeft: 12,
    ...appStyles.bodyMd,
    color: colors.complimentary,
  },
  comments: {
    ...appStyles.bodyMd,
    color: colors.complimentary,
    marginLeft: 10,
  },
  commentsName: {
    color: '#8d819f',
  },
  info: {
    marginLeft: 5,
    color: colors.complimentary,
    ...appStyles.bodyMd,
  },
  avatar: {
    backgroundColor: '#564558',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountFirst: {
    marginLeft: 10,
    backgroundColor: '#4454CF',
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
  },
  liveViewerLeft: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#BEC8C5',
  },
  subIcon: {
    marginLeft: 8,
    backgroundColor: '#F9B04F',
    width: 20,
    height: 20,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  liveViewerRight: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#CDAB6C',
  },
  accountSecond: {
    backgroundColor: '#A64B36',
    marginLeft: 5,
    paddingHorizontal: 10,
    // textAlign: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    marginTop: 5,
    color: colors.complimentary,
    ...appStyles.bodyMd,
  },
});
