import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {STATUSBAR_HEIGHT, SCREEN_WIDTH} from '../shared/ultility';
import {TouchableOpacity} from 'react-native-gesture-handler';

const noti = [
  {
    title: 'Bạn vừa thay đổi giá của 3 spBạn vừa thay đổi giá của 3 spBạn vừa thay đổi giá của 3 sp',
    key: '1',
  },
  {
    title: 'Bạn vừa thay đổi giá của 3 sp',
    key: '2',
  },
  {
    title: 'Bạn vừa thay đổi giá của 3 sp',
    key: '3',
  },
  {
    title: 'Bạn vừa thay đổi giá của 3 sp',
    key: '4',
  },
];

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

  renderItem = ({item}) => (
    <TouchableOpacity>
      <View style={styles.notiContainer}>
        <Text style={styles.notiText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

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
            <FlatList
              data={this.state.notifications}
              renderItem={this.renderItem}
              extraData={this.state}
              keyExtractor={item => item.key}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    marginTop: STATUSBAR_HEIGHT,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noNotiText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  notiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  notiText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
});
