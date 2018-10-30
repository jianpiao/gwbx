import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import styles from './style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
var screenHeight = Dimensions.get('window').height;


class advertisement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time:2,
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
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.error == 0) {
                this.getShopSelect()
                this.setState({
                    loginState: true
                })
            } else {
                this.setState({
                    loginState: false
                })
            }
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
                <ImageBackground style={styles.img} source={{ uri: 'http://a0.att.hudong.com/65/93/20200000013920144728934736563_s.jpg'}} resizeMode='cover'>
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
    counter: state.counter
})

export default connect(mapStateToProps)(advertisement);
