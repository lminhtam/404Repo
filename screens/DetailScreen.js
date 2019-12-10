import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Modal,
} from 'react-native';
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
  Thumbnail,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import {SCREEN_HEIGHT, SCREEN_WIDTH, formatCurrency} from '../shared/ultility';

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

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.state.params.detail,
      recommendations: [],
      isLoading: true,
      recommendProductArray: [],
      recommendSelection: [],
      index: -1,
      flag: false,
      isModalVisible: false,
    };
  }

  compareId = item => item.id === this.state.product.id;

  getPromo = async () => {
    try {
      const response = await fetch(
        'https://us-central1-repo-404cf.cloudfunctions.net/setPromo',
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      let jsonResponse = await response.json();
      await this.setState({
        recommendProductArray: jsonResponse,
      });
      var index = this.state.recommendProductArray.findIndex(this.compareId);
      var recommend = [];
      var recommendSelect = [];
      var length = 0;
      if (index >= 0) {
        if (
          this.state.recommendProductArray[index].promoID.birthdayPromo === 1
        ) {
          recommend.push({
            title: 'Quà tặng sinh nhật',
            type: 'BIRTHDAY_PROMO',
            key: length,
          });
          recommendSelect.push({
            status: false,
            type: 'BIRTHDAY_PROMO',
          });
          length++;
        }
        if (this.state.recommendProductArray[index].promoID.directPromo === 1) {
          recommend.push({
            title: 'Quà tặng trực tiếp',
            type: 'DIRECT_PROMO',
            key: length,
          });
          recommendSelect.push({
            status: false,
            type: 'DIRECT_PROMO',
          });
          length++;
        }
        if (
          this.state.recommendProductArray[index].promoID.voucherPromo === 1
        ) {
          recommend.push({
            title: 'Voucher',
            type: 'VOUCHER_PROMO',
            key: length,
          });
          recommendSelect.push({
            status: false,
            type: 'VOUCHER_PROMO',
          });
          length++;
        }
        if (this.state.recommendProductArray[index].promoID.giftPromo === 1) {
          recommend.push({
            title: 'Quà tặng kèm',
            type: 'GIFT_PROMO',
            key: length,
          });
          recommendSelect.push({
            status: false,
            type: 'GIFT_PROMO',
          });
          length++;
        }
        var dis = this.state.recommendProductArray[index].discount;
        if (dis > 0) {
          recommend.push({
            title: `Giảm ${dis}%`,
            type: 'DISCOUNT',
            key: length,
          });
          recommendSelect.push({
            status: false,
            type: 'DISCOUNT',
          });
          length++;
        }
      }

      await this.setState({
        isLoading: false,
        recommendations: recommend,
        recommendSelection: recommendSelect,
        index: index,
      });
    } catch {
      await this.setState({isLoading: false});
    }
  };

  componentDidMount() {
    this.getPromo();
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

  handleApplyBtn = async () => {
    var select = this.state.recommendSelection;
    var recom = this.state.recommendations;
    var flag = false;
    for (let i = 0; i < select.length; i++) {
      if (select[i].status === true) {
        if (select[i].type === 'DISCOUNT') {
          var p = this.state.product;
          p.variants[0].price = this.state.recommendProductArray[
            this.state.index
          ].newPrice;
        }
        select.splice(i, 1);
        recom.splice(i, 1);
        i--;
        flag = true;
      } else {
        select[i].key = i;
        recom[i].key = i;
      }
    }
    await this.setState({
      recommendSelection: select,
      recommendations: recom,
      flag: flag,
      isModalVisible: true,
    });
  };

  handlePressCheckBox = async item => {
    var select = this.state.recommendSelection;
    select[item.key].status = !select[item.key].status;
    await this.setState({recommendSelection: select});
  };

  renderRecommendation = ({item}) => (
    <ListItem
      onPress={() => this.handlePressCheckBox(item)}
      style={{width: SCREEN_WIDTH - 32}}>
      <CheckBox
        checked={this.state.recommendSelection[item.key].status}
        color={Color.tintColor}
        onPress={() => this.handlePressCheckBox(item)}
      />
      <Body>
        <Text style={styles.recomStyle}>{item.title}</Text>
      </Body>
    </ListItem>
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
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalContainer}>
                  <Thumbnail
                    large
                    source={
                      this.state.flag
                        ? require('../shared/img/success.png')
                        : require('../shared/img/error.png')
                    }
                    style={{alignSelf: 'center', marginTop: 16}}
                  />
                  <Text style={{...styles.noRecom, alignSelf: 'center'}}>
                    {this.state.flag
                      ? 'Đã áp dụng thành công!'
                      : 'Vui lòng chọn đề xuất cần áp dụng'}
                  </Text>
                  <Button
                    style={styles.applyBtn}
                    onPress={() => {
                      this.setState({
                        isModalVisible: !this.state.isModalVisible,
                      });
                    }}>
                    <Text style={styles.btnTextStyle}>Quay lại</Text>
                  </Button>
                </View>
              </Modal>
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
                  keyExtractor={item => item.images}
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
                {!this.state.isLoading ? (
                  this.state.recommendations.length === 0 ? (
                    <Text style={styles.noRecom}>
                      Hiện chưa có đề xuất nào cho sản phẩm.
                    </Text>
                  ) : (
                    <View>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.recommendations}
                        renderItem={this.renderRecommendation}
                        extraData={this.state}
                        keyExtractor={item => item.key}
                      />
                      <Button
                        block
                        style={styles.applyBtn}
                        onPress={() => this.handleApplyBtn()}>
                        <Text style={styles.btnTextStyle}>Áp dụng</Text>
                      </Button>
                    </View>
                  )
                ) : (
                  <Spinner color="blue" />
                )}
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
    backgroundColor: 'white',
    height: SCREEN_HEIGHT - 60,
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
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
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  applyBtn: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: Color.tintColor,
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: SCREEN_WIDTH - 64,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.7,
    shadowRadius: 20,
    marginTop: 150,
  },
});
