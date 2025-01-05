import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import React, {useRef, useContext, useCallback, useState} from 'react';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import Context from '../../../../Context/Context';

import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import axiosInstance from '../../../../Api/axiosConfig';

export default function TempUI({navigation}: any) {
  const {userAuthInfo} = useContext(Context);
  const {user} = userAuthInfo;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheet, setSheet] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<any>>([]);
  const [sheetType, setSheetType] = useState<string | null>('tools');

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index < 0) setSheet(false);
  }, []);

  // Function to handle open Bottom Sheet
  const handleOpenSheet = useCallback((type: string) => {
    setSheet(true);
    setSheetType(type);
    bottomSheetRef.current?.expand();
  }, []);
  const handleOpenSheet2 = useCallback(() => {
    setSheet(true);
    setSheetType('avatar');
    bottomSheetRef.current?.expand();
  }, []);

  // Function to handle close Bottom Sheet
  const handleCloseSheet = useCallback(() => {
    setSheet(true);
    bottomSheetRef.current?.close();
  }, []);

  const getActiveUsers = async () => {
    try {
      const res = await axiosInstance.get('/chat/active-users');
      console.log(res.data);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../../../assets/images/LiveBg.png')}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require('../../../../assets/images/live/girl1.jpg')}
              style={{width: 28, height: 28, borderRadius: 15}}
            />
            <Text
              style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
              {user.last_name}
            </Text>
            <View
              style={{backgroundColor: '#08FEF8', padding: 2, borderRadius: 1}}>
              <Text style={{color: 'black', fontSize: 6, fontWeight: '500'}}>
                LV:1
              </Text>
            </View>
            <TouchableOpacity
              onPress={getActiveUsers}
              style={{
                padding: 2,
                backgroundColor: '#F00044',
                borderRadius: 20,
              }}>
              <Icon name="plus" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '30%',
            }}>
            <TouchableOpacity>
              <IconM name="warning" size={25} color="#F0DF00" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="eye" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GoLive')}>
              <Icon name="close" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', width: 50, alignItems: 'center'}}>
            <Icon name="star-four-points" size={25} color="#F0DF00" />
            <Text
              style={[
                appStyles.regularTxtMd,
                {
                  marginLeft: 5,
                  color: colors.complimentary,
                },
              ]}>
              50.0k
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              // justifyContent: 'space-around',
            }}>
            <Image
              style={{height: 20, width: 20, borderRadius: 10}}
              source={require('../../../../assets/images/male/male.jpeg')}
            />
            <Image
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                marginHorizontal: 5,
              }}
              source={require('../../../../assets/images/live/girl2.jpg')}
            />
            <Image
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
              }}
              source={require('../../../../assets/images/live/girl3.jpg')}
            />
            <TouchableOpacity>
              <Text
                style={[
                  appStyles.regularTxtMd,
                  {
                    color: colors.complimentary,
                    marginLeft: 5,
                  },
                ]}>
                +25
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            // alignItems: 'center',
            // ju
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={handleOpenSheet2}>
            <Image
              source={require('../../../../assets/images/male/james.jpeg')}
              style={{width: 60, height: 60, borderRadius: 35}}
            />
            <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
              James
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.semantic,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 30,
              }}>
              <Icon name="star-four-points" size={20} color={colors.dominant} />
              <Text style={[appStyles.small, {color: colors.dominant}]}>
                12.5K
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenSheet2}>
            <Image
              source={require('../../../../assets/images/live/girl5.jpg')}
              style={{width: 60, height: 60, borderRadius: 35}}
            />
            <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
              Olivia An
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.semantic,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 30,
              }}>
              <Icon name="star-four-points" size={20} color={colors.dominant} />
              <Text style={[appStyles.small, {color: colors.dominant}]}>
                3754
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <Users handleOpenSheet2={handleOpenSheet2}></Users>
        </View>
        <View>
          <View style={{flexDirection: 'row', width: '80%'}}>
            <Text style={[appStyles.bodyMd, {color: colors.yellow}]}>
              EMo Live :{' '}
            </Text>
            <Text
              style={[
                appStyles.bodyRg,
                {color: colors.complimentary, textAlign: 'left'},
              ]}>
              {' '}
              Great to see you here. Please don’t use abusive language, enjoy
              the stream, Have fun😊
            </Text>
          </View>
        </View>

        <BottomSheet
          // index={-1}
          // index={1}
          index={-1}
          enablePanDownToClose={true}
          snapPoints={['60%']}
          ref={bottomSheetRef}
          handleStyle={{
            backgroundColor: colors.LG,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.complimentary,
          }}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            {sheetType == 'gifts' ? (
              <Gifts />
            ) : sheetType == 'avatar' ? (
              <AvatarSheet navigation={navigation} />
            ) : (
              <Tools />
            )}
          </BottomSheetView>
        </BottomSheet>
        {!sheet && <BottomInput handleOpenSheet={handleOpenSheet} />}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: Platform.OS == 'ios' ? 50 : 20,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    alignItems: 'center',
  },
  btn1: {
    position: 'absolute',
    flexDirection: 'row',
    width: '99%',
    // padding: 15,
    bottom: Platform.OS == 'ios' ? 40 : 15,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sofa: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#874975',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: '#11132c',
    borderWidth: 1,
    width: '50%',
    borderStartEndRadius: 48,
    borderRadius: 50,
    alignSelf: 'flex-start',
    borderStartStartRadius: 48,
  },
  action: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.LG,
    // padding: 16,
    // padding: 36,
    // alignItems: 'center',
  },
  sheetBtn: {
    paddingBottom: 10,
    // borderBottomColor: colors.complimentary,
    borderBottomWidth: 2,
    justifyContent: 'center',
    width: '40%',
  },
  sheetTab: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  giftTxt: {
    ...appStyles.smallTxt,
    color: colors.complimentary,
  },
  giftNum: {
    ...appStyles.bodyMd,
    color: colors.complimentary,
  },
  sheetBtnTxt: {
    ...appStyles.regularTxtMd,
    color: colors.body_text,
    textAlign: 'center',
  },
  toolBtn: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: colors.lines,
    borderRadius: 26,
    // backgroundColor: colors.tool_btn,
  },
});

