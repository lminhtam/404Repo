import * as React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Product from '../components/Product';
import Color from '../constants/Color';
import {
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Segment,
  Spinner,
} from 'native-base';
import firebase from 'react-native-firebase';
import {SCREEN_WIDTH, formatCurrency, SCREEN_HEIGHT} from '../shared/ultility';
import LinearGradient from 'react-native-linear-gradient';

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token:
        'Bearer b2a6272dec86dd214925c4f7f7bc099f6cb7fdf8e05edd06ecb9acccd44b213b',
      product: null,
      filterProduct: null,
      sortButtonStatus: [true, false, false],
      sortButtonPress: [true, false, false],
      searchValue: '',
      isLoading: true,
      refreshing: false,
    };
  }
  static navigationOptions = {
    header: <View />,
  };

  getProducts = async () => {
    try {
      const response = await fetch(
        'https://apis.haravan.com/com/products.json',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.state.access_token,
          },
        },
      );
      let jsonResponse = await response.json();
      await this.setState({
        product: jsonResponse.products,
        filterProduct: jsonResponse.products,
        isLoading: false,
      });
    } catch {
      await this.setState({isLoading: false});
    }
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
      this.props.navigation.navigate('Detail', {detail: product});
    }, 0);
  };

  searchProduct = () => {
    var text = this.state.searchValue.toLowerCase();
    if (text) {
      this.setState({
        filterProduct: this.state.product.filter(product =>
          product.title.toLowerCase().includes(text),
        ),
      });
    } else {
      this.setState({filterProduct: this.state.product});
    }
  };

  sortByName = () => {
    this.changeSortStatus(0);
    this.setState({
      filterProduct: this.state.filterProduct.sort((p1, p2) =>
        this.state.sortButtonPress[0] === true
          ? p1.title < p2.title
          : p2.title < p1.title,
      ),
    });
  };

  sortByPrice = () => {
    this.changeSortStatus(1);
    this.setState({
      filterProduct: this.state.filterProduct.sort((p1, p2) =>
        this.state.sortButtonPress[1] === true
          ? p1.variants[0].price - p2.variants[0].price
          : p2.variants[0].price - p1.variants[0].price,
      ),
    });
  };

  sortByInventories = () => {
    this.changeSortStatus(2);
    this.setState({
      filterProduct: this.state.filterProduct.sort((p1, p2) =>
        this.state.sortButtonPress[2] === true
          ? this.countInventories(p1.variants) -
            this.countInventories(p2.variants)
          : this.countInventories(p2.variants) -
            this.countInventories(p1.variants),
      ),
    });
  };

  changeSortStatus = async buttonId => {
    let newButtonPress = this.state.sortButtonPress;
    let newButtonStatus = this.state.sortButtonStatus;
    if (newButtonStatus[buttonId])
      newButtonPress[buttonId] = !newButtonPress[buttonId];
    else {
      newButtonPress[buttonId] = true;
      newButtonStatus[buttonId] = true;
    }
    for (let i = 0; i < newButtonStatus.length; i++) {
      if (i != buttonId) {
        newButtonStatus[i] = false;
      }
    }
    await this.setState({
      sortButtonPress: newButtonPress,
      sortButtonStatus: newButtonStatus,
    });
  };

  chooseSortIcon = buttonId => {
    if (this.state.sortButtonPress[buttonId] === true) {
      return 'arrow-upward';
    } else {
      return 'arrow-downward';
    }
  };

  setSearchValue = text => {
    this.setState({searchValue: text});
    if (text === '') {
      this.setState({filterProduct: this.state.product});
    }
  };

  onRefresh = async () => {
    await this.setState({refreshing: true});
    this.getProducts();
    console.log('dang chay');
    await this.setState({refreshing: false});
  };

  componentDidMount() {
    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(credential => {
    //     if (credential) {
    //       console.log('default app user ->', credential.user.toJSON());
    //     }
    //   });
    // const iosConfig = {
    //   clientId: 'x',
    //   appId: 'x',
    //   apiKey: 'x',
    //   databaseURL: 'x',
    //   storageBucket: 'x',
    //   messagingSenderId: 'x',
    //   projectId: 'x',

    //   // enable persistence by adding the below flag
    //   persistence: true,
    // };

    // // pluck values from your `google-services.json` file you created on the firebase console
    // const androidConfig = {
    //   clientId: '715810601989-5bkk9elhu1fnf37m0586ac4hj62u4aue.apps.googleusercontent.com',
    //   appId: 'x',
    //   apiKey: 'AIzaSyCWvxQ8lDS55ETY5aUKFLYInfsVEd-As3U',
    //   databaseURL: 'x',
    //   storageBucket: 'repo-404cf.appspot.com',
    //   messagingSenderId: 'x',
    //   projectId: 'repo-404cf',

    //   // enable persistence by adding the below flag
    //   persistence: true,
    // };

    // const kittensApp = firebase.initializeApp(
    //   // use platform specific firebase config
    //   Platform.OS === 'ios' ? iosConfig : androidConfig,
    //   // name of this app
    //   'kittens',
    // );

    // // dynamically created apps aren't available immediately due to the
    // // asynchronous nature of react native bridging, therefore you must
    // // wait for an `onReady` state before calling any modules/methods
    // // otherwise you will most likely run into `app not initialized` exceptions
    // kittensApp.onReady().then(app => {
    //   // --- ready ---
    //   // use `app` arg, kittensApp var or `app('kittens')` to access modules
    //   // and their methods. e.g:
    //   firebase
    //     .app('kittens')
    //     .auth()
    //     .signInAnonymously()
    //     .then(user => {
    //       console.log('kittensApp user ->', user.toJSON());
    //     });
    // });
    this.getProducts();
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{height: SCREEN_HEIGHT - 60, width: '100%'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#003E70', '#217FF3']}
            style={{width: '100%', height: 130}}>
            <Header transparent searchBar rounded hasSegment>
              <Item>
                <Icon name="ios-search" />
                <Input
                  style={styles.inputSearch}
                  placeholder="Nhập tên sản phẩm"
                  onChangeText={text => this.setSearchValue(text)}
                />
                <Button
                  transparent
                  active
                  onPress={() => {
                    this.searchProduct();
                  }}>
                  <Text style={styles.searchBtn}>Tìm kiếm</Text>
                </Button>
              </Item>
            </Header>
            <Segment transparent style={{backgroundColor: null}}>
              <Button
                first
                style={styles.sortStyle}
                active={this.state.sortButtonStatus[0]}
                onPress={() => this.sortByName()}>
                <Text
                  style={{
                    ...styles.sortBtn,
                    color:
                      this.state.sortButtonStatus[0] === true
                        ? Color.tintColor
                        : '#ffffff',
                  }}>
                  Tên
                </Text>
                {this.state.sortButtonStatus[0] === true ? (
                  <Icon
                    type="MaterialIcons"
                    name={this.chooseSortIcon(0)}
                    style={styles.searchIcon}
                  />
                ) : (
                  <View />
                )}
              </Button>
              <Button
                style={styles.sortStyle}
                active={this.state.sortButtonStatus[1]}
                onPress={() => this.sortByPrice()}>
                <Text
                  style={{
                    ...styles.sortBtn,
                    color:
                      this.state.sortButtonStatus[1] === true
                        ? Color.tintColor
                        : '#ffffff',
                  }}>
                  Giá
                </Text>
                {this.state.sortButtonStatus[1] === true ? (
                  <Icon
                    type="MaterialIcons"
                    name={this.chooseSortIcon(1)}
                    style={styles.searchIcon}
                  />
                ) : (
                  <View />
                )}
              </Button>
              <Button
                last
                style={styles.sortStyle}
                active={this.state.sortButtonStatus[2]}
                onPress={() => this.sortByInventories()}>
                <Text
                  style={{
                    ...styles.sortBtn,
                    color:
                      this.state.sortButtonStatus[2] === true
                        ? Color.tintColor
                        : '#ffffff',
                  }}>
                  Tồn
                </Text>
                {this.state.sortButtonStatus[2] === true ? (
                  <Icon
                    type="MaterialIcons"
                    name={this.chooseSortIcon(2)}
                    style={styles.searchIcon}
                  />
                ) : (
                  <View />
                )}
              </Button>
            </Segment>
          </LinearGradient>
          <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }>
            <View style={styles.listContainer}>
              {this.state.filterProduct !== null &&
              this.state.isLoading === false ? (
                this.state.filterProduct.length !== 0 ? (
                  <FlatList
                    data={this.state.filterProduct}
                    // refreshing={this.state.isRefreshing}
                    // onRefresh={this.onRefresh()}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => this.onPress(item)}>
                        <Product
                          name={item.title}
                          image={
                            item.images.length === 0
                              ? require('../shared/img/unknownProduct.png')
                              : {uri: item.images[0].src}
                          }
                          price={`${formatCurrency(
                            this.getPrice(item.variants),
                          )}đ`}
                          inventory_quantity={this.countInventories(
                            item.variants,
                          )}
                        />
                      </TouchableOpacity>
                    )}
                    extraData={this.state}
                    keyExtractor={item => item.title}
                  />
                ) : (
                  <Text style={styles.noResult}>
                    Không có kết quả nào phù hợp
                  </Text>
                )
              ) : (
                <Spinner color="blue" />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.lightGray,
  },
  sortContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    color: Color.tintColor,
    fontSize: 12,
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
    width: (SCREEN_WIDTH - 32) / 3,
  },
  sortBtn: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
  },
  inputSearch: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  searchBtn: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
  },
  noResult: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
    color: 'gray',
  },
});
