import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Color from '../constants/Color';
import {SCREEN_WIDTH} from '../shared/ultility';
import {Button, Text} from 'native-base';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: <View />,
  };
  constructor(props) {
    super(props);
    this.state = {
      access_token:
        'Bearer b2a6272dec86dd214925c4f7f7bc099f6cb7fdf8e05edd06ecb9acccd44b213b',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Button block style={styles.loginBtn} onPress={() => this.props.navigation.navigate('Main')}>
          <Text style={styles.loginStyle}>Đăng nhập</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.lightGray,
  },
  loginStyle: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 14,
  },
  loginBtn: {
    margin: 32, 
    backgroundColor: Color.tintColor, 
    borderRadius: 10
  },
});
