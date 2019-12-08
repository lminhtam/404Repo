import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {STATUSBAR_HEIGHT} from '../shared/ultility';
import Color from '../constants/Color';

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'Feed',
  };
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      refreshing: false,
    };
  }

  onRefresh = async () => {
    await this.setState({refreshing: true});
    await this.setState({refreshing: false});
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.containerScroll}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
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
    backgroundColor: Color.lightGray,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    backgroundColor: Color.lightGray,
  },
  noNotiText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
});
