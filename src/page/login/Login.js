import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
import { refreshing, getRepairList, userInfo } from '../../redux/actions';
var screenHeight = Dimensions.get('window').height;


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
    }

    //  登录
    login() {
        if (this.state.name.length > 0 && this.state.password.length >0) {
            fetch(getURL + 'login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    admin_name: this.state.name,
                    pass: this.state.password
                })
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                
                if (res.error == 0) {
                    this.props.dispatch(userInfo(res.data))
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'tabNav' })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    ToastAndroid.show(res.data, ToastAndroid.SHORT);
                }
            })
        } else {
            ToastAndroid.show('账户密码不能为空', ToastAndroid.SHORT);
        }
    }


    //  页面
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.imageBackground} source={require('../../static/img/back.png')} resizeMode='cover'>
                    <View style={styles.logo}>
                        <Image
                            style={styles.img}
                            source={require('../../static/img/logo.jpg')}
                        />
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.title}>账户名:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                        />
                        <Text style={styles.title}>密码:</Text>
                        <TextInput
                            style={styles.textInput}
                            textContentType="password"
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => preventDoublePress.onPress(() => this.login())}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(LoginScreen);
