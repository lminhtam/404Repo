import * as React from 'react';
import {Dimensions, Platform, NativeModules, AsyncStorage} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const {StatusBarManager} = NativeModules;
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export function formatCurrency(n, separate = '.') {
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  return ret;
}
export const isLoggedIn = async () => {
  const value = await AsyncStorage.getItem('Logged');
  if (value === 'Logon') return true;
  else return false;
};
