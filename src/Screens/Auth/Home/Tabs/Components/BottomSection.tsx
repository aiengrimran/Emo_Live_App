import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors} from '../../../../../styles/colors';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '../../../../../styles/styles';
import liveStyles from '../styles/liveStyles';
interface BottomSectionProps {
  handleOpenSheet: any;
}

const BottomSection = ({handleOpenSheet}: BottomSectionProps) => {
  return (
    <View style={{position: 'absolute', bottom: '5%'}}>
      <View style={{flexDirection: 'row', width: '80%'}}>
        <Text style={[appStyles.bodyMd, {color: colors.yellow}]}>
          Emo Live :{' '}
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
          placeholderTextColor={'grey'}
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
              source={require('../../../../../assets/images/bag.png')}
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
export default BottomSection;

const styles = StyleSheet.create({
  ...liveStyles,
});
