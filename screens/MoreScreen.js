import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import Color from '../constants/Color';
import {SCREEN_WIDTH} from '../shared/ultility';
import {Button, Text} from 'native-base';

class Information extends React.Component {
  render() {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.tagStyle}>{this.props.name}</Text>
        <Text style={styles.infoStyle}>{this.props.info}</Text>
      </View>
    );
  }
}

export default class MoreScreen extends React.Component {
  static navigationOptions = {
    title: 'More',
  };
  constructor(props) {
    super(props);
    this.state = {
      access_token:
        'Bearer b2a6272dec86dd214925c4f7f7bc099f6cb7fdf8e05edd06ecb9acccd44b213b',
      shop: {},
      info: [],
      refreshing: false,
    };
  }

  getShop = async () => {
    const response = await fetch('https://apis.haravan.com/web/shop.json', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.access_token,
      },
    });
    let jsonResponse = await response.json();
    await this.setState({shop: jsonResponse.shop});
    let info = [];
    info.push({name: 'Email', info: this.state.shop.email});
    var add =
      this.state.shop.address1 +
      ' ' +
      this.state.shop.city +
      ' ' +
      this.state.shop.province +
      ' ' +
      this.state.shop.country_name;
    add.replace('null', '');
    info.push({name: 'Địa chỉ', info: add});
    info.push({name: 'Điện thoại', info: this.state.shop.phone});
    info.push({name: 'Múi giờ', info: this.state.shop.timezone});
    info.push({name: 'Tiển tệ', info: this.state.shop.currency});
    await this.setState({info: info});
  };

  componentDidMount() {
    this.getShop();
  }

  onRefresh = async () => {
    await this.setState({refreshing: true});
    this.getShop();
    await this.setState({refreshing: false});
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem('Logged');
      this.props.navigation.navigate('Login');
    } catch (exception) {
      console.log(exception);
    }
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <View style={styles.container}>
          <Text style={styles.nameStyle}>{this.state.shop.name}</Text>
          <FlatList
            data={this.state.info}
            renderItem={({item}) => (
              <Information
                name={item.name}
                info={item.info != null ? item.info : 'Không có'}
              />
            )}
            keyExtractor={item => item.name}
          />
          <Button
            bordered
            danger
            style={{marginTop: 16}}
            onPress={() => this.logout()}>
            <Text style={styles.logoutStyle}>Đăng xuất</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  nameStyle: {
    fontFamily: 'Cabin-Bold',
    fontSize: 20,
    margin: 20,
    color: Color.tintColor,
    paddingTop: 16,
  },
  tagStyle: {
    fontFamily: 'Cabin-Regular',
    fontSize: 10,
    marginBottom: 10,
  },
  infoStyle: {
    fontFamily: 'Cabin-Bold',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    minHeight: 30,
    padding: 15,
    margin: 5,
    borderRadius: 5,
    width: SCREEN_WIDTH - 32,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  logoutStyle: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    margin: 30,
    color: Color.errorText,
  },
});
