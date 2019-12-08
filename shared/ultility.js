import * as React from 'react';
import {Dimensions, Platform, NativeModules} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const { StatusBarManager } = NativeModules;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export function formatCurrency(n, separate = '.') {
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  return ret;
}
