import * as React from 'react';
import {View, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import Color from '../constants/Color';
import {
  Header,
  Left,
  Body,
  Button,
  Icon,
  Title,
  Text,
  CheckBox,
  ListItem,
  Spinner,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import {SCREEN_HEIGHT, SCREEN_WIDTH, formatCurrency} from '../shared/ultility';
import {TouchableOpacity} from 'react-native-gesture-handler';

const emptyImg = [
  {
    title: '1',
    src: require('../shared/img/unknownProduct.png'),
  },
  {
    title: '2',
    src: require('../shared/img/unknownProduct.png'),
  },
  {
    title: '3',
    src: require('../shared/img/unknownProduct.png'),
  },
];

const Recommend = [
  {
    title: 'Giảm 30%',
    type: 'DISCOUNT',
  },
  {
    title: 'Tặng quà sinh nhật',
    type: 'BIRTHDAY_GIFT',
  },
  {
    title: 'Trả góp 0%',
    type: 'INSTALLMENT',
  },
];

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.state.params.detail,
      recommendations: Recommend,
      isLoading: true,
      recommendProductArray: [],
    };
  }

  getPromo = async () => {
    try {
      const response = await fetch(
        'https://https://us-central1-repo-404cf.cloudfunctions.net/setPromo',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      let jsonResponse = await response.json();
      await this.setState({
        recommendProductArray: jsonResponse,
        isLoading: false,
      });
    } catch {
      await this.setState({isLoading: false});
    }
  };

  componentDidMount() {
    this.getPromo();
    console.log(this.state.recommendProductArray);
    var productWithPromo = this.state.recommendProductArray;
    var index = productWithPromo.findIndex(
      ({item}) => item.id == this.state.product.id,
    );
  }

  renderItem = ({item}) => (
    <View>
      <Image
        style={styles.productImg}
        resizeMode="stretch"
        source={{uri: item.src}}
      />
    </View>
  );

  renderEmptyItem = ({item}) => (
    <View>
      <Image style={styles.productImg} resizeMode="stretch" source={item.src} />
    </View>
  );

  renderRecommendation = ({item}) => (
    <TouchableOpacity>
      <ListItem style={{width: SCREEN_WIDTH - 32}}>
        <CheckBox checked={false} color={Color.tintColor} />
        <Body>
          <Text style={styles.recomStyle}>{item.title}</Text>
        </Body>
      </ListItem>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView>
        <View style={styles.safeArea}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#003E70', '#217FF3']}
            style={{width: '100%', height: 78}}>
            <Header
              transparent
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Chi tiết</Title>
              </Body>
            </Header>
          </LinearGradient>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imgDetailContainer}>
              {this.state.product.images.length === 0 ? (
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={emptyImg}
                  renderItem={this.renderEmptyItem}
                  extraData={this.state}
                  keyExtractor={item => item.title}
                />
              ) : (
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.product.images}
                  renderItem={this.renderItem}
                  extraData={this.state}
                  keyExtractor={item => item.title}
                />
              )}
              <Text style={styles.nameStyle}>{this.state.product.title}</Text>
              <View style={styles.detailContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.tagStyle}>Giá:</Text>
                  <Text style={styles.tagStyle}>Số lượng tồn:</Text>
                  <Text style={styles.tagStyle}>Tình trạng:</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.priceStyle}>
                    {`${formatCurrency(this.state.product.variants[0].price)}đ`}
                  </Text>
                  <Text style={styles.inventoryStyle}>
                    {this.state.product.variants[0].inventory_quantity}
                  </Text>
                  <Text style={styles.inventoryStyle}>Tồn kho {} ngày</Text>
                </View>
              </View>
            </View>
            <View style={styles.recommendationContainer}>
              <Text style={styles.nameStyle}>Đề xuất</Text>
              <View style={styles.imgDetailContainer}>
                {this.state.recommendations.length === 0 ? (
                  <Text style={styles.noRecom}>
                    Hiện chưa có đề xuất nào cho sản phẩm.
                  </Text>
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Recommend}
                    renderItem={this.renderRecommendation}
                    extraData={this.state}
                    keyExtractor={item => item.title}
                  />
                )}
                <Button block style={styles.applyBtn}>
                  <Text style={styles.recomStyle}>Áp dụng</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Color.lightGray,
    height: SCREEN_HEIGHT - 60,
    width: '100%',
  },
  container: {
    backgroundColor: Color.lightGray,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
  },
  recommendationContainer: {
    width: '100%',
  },
  nameStyle: {
    fontSize: 16,
    fontFamily: 'Cabin-Bold',
    marginBottom: 16,
    marginLeft: 16,
    marginTop: 16,
  },
  priceStyle: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: 'green',
    marginBottom: 5,
  },
  inventoryStyle: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: 'red',
    marginBottom: 5,
  },
  tagStyle: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Cabin-SemiBold',
  },
  productImg: {
    width: SCREEN_WIDTH,
    height: 200,
  },
  imgDetailContainer: {
    backgroundColor: '#ffffff',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  noRecom: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
    margin: 16,
  },
  recomStyle: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  applyBtn: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: Color.tintColor,
  },
});
