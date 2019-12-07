/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FeedScreen from './screens/FeedScreen';
import ListScreen from './screens/ListScreen';
import MoreScreen from './screens/MoreScreen';
import DetailScreen from './screens/DetailScreen';
import TabBarIcon from './components/TabBarIcon';
import Color from './constants/Color';

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
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
          />
        ),
      },
    },
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarIcon: ({focused}) => (
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'
            }
          />
        ),
      },
    },
    More: {
      screen: MoreScreen,
      navigationOptions: {
        tabBarLabel: 'Thêm',
        tabBarIcon: ({focused}) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Color.tabIconSelected,
      inactiveTintColor: Color.tabIconDefault,
    },
  },
  {
    initialRouteName: 'More',
  },
);

const App = createAppContainer(TabNavigator);

export default App;
