import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import tabNav from './TabNavigator';


const headerStyle = {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomColor: '#eee',
    borderBottomWidth: 0.8
}

import ViewPictureScreen from '../page/viewPicture/ViewPicture';           //  查看图片
import TextInputScreen from '../page/textInput.js/TextInput';           //  输入框
import DetailScreen from '../page/detail/Detail';                       //  详情
import LoginScreen from '../page/login/Login';                            //  登录
import AdvertisementScreen from '../page/advertisement/Advertisement';                  //  启动广告

const LoginPage = createSwitchNavigator({
    Login: LoginScreen
},{
    initialRouteName: 'Login',
    resetOnBlur:true
})


// 初始化StackNavigator
export default MyApp = createStackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    Advertisement: {
        screen: AdvertisementScreen,
        navigationOptions: {
            header: null,
        }
    },
    tabNav: {
        screen: tabNav,
        navigationOptions: {
            header: null,
        }
    },
    Detail: {
        screen: DetailScreen,
        navigationOptions: ()=>({
            title: '订单详情',
            headerStyle: headerStyle,
        })
    },
    ViewPicture: {
        screen: ViewPictureScreen,
        navigationOptions: {
            header: null
        }
    },
    TextInput: {
        screen: TextInputScreen,
        navigationOptions: () => ({
            title: '编辑维修说明',
            headerStyle: headerStyle,
        })
    },
    Login: {
        screen: LoginPage,
        navigationOptions:{
            header: null
        }
    }
}, {
        // transitionConfig: TransitionConfiguration
        
        //  设置打开应用默认显示的页面
        // initialRouteName: tabNav,
    });