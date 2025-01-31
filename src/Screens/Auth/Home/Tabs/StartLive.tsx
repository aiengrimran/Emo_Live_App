import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import appStyles from '../../../../styles/styles';
import {colors} from '../../../../styles/colors';
import envVar from '../../../../config/envVar';
import axiosInstance from '../../../../Api/axiosConfig';
import Context from '../../../../Context/Context';
import {useDispatch} from 'react-redux';
import {setPodcast} from '../../../../store/slice/podcastSlice';

interface StartLiveProps {
  navigation: any;
}
export default function StartLive({navigation}: StartLiveProps) {
  const dispatch = useDispatch();
  const {userAuthInfo} = useContext(Context);
  const {user, setUser} = userAuthInfo;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    liveType: '',
    title: 'test 122',
    duration: '20',
    listeners: [],
    type: '',
  });

  const startLiveTransmission = async () => {
    if (!validations()) return;
    if (form.liveType == 'video') {
      navigation.navigate('GoLive2');
      return;
    }
    startPodCast();
  };

  const startPodCast = async () => {
    try {
      // setUser
      setLoading(true);

      console.log('starting podcast');

      const data = {
        title: form.title,
        duration: form.duration,
        listeners: form.listeners,
        type: 'public',
      };
      const url = envVar.API_URL + 'podcast/start';

      const res = await axiosInstance.post(url, data);
      setLoading(false);

      if (res.status == 201) {
        setUser(() => res.data.user);
        dispatch(setPodcast(res.data.podcast));
        navigation.navigate('GoLive');
      }
      // const res = await axiosInstance.post(url, JSON.stringify(data));
      console.log(res.data);
    } catch (error: any) {
      setLoading(false);
      setError('please check internet connection');
      console.log(error.response.data.message);
    }
  };
  const validations = () => {
    let valid = false;
    if (!form.liveType)
      return Alert.alert('error', 'Please click live type is required..');
    if (!form.title) return Alert.alert('error', 'Title is required');
    if (!form.duration) return Alert.alert('error', 'Duration is required');
    if (!form.listeners) return Alert.alert('error', 'Listeners is required');
    return true;
  };
  return (
    <View style={styles.container}>
      <View style={{marginTop: Platform.OS == 'ios' ? 40 : 0}}>
        <Text style={styles.heading}>Start Live</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          style={appStyles.indicatorStyle}
          animating={loading}
          size={'large'}
          color={colors.complimentary}
        />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() =>
                setForm((prevState: any) => ({...form, liveType: 'podcast'}))
              }
              style={{
                width: '40%',
                alignItems: 'center',
                backgroundColor: colors.accent,
                padding: 10,
                borderRadius: 9,
              }}>
              <Text
                style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
                Start Podcast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setForm((prevState: any) => ({...form, liveType: 'video'}))
              }
              style={{
                width: '40%',
                alignItems: 'center',
                borderColor: colors.accent,
                borderWidth: 2,
                // backgroundColor: colors.accent,
                padding: 10,
                borderRadius: 9,
              }}>
              <Text style={[appStyles.regularTxtMd, {color: colors.accent}]}>
                Live Streaming
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                style={styles.inputBox}
                value={form.title}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={(e: any) =>
                  setForm(prevState => ({...prevState, title: e}))
                }
                placeholder="title of live ...."
                placeholderTextColor={colors.body_text}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={styles.label}>Duration:</Text>
              <TextInput
                style={styles.inputBox}
                value={form.duration}
                autoCapitalize="none"
                maxLength={2}
                keyboardType="default"
                onChangeText={(e: any) =>
                  setForm(prevState => ({...prevState, duration: e}))
                }
                placeholder="duration in minutes ...."
                placeholderTextColor={colors.body_text}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.label}>Podcast Type:</Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  width: '99%',
                  paddingRight: 10,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    setForm(prevState => ({
                      ...prevState,
                      type: 'private',
                    }))
                  }
                  style={[
                    styles.genderBtn,
                    form.type == 'private' && {
                      backgroundColor: '#64566e',
                    },
                    styles.leftBtn,
                  ]}>
                  <Text style={styles.genderTxt}>private</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setForm(prevState => ({
                      ...prevState,
                      type: 'public',
                    }))
                  }
                  style={[
                    styles.genderBtn,
                    form.type == 'public' && {
                      backgroundColor: '#64566e',
                    },
                    styles.rightBtn,
                  ]}>
                  <Text style={styles.genderTxt}>public</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 90}}>
            {error && (
              <Text style={[appStyles.errorText, {marginTop: 10}]}>
                {error}
              </Text>
            )}
            <TouchableOpacity
              onPress={startLiveTransmission}
              style={styles.btn}>
              <Text
                style={[appStyles.regularTxtMd, {color: colors.complimentary}]}>
                Let's Start
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
    padding: 16,
  },
  heading: {
    ...appStyles.headline,
    color: colors.complimentary,
    textAlign: 'center',
  },
  label: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
    marginTop: 10,
  },
  inputBox: {
    marginTop: 5,
    borderColor: colors.complimentary,
    borderWidth: 1,
    color: colors.complimentary,
    padding: 12,
    borderRadius: 4,
  },
  genderBtn: {
    borderColor: 'grey',
    justifyContent: 'center',
    padding: 15,
    width: '52%',
  },
  genderTxt: {
    color: '#fff',
    textAlign: 'center',
  },
  rightBtn: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  leftBtn: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  btn: {
    marginTop: 20,
    width: '99%',
    alignSelf: 'center',
    borderColor: colors.accent,
    borderWidth: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 9,
  },
});
