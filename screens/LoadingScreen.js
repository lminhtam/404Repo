import * as React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import Color from '../constants/Color';
import {Spinner} from 'native-base';

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    title: 'Loading',
    header: <View />,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem('Logged').then(value => {
      console.log(value);
      if (value == null) this.props.navigation.navigate('Login');
      else this.props.navigation.navigate('Main');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner color={Color.tintColor} />
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
});
