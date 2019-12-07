import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Product from '../components/Product';
import Color from '../constants/Color';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Danh sách',
  };
  constructor(props) {
    super(props);
    this.state = {
      sortPick: 'Sắp theo',
      access_token:
        'Bearer b2a6272dec86dd214925c4f7f7bc099f6cb7fdf8e05edd06ecb9acccd44b213b',
      product: [],
      filterProduct: [],
      isRefreshing: false,
      sortButtonStatus: [true, false, false],
      sortButtonPress: [true, false, false],
    };
  }

  getProducts = async () => {
    const response = await fetch('https://apis.haravan.com/com/products.json', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.access_token,
      },
    });
    let jsonResponse = await response.json();
    await this.setState({
      product: jsonResponse.products,
      filterProduct: jsonResponse.products,
    });
  };

  countInventories = variants => {
    var sum = 0;
    for (let i = 0; i < variants.length; i++) {
      sum = sum + variants[i].inventory_quantity;
    }
    return sum;
  };

  getPrice = variants => {
    if (variants.length <= 1) return variants[0].price;
    var min = variants[0].price;
    var max = variants[0].price;
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].price < min) min = variants[i].price;
      else if (variants[i].price > max) max = variants[i].price;
    }
    return min === max ? min : min + ' ~ ' + max;
  };

  onPress = product => {
    setTimeout(() => {
      this.props.navigation.navigate('Detail', { detail: product });
    }, 0);
  };

  searchProduct = text => {
    console.log(text);
    console.log(this.state.product[1].title.includes(text));
    if (text) {
      this.setState({
        filterProduct: this.state.product.filter(product =>
          product.title.includes(text)
        ),
      });
    } else {
      this.setState({ filterProduct: this.state.product });
    }
  };

  sortByName = () => {
    this.changeSortStatus(0)
    this.setState({
      filterProduct: this.state.filterProduct.sort((p1, p2) =>
        this.state.sortButtonPress[0] === true
          ? p1.title < p2.title
          : p2.title < p1.title
      ),
    });
  };

  sortByPrice = () => {
    this.changeSortStatus(1)
    this.setState({
      filterProduct: this.state.filterProduct.sort((p1, p2) =>
        this.state.sortButtonPress[1] === true
          ? p1.variants[0].price - p2.variants[0].price
          : p2.variants[0].price - p1.variants[0].price
      ),
    });
  };

  sortByInventories = () => {
    this.changeSortStatus(2)
    this.setState({
      filterProduct: this.state.filterProduct.sort((p1, p2) =>
        this.state.sortButtonPress[2] === true
          ? this.countInventories(p1.variants) -
            this.countInventories(p2.variants)
          : this.countInventories(p2.variants) -
            this.countInventories(p1.variants)
      ),
    });
    console.log(this.state.sortButtonStatus)
  };

  onRefresh = async () => {
    await this.setState({
      isRefreshing: true,
    });
    this.getProducts();

    await this.setState({
      isRefreshing: false,
    });
  };

  changeSortStatus = async buttonId => {
    let newButtonPress = this.state.sortButtonPress;
    let newButtonStatus = this.state.sortButtonStatus;
    if (newButtonStatus[buttonId])
      newButtonPress[buttonId] = !newButtonPress[buttonId]
    else {
      newButtonPress[buttonId] = true
      newButtonStatus[buttonId] = true
    }
    for (let i = 0; i < newButtonStatus.length; i++)
    {
      if (i != buttonId)
        {
          newButtonStatus[i] = false
        }
    }
    await this.setState({
      sortButtonPress: newButtonPress,
      sortButtonStatus: newButtonStatus,
    });
  }

  chooseSortIcon = buttonId => {
    if (this.state.sortButtonPress[buttonId] === true) {
      return Platform.OS === 'ios' ? 'ios-arrow-round-up' : 'md-arrow-round-up';
    } else {
      return Platform.OS === 'ios'
        ? 'ios-arrow-round-down'
        : 'md-arrow-round-down';
    }
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
            size={26}
            style={styles.searchIcon}
            color={Color.tintColor}
          />
          <TextInput
            style={styles.input}
            placeholder="Tìm sản phẩm"
            onChangeText={text => this.searchProduct(text)}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={styles.sortStyle}
            onPress={() => this.sortByName()}>
            <Text style={{color: this.state.sortButtonStatus[0] === true ? Color.tintColor : null}}>Tên</Text>
            {this.state.sortButtonStatus[0] === true ?
            <Ionicons
              name={this.chooseSortIcon(0)}
              size={24}
              style={styles.searchIcon}
              color={Color.tintColor}
            /> : <View/>}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortStyle}
            onPress={() => this.sortByPrice()}>
            <Text style={{color: this.state.sortButtonStatus[1] === true ? Color.tintColor : null}}>Giá</Text>
            {this.state.sortButtonStatus[1] === true ? 
            <Ionicons
              name={this.chooseSortIcon(1)}
              size={24}
              style={styles.searchIcon}
              color={Color.tintColor}
            /> : <View/>}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortStyle}
            onPress={() => this.sortByInventories()}>
            <Text style={{color: this.state.sortButtonStatus[2] === true ? Color.tintColor : null}}>Tồn</Text>
            {this.state.sortButtonStatus[2] === true ?
            <Ionicons
              name={this.chooseSortIcon(2)}
              size={24}
              style={styles.searchIcon}
              color={Color.tintColor}
            /> : <View/>}
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.filterProduct}
            //refreshing={this.state.isRefreshing}
            //onRefresh={this.onRefresh()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.onPress(item)}>
                <Product
                  name={item.title}
                  image={item.images[0].src}
                  price={this.getPrice(item.variants)}
                  inventory_quantity={this.countInventories(item.variants)}
                />
              </TouchableOpacity>
            )}
            extraData={this.state}
            keyExtractor={item => item.title}
          />
        </View>
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
  sortContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 5,
  },
  sortStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 3,
    //borderColor: Color.tintColor,
    padding: 5,
  },
});
