import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Color from '../constants/Color';

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
        <TouchableOpacity>
          <Text style={styles.logoutStyle}>Đăng xuất</Text>
        </TouchableOpacity>
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
  nameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    color: Color.tintColor,
  },
  tagStyle: {
    fontSize: 10,
    marginBottom: 10,
  },
  infoStyle: {
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
    shadowOffset: {width: 1, height: 1},
    borderRadius: 5,
  },
  logoutStyle: {
    fontSize: 12,
    margin: 30,
    color: Color.errorText,
  },
});
