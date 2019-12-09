import * as React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import Color from '../constants/Color';
import {SCREEN_WIDTH} from '../shared/ultility';
import {Button, Text, Toast, Thumbnail} from 'native-base';

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
      isLogin: false,
    };
  }

  handleLogin = async () => {
    try {
      await AsyncStorage.setItem('Logged', 'Logon');
      await this.setState({isLogin: true});
    } catch (error) {
      Toast.show({
        text: 'Unable to login. Try again!',
        buttonText: 'Okay',
        duration: 3000,
        position: 'top',
        type: 'danger',
      });
    }

    if (this.state.isLogin) this.props.navigation.navigate('Main');
    else
      Toast.show({
        text: 'Unable to login. Try again!',
        buttonText: 'Okay',
        duration: 3000,
        position: 'top',
        type: 'danger',
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Thumbnail
          large
          square
          source={require('../shared/img/haravan-logo.png')}
        />
        <Button style={styles.loginBtn} onPress={() => this.handleLogin()}>
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
    color: 'white',
  },
  loginBtn: {
    margin: 32,
    backgroundColor: Color.tintColor,
    borderRadius: 10,
  },
});
