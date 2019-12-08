import * as React from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
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
    console.log(response);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
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

  render() {
    return (
      <ScrollView>
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
          <Button bordered danger style={{marginTop: 16}}>
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
    backgroundColor: Color.lightGray,
    margin: 16,
  },
  nameStyle: {
    fontFamily: 'Cabin-Bold',
    fontSize: 20,
    margin: 20,
    color: Color.tintColor,
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
    shadowColor: Color.gray,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 5,
  },
  logoutStyle: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    margin: 30,
    color: Color.errorText,
  },
});
