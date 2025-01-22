import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import React, {useContext, useCallback, useState, useRef} from 'react';
import Context from '../../../../Context/Context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome6';
import envVar from '../../../../config/envVar';
import appStyles from '../../../../styles/styles';
import PlayStore from '../../../../assets/svg/play.svg';
import Cat from '../../../../assets/svg/cat.svg';
import EasyPaisa from '../../../../assets/svg/easy.svg';
import {colors} from '../../../../styles/colors';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

export default function Coin({navigation}) {
  const {userAuthInfo, tokenMemo} = useContext(Context);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheet, setSheet] = useState<boolean>(false);

  const {user} = userAuthInfo;
  const {token} = tokenMemo;
  const [tab, setTab] = useState(1);
  const [card, setCard] = useState(2);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const updateCard = (valTab: number) => {
    setCard(valTab);
  };
  const updateTab = (valTab: number) => {
    setTab(valTab);
  };
  return (
    <View style={styles.container}>
      <View style={{marginTop: Platform.OS == 'ios' ? 40 : 10}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Icon name="arrow-left-thin" color={colors.complimentary} size={25} />
        </TouchableOpacity>
      </View>

      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <Image
          style={appStyles.userAvatar}
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
        />
        <Text style={styles.userText}>
          {/* Current Details */}
          {user.first_name + ' ' + user.last_name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>1435</Text>
            <Text style={styles.infoText}>Diamond</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>247k</Text>
            <Text style={styles.infoText}>Beans</Text>
          </View>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <TouchableOpacity>
          <Text style={styles.balanceTxt}>Account Balance</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.coinType}>
        <TouchableOpacity
          onPress={() => setTab(1)}
          style={[styles.tab, tab == 1 && {borderBottomWidth: 2}]}>
          <Text style={[styles.tabText, tab == 1 && {color: '#fff'}]}>
            Diamonds
          </Text>
          <Icon
            style={{marginLeft: 5}}
            name="diamond"
            color="#4ea2e6"
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(2)}
          style={[styles.tab, tab == 2 && {borderBottomWidth: 2}]}>
          <Text style={[styles.tabText, tab == 2 && {color: '#fff'}]}>
            Beans
          </Text>
          <Icon name="chevron-right" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
      {tab == 1 ? (
        <Diamond
          navigation={navigation}
          handleOpenSheet={handleOpenSheet}></Diamond>
      ) : (
        <Beans
          navigation={navigation}
          handleOpenSheet={handleOpenSheet}></Beans>
      )}
      <BottomSheet
        index={-1}
        enablePanDownToClose={true}
        snapPoints={['45%']}
        ref={bottomSheetRef}
        backgroundStyle={{
          borderTopEndRadius: 40,
          borderTopLeftRadius: 40,
        }}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: colors.body_text,
        }}
        handleStyle={{
          borderTopEndRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: colors.LG,
        }}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={{marginTop: 20, borderRadius: 30}}>
            <Text style={[appStyles.regularTxtRg, {color: colors.body_text}]}>
              Chose Method :
            </Text>
            <View style={{marginTop: 30}}>
              <TouchableOpacity style={styles.sheetBtn}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <PlayStore height={33} width={33} />
                  <Text
                    style={[
                      appStyles.paragraph1,
                      {color: colors.complimentary, marginLeft: 15},
                    ]}>
                    Google Play Store
                  </Text>
                </View>
                <Icon name="chevron-right" size={25} color={colors.lines} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sheetBtn}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Cat height={33} width={33} />
                  <Text
                    style={[
                      appStyles.paragraph1,
                      {color: colors.complimentary, marginLeft: 15},
                    ]}>
                    Meow Live Offline
                  </Text>
                </View>
                <Icon name="chevron-right" size={25} color={colors.lines} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current?.close();
                  navigation.navigate('PurchaseVIP');
                }}
                style={styles.sheetBtn}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <EasyPaisa height={33} width={33} />
                  <Text
                    style={[
                      appStyles.paragraph1,
                      {color: colors.complimentary, marginLeft: 15},
                    ]}>
                    Easypaisa
                  </Text>
                </View>
                <Icon name="chevron-right" size={25} color={colors.lines} />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f31',
    padding: 10,
  },
  tab: {
    flexDirection: 'row',
    width: '50%',
    paddingBottom: 10,
    borderBottomColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceTxt: {
    ...appStyles.regularTxtRg,
    color: colors.complimentary,
  },
  tabText: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: 'red',
    backgroundColor: colors.LG,
    // borderTopEndRadius: 40,
    // borderTopLeftRadius: 40,
    padding: 16,
  },
  coinType: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
  },
  backBtn: {
    flexDirection: 'row',
    width: '30%',
    position: 'absolute',
    left: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
  },
  sheetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  accountInfo: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
  },

  cardPeriod: {
    color: colors.complimentary,
    ...appStyles.bodyMd,
    marginLeft: 5,
    marginVertical: 10,
  },
  cardPrice: {
    ...appStyles.bodyMd,
    color: colors.complimentary,
  },
  card: {
    paddingTop: 10,
    width: '30%',
    height: 150,
    backgroundColor: '#302847',
    borderWidth: 1,
    borderColor: '#403f51',
    alignItems: 'center',
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#ef0143',
    width: '90%',
    padding: 15,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCard: {
    borderColor: '#a30733',
    backgroundColor: '#291118',
  },

  tabBtn: {
    borderBottomColor: 'white',
    paddingBottom: 10,
  },
  info: {
    width: '25%',
  },
  infoHeading: {
    ...appStyles.headline2,
    color: colors.complimentary,
    marginLeft: 5,
  },
  infoText: {
    ...appStyles.bodyRg,
    color: colors.body_text,
  },
  cardAmount: {
    backgroundColor: '#ed005c',
    borderRadius: 9,
    padding: 5,
    marginTop: -5,
  },
  userText: {
    ...appStyles.headline,
    marginTop: 10,
    textAlign: 'center',
    color: colors.complimentary,
  },
});

const Diamond = ({navigation, handleOpenSheet}) => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>900</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$1.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>2700</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$2.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>5400</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$9.99</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>9000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$14.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>18000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$29.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/diamonds.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" color="#4ea2e6" size={18} />
            <Text style={styles.cardPeriod}>45000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$34.99</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Beans = ({navigation, handleOpenSheet}) => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card} onPress={handleOpenSheet}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>900</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$1.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>2700</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$2.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>5400</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$9.99</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>9000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$14.99</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>18000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$29.9</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleOpenSheet()}>
          <Image
            style={{height: 90, width: 90}}
            source={require('../../../../assets/images/beans.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="palm-tree" color="#8d3b38" size={18} />
            <Text style={styles.cardPeriod}>45000</Text>
          </View>
          <View style={styles.cardAmount}>
            <Text style={styles.cardPrice}>$34.99</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
