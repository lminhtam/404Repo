import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Color from '../constants/Color';
import {Header, Left, Body, Button, Icon, Title} from 'native-base';
import {Thumbnail} from 'native-base';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    header: (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Chi tiết</Title>
        </Body>
      </Header>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.state.params.detail,
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.nameStyle}>{this.state.product.title}</Text>
        <View style={styles.detailContainer}>
          <View style={styles.imageContainer}>
            <Thumbnail
              square
              large
              source={
                item.images.length === 0
                  ? require('../shared/img/unknownProduct.png')
                  : {uri: item.images[0].src}
              }
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightGray,
  },
  detailContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
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
  },
  recommendationContainer: {
    flex: 3,
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
