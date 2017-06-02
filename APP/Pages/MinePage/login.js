/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>登陆</Text>
      </View>
    );
  }

  componentWillMount() {
    Actions.refresh({
        leftTitle: '返回',
        onLeft: Actions.pop,
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
module.exports = Login;
