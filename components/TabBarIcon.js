import React from 'react';
import Color from '../constants/Color';
import {Icon} from 'native-base';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        type="MaterialIcons"
        name={this.props.name}
        style={{
          fontSize: 20,
          color: this.props.focused
            ? Color.tabIconSelected
            : Color.tabIconDefault,
        }}
      />
    );
  }
}
