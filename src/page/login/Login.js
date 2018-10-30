
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ToastAndroid,
    TextInput
} from 'react-native';
import styles from './Style';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { isRefreshing, getRepairList } from '../../redux/actions';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            text: ''
        }
    }


    componentDidMount = () => {
        // this.getData()
    }

    //  更新版本
    getData() {
        fetch('http://gwbx2.wokecp.com/public/index.php/Index/admin/myRepair/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                repair_state: '2'
            })
        }).then((res) => res.json()).then((res) => {
            if (res.error == 0) {
                console.log(res.data);
                this.props.dispatch(getRepairList(res.data))
            } else {
                ToastAndroid.show(res.data, ToastAndroid.SHORT);
            }
        }).catch((error) => {
            console.log(error);
            ToastAndroid.show('网络异常', ToastAndroid.SHORT);
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>账户名</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Text>密码</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(LoginScreen);
