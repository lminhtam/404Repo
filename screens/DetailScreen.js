import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Color from '../constants/Color';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Chi tiết',
  };
  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.state.params.detail,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.nameStyle}>{this.state.product.title}</Text>
        <View style={styles.detailContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageStyle}
              source={{uri: this.state.product.images[0].src}}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.tagStyle}>Giá</Text>
            <Text style={styles.priceStyle}>
              {this.state.product.variants[0].price}
            </Text>
            <Text style={styles.tagStyle}>Số lượng</Text>
            <Text style={styles.inventoryStyle}>
              {this.state.product.variants[0].inventory_quantity}
            </Text>
            <Text style={styles.tagStyle}>Tình trạng</Text>
            <Text style={styles.inventoryStyle}>Tồn kho {} ngày</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.nameStyle}>Biểu đồ doanh thu tháng {}</Text>
        </View>
        <View style={styles.recommendationContainer}>
          <Text style={styles.nameStyle}>Đề xuất</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: Color.lightGray,
    //margin: 10,
  },
  detailContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor: '#aaaaa1',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  chartContainer: {
    flex: 4,
    //backgroundColor: '#aaaba1',
  },
  recommendationContainer: {
    flex: 3,
    //backgroundColor: '#afaca1',
  },
  imageStyle: {
    height: '100%',
    resizeMode: 'stretch',
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 5,
  },
  priceStyle: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  inventoryStyle: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  tagStyle: {
    fontSize: 11,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});
