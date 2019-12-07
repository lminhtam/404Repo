import * as React from 'react';
import { Text, View, StyleSheet, Button, WebView } from 'react-native';

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'Feed'
  };
  constructor(props) {
      super(props)
    }


  render() {
    return (
      <View style={styles.container}>
        <Text>feed</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ffffff',
 },
});