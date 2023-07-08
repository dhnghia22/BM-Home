import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export class Metrics {
  static screenWidth: number = Dimensions.get('screen').width;
  static screenHeight: number = Dimensions.get('screen').height;
  static windowWidth: number = Dimensions.get('window').width;
  static windowHeight: number = Dimensions.get('window').height;
  static bottomNavigatorBar: number =
    Platform.OS === 'android'
      ? Dimensions.get('screen').height - Dimensions.get('window').height
      : 0;
  static get statusBarHeight(): number {
    return getStatusBarHeight();
  }
}
