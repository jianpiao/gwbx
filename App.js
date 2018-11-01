import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, BackHandler} from 'react-native';
import StackNavigator from './src/router/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

export default class App extends Component {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.BackHandler);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.BackHandler);
    }
  }


  //  物理返回键 事件触发
  BackHandler = () => {
    if (this.state.lastBackPressed && this.state.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp()
      return false
    }
    this.state.lastBackPressed = Date.now()
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
    return true
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.app}>
          <StackNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'row'
  }
});

global.getURL = 'http://gwbx2.wokecp.com/public/index.php/index/admin/';