const Users = ({handleOpenSheet2}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '99%',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 35,
              backgroundColor: '#fff',
            }}
          />
          {/* <Image

            source={require('../../../../assets/images/live/girl1.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          /> */}
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Vera An
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <Image
            source={require('../../../../assets/images/live/girl2.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Daniel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <Image
            source={require('../../../../assets/images/male/james.jpeg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            James
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <Image
            source={require('../../../../assets/images/live/girl8.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Vera An
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <Image
            source={require('../../../../assets/images/live/girl3.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Martin
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '99%',
          marginTop: 40,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <Image
            source={require('../../../../assets/images/live/girl1.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Vera An
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenSheet2}>
          {/* <Image
            source={require('../../../../assets/images/live/girl2.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          /> */}
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 35,
              backgroundColor: '#fff',
            }}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Vera An
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <Image
            source={require('../../../../assets/images/male/james.jpeg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Amelia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <Image
            source={require('../../../../assets/images/live/girl8.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          />
          <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
            Harper
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenSheet2}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 35,
              backgroundColor: '#874975',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../assets/images/icons/sofa.png')}
              style={{width: 25, height: 25, borderRadius: 25}}
            />
          </View>
          {/* <Image
            source={require('../../../../assets/images/live/girl3.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          /> */}
          <Text
            style={[
              appStyles.paragraph1,
              {color: colors.complimentary, textAlign: 'center'},
            ]}>
            10
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '99%',
          marginTop: 20,
          // justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={handleOpenSheet2}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 35,
              backgroundColor: '#874975',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../assets/images/icons/sofa.png')}
              style={{width: 25, height: 25, borderRadius: 25}}
            />
          </View>
          {/* <Image
            source={require('../../../../assets/images/live/girl3.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          /> */}
          <Text
            style={[
              appStyles.paragraph1,
              {color: colors.complimentary, textAlign: 'center'},
            ]}>
            11
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenSheet2}
          style={{
            marginLeft: 22,
          }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 35,
              backgroundColor: '#874975',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../assets/images/icons/sofa.png')}
              style={{width: 25, height: 25, borderRadius: 25}}
            />
          </View>
          {/* <Image
            source={require('../../../../assets/images/live/girl3.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          /> */}
          <Text
            style={[
              appStyles.paragraph1,
              {color: colors.complimentary, textAlign: 'center'},
            ]}>
            12
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenSheet2}
          style={{
            marginLeft: 20,
          }}>
          <View style={styles.sofa}>
            <Image
              source={require('../../../../assets/images/icons/sofa.png')}
              style={{width: 25, height: 25, borderRadius: 25}}
            />
          </View>
          {/* <Image
            source={require('../../../../assets/images/live/girl3.jpg')}
            style={{width: 60, height: 60, borderRadius: 35}}
          /> */}
          <Text
            style={[
              appStyles.paragraph1,
              {color: colors.complimentary, textAlign: 'center'},
            ]}>
            13
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
interface BottomInputProps {
  handleOpenSheet: any;
}

const BottomInput = ({handleOpenSheet}: BottomInputProps) => {
  return (
    <View style={styles.btn1}>
      <TextInput
        style={styles.inputBox}
        placeholder="Say hello ...."
        placeholderTextColor={'#fff'}
      />
      <View style={styles.action}>
        <TouchableOpacity>
          <Icon name="dots-horizontal" color={colors.complimentary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="microphone-off" color={colors.complimentary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenSheet('tools')}>
          <IconM name="emoji-emotions" color={colors.complimentary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenSheet('gifts')}>
          <Image
            source={require('../../../../assets/images/bag.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
      </View>

      {/* <Icon name="dots-horizontal" color={colors.complimentary} size={24} /> */}
      <Text style={{color: '#fff', fontWeight: '600', fontSize: 17}}></Text>
    </View>
  );
};

const Gifts = () => {
  const [tab, setTab] = useState(1);
  return (
    <View style={{width: '99%', flex: 1, position: 'relative'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '99%',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../../../assets/images/live/girl3.jpg')}
            style={{
              backgroundColor: colors.complimentary,
              height: 30,
              width: 30,
              borderRadius: 15,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
            All
          </Text>
          <Icon name="chevron-right" size={25} color={colors.complimentary} />
        </TouchableOpacity>
      </View>
      <View style={styles.sheetTab}>
        <TouchableOpacity
          onPress={() => setTab(1)}
          style={[
            styles.sheetBtn,
            tab == 1 && {borderBottomColor: colors.complimentary},
          ]}>
          <Text
            style={[
              styles.sheetBtnTxt,
              tab == 1 && {color: colors.complimentary},
            ]}>
            Gifts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(2)}
          style={[
            styles.sheetBtn,
            tab == 2 && {borderBottomColor: colors.complimentary},
            {marginLeft: 10},
          ]}>
          <Text
            style={[
              styles.sheetBtnTxt,
              tab == 2 && {color: colors.complimentary},
            ]}>
            Lucky Gifts
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.giftTxt}>Treasure</Text>
          <View>
            <Icon name="palm-tree" size={25} color={colors.accent} />
            <Text style={styles.giftNum}>500</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          backgroundColor: '#1D1F31',
          borderTopColor: '#494759',
          paddingVertical: 30,
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '99%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            width: '60%',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              width: '80%',
              backgroundColor: '#292b3c',
              color: colors.complimentary,
              padding: 10,
              borderRadius: 10,
            }}
            placeholder="122"
            value="1222"
          />
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: colors.primary_gradient,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Icon name="plus" size={25} color={colors.complimentary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 10,

            paddingVertical: 5,
            backgroundColor: '#494759',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface AvatarSheetProps {
  navigation: any;
}
const AvatarSheet = ({navigation}: AvatarSheetProps) => {
  return (
    <View style={{position: 'relative', paddingTop: 30}}>
      <TouchableOpacity
        style={{
          borderRadius: 25,
          paddingHorizontal: 10,
          borderColor: colors.body_text,
          borderWidth: 1,
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          top: 30,
          left: 30,
          paddingVertical: 5,
        }}>
        <IconM name="warning" size={25} color={colors.body_text} />
        <Text style={[appStyles.bodyMd, {color: colors.body_text}]}>
          Report
        </Text>
      </TouchableOpacity>
      <View style={{width: '99%', alignItems: 'center'}}>
        <Image
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: colors.lines,
          }}
          source={require('../../../../assets/images/live/girl3.jpg')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '60%',
            marginVertical: 30,
          }}>
          <Text style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
            ID:388
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="google-maps" size={25} color={colors.semantic} />
            <Text
              style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
              Chicago, USA
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '70%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={[appStyles.headline2, {color: colors.complimentary}]}>
              1.54k
            </Text>
            <Text
              style={[
                appStyles.bodyMd,
                {color: colors.body_text, marginTop: 5},
              ]}>
              Fans
            </Text>
          </View>
          <View>
            <Text style={[appStyles.headline2, {color: colors.complimentary}]}>
              19.4k
            </Text>
            <Text
              style={[
                appStyles.bodyMd,
                {color: colors.body_text, marginTop: 5},
              ]}>
              Sending
            </Text>
          </View>
          <View>
            <Text style={[appStyles.headline2, {color: colors.complimentary}]}>
              205.7k
            </Text>
            <Text
              style={[
                appStyles.bodyMd,
                {color: colors.body_text, marginTop: 5},
              ]}>
              Beans
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          width: '90%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '45%',
            backgroundColor: colors.accent,
            borderRadius: 25,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
            Follow
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '45%',
            borderRadius: 25,
            borderColor: colors.complimentary,
            borderWidth: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Chat')}>
          <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Tools = () => {
  return (
    <View
      style={
        {
          // paddingBottom: 30,
        }
      }>
      <Text
        style={[
          appStyles.headline,
          {
            color: colors.complimentary,
            textAlign: 'center',
            marginVertical: 20,
          },
        ]}>
        Tools
      </Text>
      <View style={{borderTopColor: '#fff', borderTopWidth: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon name="email" size={32} color={colors.complimentary} />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Inbox
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon
                name="share-variant"
                size={32}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Games
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon
                name="gamepad-variant"
                size={32}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Games 2
            </Text>
          </View>

          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon
                name="gamepad-variant"
                size={32}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Room Skin
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon
                name="google-classroom"
                size={32}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Room Skin
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon name="music-note" size={32} color={colors.complimentary} />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Music
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon name="volume-high" size={32} color={colors.complimentary} />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Speaker
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <Icon
                name="block-helper"
                size={32}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              BlockList
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <View>
            <TouchableOpacity style={styles.toolBtn}>
              <IconM
                name="warning-amber"
                size={32}
                color={colors.complimentary}
              />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Notice
            </Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.toolBtn, {marginLeft: 18}]}>
              <Icon name="send" size={32} color={colors.complimentary} />
            </TouchableOpacity>
            <Text
              style={[
                appStyles.regularTxtRg,
                {
                  color: colors.complimentary,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Rocket
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
