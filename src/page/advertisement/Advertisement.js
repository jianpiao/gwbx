import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
import { isRefreshing, getRepairList } from '../../redux/actions';
var screenHeight = Dimensions.get('window').height;


class Advertisement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 1,
            loginState: false
        }
    }

    componentDidMount = () => {
        this.timeGoHome && clearInterval(this.timeGoHome);
        //  已经登录 进入首页
        this.getLoginState()
        this.timeGoHome = setInterval(() => {
            if (this.state.time === 1) {
                if (this.state.loginState) {
                    this.timeGoHome && clearInterval(this.timeGoHome);
                    //  已经登录 进入首页
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'tabNav' }),
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    //  未登录 进入登录页面
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Login' }),
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                    this.timeGoHome && clearInterval(this.timeGoHome);
                }
            } else {
                this.setState({
                    time: this.state.time - 1
                })
            }
        }, 1000);
    };
    componentWillUnmount = () => {
        this.timeGoHome && clearInterval(this.timeGoHome);
    }

    //  获取登录状态
    getLoginState() {
        fetch(getURL + 'isLogin', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.error == 0) {
                this.setState({
                    loginState: true
                })
            } else {
                this.setState({
                    loginState: false
                })
            }
        })
        .catch(err => {
            console.log('错误');
            console.log(err);
        })
    }
    //  跳过广告
    jumpAdvent = () => {
        this.timeGoHome && clearInterval(this.timeGoHome);
        if (this.state.loginState) {
            this.timeGoHome && clearInterval(this.timeGoHome);
            //  已经登录 进入首页
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'tabNav' }),
                ],
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            //  未登录 进入登录页面
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' }),
                ],
            });
            this.props.navigation.dispatch(resetAction);
            this.timeGoHome && clearInterval(this.timeGoHome);
        }
    }

    //  页面
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.img} source={require('../../static/img/logo.jpg')} resizeMode='contain'>
                    <TouchableOpacity
                        onPress={() => preventDoublePress.onPress(() => this.jumpAdvent())}
                        activeOpacity={1}
                        style={styles.timeView}>
                        <Text style={styles.time}>跳过广告 {this.state.time}</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(Advertisement);
