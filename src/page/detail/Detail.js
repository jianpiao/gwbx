
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import styles from './Style';
import { createStackNavigator } from 'react-navigation';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


export default class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'详情页面'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.text}</Text>
            </View>
        );
    }
}


