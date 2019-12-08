import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Color from '../constants/Color';
import {Thumbnail} from 'native-base';
import {SCREEN_WIDTH} from '../shared/ultility';

export default class Product extends React.Component {
  render() {
    return (
      <View style={styles.productContainer}>
        <Thumbnail square large source={this.props.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.nameStyle}>{this.props.name}</Text>
          <Text style={styles.priceStyle}>{`Giá: ${this.props.price}`}</Text>
          <Text style={styles.inventoryStyle}>
            {`Số lượng tồn: ${this.props.inventory_quantity}`}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ffffff',
    minHeight: 30,
    margin: 10,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 5,
    width: SCREEN_WIDTH - 32,
    padding: 15,
  },
  infoContainer: {
    marginLeft: 15,
    marginRight: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 100,
    width: 100,
    resizeMode: 'stretch',
  },
  nameStyle: {
    fontFamily: 'Cabin-Bold',
    fontSize: 16,
  },
  priceStyle: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 14,
    color: 'green',
  },
  inventoryStyle: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 14,
    color: 'red',
  },
});
