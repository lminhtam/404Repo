import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import Color from '../constants/Color';

export default class Product extends React.Component{
  render() {
    return (
      <View style={styles.productContainer}>
        <Image source={{uri: this.props.image}} style={styles.imageStyle}/>
        <View style={styles.infoContainer}>
          <Text style={styles.nameStyle}>{this.props.name}</Text>
          <Text style={styles.priceStyle}>{this.props.price}</Text>
          <Text style={styles.inventoryStyle}>{this.props.inventory_quantity}</Text>
        </View>
      </View>
    )
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
    shadowColor: Color.gray,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 5,
    width: Dimensions.get('window').width - 20,
  },
  infoContainer: {
    //flex: 1,
    marginLeft: 15,
    marginRight:  15,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
 imageStyle: {
   height: 100,
   width: 100,
   resizeMode: 'stretch'
 },
 nameStyle: {
  fontSize: 14,
  fontWeight: 'bold'
},
priceStyle: {
  fontSize: 12,
  color: 'green'
},
inventoryStyle: {
  fontSize: 12,
  color: 'red',
}
});