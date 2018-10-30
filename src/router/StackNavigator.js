import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import tabNav from './TabNavigator';


const headerStyle = {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomColor: '#eee',
    borderBottomWidth: 0.8
}


//  详情
import DetailScreen from '../page/detail/Detail';                                  //  订单详情


//  登录注册
import LoginScreen from '../page/login/Login';                                      //  登录
// import LogupScreen from '../src/page/login/logup/index';                         //  注册


//  首页启动广告
import AdvertisementScreen from '../page/advertisement/index';                      //  启动广告

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
    Login: {
        screen: LoginPage,
        navigationOptions: () => ({
            title: '登录',
            headerStyle: headerStyle,
        })
    }
}, {
        
    });