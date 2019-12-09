/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {AsyncStorage} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FeedScreen from './screens/FeedScreen';
import ListScreen from './screens/ListScreen';
import MoreScreen from './screens/MoreScreen';
import DetailScreen from './screens/DetailScreen';
import LoginScreen from './screens/LoginScreen';
import TabBarIcon from './components/TabBarIcon';
import Color from './constants/Color';
import {isLoggedIn} from './shared/ultility';

var loggedIn = 'Login';
// loggedIn = isLoggedIn();
console.log(loggedIn);

const ListStack = createStackNavigator(
  {
    List: ListScreen,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'List',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    List: {
      screen: ListStack,
      navigationOptions: {
        tabBarLabel: 'Danh sách',
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} name="shopping-cart" />
        ),
      },
    },
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} name="notifications" />
        ),
      },
    },
    More: {
      screen: MoreScreen,
      navigationOptions: {
        tabBarLabel: 'Thêm',
        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="info" />,
      },
    },
  },
  {
    tabBarOptions: {
      style: {height: 50},
      labelStyle: {
        fontFamily: 'Cabin-Regular',
        fontSize: 14,
      },
      activeTintColor: Color.tabIconSelected,
      inactiveTintColor: Color.tabIconDefault,
    },
  },
  {
    initialRouteName: 'More',
  },
);

const AppStack = createSwitchNavigator(
  {
    Login: LoginScreen,
    Main: TabNavigator,
  },
  {
    initialRouteName: loggedIn,
    headerMode: 'none',
  },
);

const App = createAppContainer(AppStack);

export default App;
