import * as React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {STATUSBAR_HEIGHT} from '../shared/ultility';

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'Feed',
  };
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  render() {
    return (
      <ScrollView style={styles.containerScroll}>
        <View style={styles.container}>
          {this.state.notifications.length === 0 ? (
            <Text style={styles.noNotiText}>Bạn hiện không có thông báo.</Text>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerScroll: {
    marginTop: STATUSBAR_HEIGHT,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    backgroundColor: '#ffffff',
  },
  noNotiText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
});
