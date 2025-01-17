import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import React, {useRef, useContext, useCallback, useState} from 'react';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import Context from '../../../../Context/Context';
import {useSelector, useDispatch} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import axiosInstance from '../../../../Api/axiosConfig';
import {updateUsers} from '../../../../store/slice/usersSlice';
import envVar from '../../../../config/envVar';
import Users from './Podcast/Users';

export default function GoLive({navigation}: any) {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.usersReducer.users);

  const {userAuthInfo, tokenMemo} = useContext(Context);
  const {user} = userAuthInfo;
  const {token} = tokenMemo;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheet, setSheet] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  // const [users, setUsers] = useState<Array<any>>([]);
  const [sheetType, setSheetType] = useState<string | null>('');

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
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

  const getActiveUsers = async () => {
    try {
      const res = await axiosInstance.get('/chat/active-users');
      console.log(res.data);
      dispatch(updateUsers(res.data.users));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../../../assets/images/LiveBg.png')}>
        <Header
          user={user}
          getActiveUsers={getActiveUsers}
          navigation={navigation}
          token={token}
          envVar={envVar}
        />
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
        <View>{/* <Text>{JSON.stringify(users)}</Text> */}</View>
        <View>
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}: any) => (
              <View style={styles.usersList}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSelectedUser(item);
                    handleOpenSheet2();
                  }}>
                  <Image
                    source={
                      item.avatar
                        ? {
                            uri: envVar.API_URL + 'display-avatar/' + item.id,
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        : require('../../../../assets/images/place.jpg')
                    }
                    style={styles.chatAvatar}
                  />
                  <Text
                    style={[
                      appStyles.paragraph1,
                      {color: colors.complimentary},
                    ]}>
                    {item.first_name + ' ' + item.last_name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleOpenSheet('users');
            }}>
            <Image
              source={require('../../../../assets/images/male/james.jpeg')}
              style={{width: 60, height: 60, borderRadius: 35}}
            />
            <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
              James
            </Text>
            <View style={styles.points}>
              <Icon name="star-four-points" size={20} color={colors.dominant} />
              <Text style={[appStyles.small, {color: colors.dominant}]}>
                12.5K
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../../../assets/images/live/girl5.jpg')}
              style={{width: 60, height: 60, borderRadius: 35}}
            />
            <Text style={[appStyles.paragraph1, {color: colors.complimentary}]}>
              Olivia An
            </Text>
            <View style={styles.points}>
              <Icon name="star-four-points" size={20} color={colors.dominant} />
              <Text style={[appStyles.small, {color: colors.dominant}]}>
                3754
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <BottomSheet
          index={-1}
          enablePanDownToClose={true}
          // snapPoints={[sheetType == 'avatar' ? '45%' : '60%']}
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
              <AvatarSheet
                selectedUser={selectedUser}
                navigation={navigation}
                token={token}
                envVar={envVar}
                dispatch={dispatch}
              />
            ) : sheetType == 'users' ? (
              <Users />
            ) : (
              <Tools />
            )}
          </BottomSheetView>
        </BottomSheet>
        {!sheet && <BottomSection handleOpenSheet={handleOpenSheet} />}
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
  reportBtn: {
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
  },
  users: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-around',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    alignItems: 'center',
  },
  btn1: {
    position: 'relative',
    flexDirection: 'row',
    width: '99%',
    marginTop: 20,
    // padding: 15,
    // bottom: Platform.OS == 'ios' ? 40 : 15,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usersList: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-around',
  },
  chatAvatar: {width: 60, height: 60, borderRadius: 35},
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
  sheetAvatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.lines,
  },
  addBtn: {
    padding: 2,
    backgroundColor: '#F00044',
    borderRadius: 20,
  },
  sheetUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 20,
  },
  followBtn: {
    width: '45%',
    borderRadius: 25,
    padding: 20,
    borderColor: colors.complimentary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetStatus: {
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  points: {
    flexDirection: 'row',
    backgroundColor: colors.semantic,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
  },
  sheetAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
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
interface HeaderProps {
  user: any;
  getActiveUsers: any;
  navigation: any;
  token: string;
  envVar: any;
  // getActiveUsers
}

const Header = ({
  user,
  getActiveUsers,
  navigation,
  token,
  envVar,
}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={
            user.avatar
              ? {
                  uri: envVar.API_URL + 'display-avatar/' + user.id,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              : require('../../../../assets/images/place.jpg')
          }
          // source={require('../../../../assets/images/live/girl1.jpg')}
          style={{width: 28, height: 28, borderRadius: 15}}
        />
        <Text style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
          {user.last_name}
        </Text>
        <View style={{backgroundColor: '#08FEF8', padding: 2, borderRadius: 1}}>
          <Text style={{color: 'black', fontSize: 6, fontWeight: '500'}}>
            LV:1
          </Text>
        </View>
        <TouchableOpacity onPress={getActiveUsers} style={styles.addBtn}>
          <Icon name="plus" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '30%',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TempUI')}>
          <IconM name="warning" size={25} color="#F0DF00" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="eye" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('HomeB')}> */}
          <Icon name="close" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface BottomSectionProps {
  handleOpenSheet: any;
}

const BottomSection = ({handleOpenSheet}: BottomSectionProps) => {
  return (
    <View style={{position: 'absolute', bottom: '5%'}}>
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
          Great to see you here. Please don’t use abusive language, enjoy the
          stream, Have fun😊
        </Text>
      </View>
      <View style={styles.btn1}>
        <TextInput
          style={styles.inputBox}
          placeholder="Say hello ...."
          placeholderTextColor={'#fff'}
        />
        <View style={styles.action}>
          <TouchableOpacity>
            <Icon
              name="dots-horizontal"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="microphone-off"
              color={colors.complimentary}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenSheet('tools')}>
            <IconM
              name="emoji-emotions"
              color={colors.complimentary}
              size={24}
            />
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
  selectedUser: any;
  token: string;
  envVar: any;
  dispatch: any;
}
const AvatarSheet = ({
  navigation,
  selectedUser,
  token,
  envVar,
  dispatch,
}: AvatarSheetProps) => {
  useDispatch;
  const followUser = async (item: any) => {
    try {
      const url = item.is_followed
        ? '/user/un-follow-user/' + item.id
        : '/user/follow-user/' + item.id;
      // setLoading(true);
      const res = await axiosInstance.get(url);
      // setLoading(false);
      dispatch(updateUsers(res.data.users));
    } catch (error: any) {
      console.log(error);
      // clearError();
      // setError(error.message);
    }
  };
  return (
    <View style={{position: 'relative', paddingTop: 30}}>
      <TouchableOpacity style={styles.reportBtn}>
        <IconM name="warning" size={25} color={colors.body_text} />
        <Text style={[appStyles.bodyMd, {color: colors.body_text}]}>
          Report
        </Text>
      </TouchableOpacity>
      <View style={{width: '99%', alignItems: 'center'}}>
        <Image
          style={styles.sheetAvatar}
          source={
            selectedUser.avatar
              ? {
                  uri: envVar.API_URL + 'display-avatar/' + selectedUser.id,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              : require('../../../../assets/images/place.jpg')
          }
        />
        <Text
          style={[
            appStyles.paragraph1,
            {color: colors.complimentary, marginTop: 10},
          ]}>
          {selectedUser.first_name + ' ' + selectedUser.last_name}
        </Text>
        <View style={styles.sheetUser}>
          <Text style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
            ID:{selectedUser.id}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="google-maps" size={23} color={colors.semantic} />
            <Text
              style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
              {selectedUser.address ? selectedUser.address : 'Please Provide '}
            </Text>
          </View>
        </View>

        <View style={styles.sheetStatus}>
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
      <View style={styles.sheetAction}>
        <TouchableOpacity
          style={[styles.followBtn, {backgroundColor: colors.accent}]}>
          <Text style={[appStyles.bodyMd, {color: colors.complimentary}]}>
            Follow
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.followBtn, {borderWidth: 1}]}
          onPress={() =>
            navigation.navigate('Chat', {receiverUser: selectedUser})
          }>
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
    <View>
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
