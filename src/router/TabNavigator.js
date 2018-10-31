import React from 'react';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Image, Text, View } from 'react-native';

//  页面
import HomeScreen from '../page/home/Home';
import CompleteScreen from '../page/complete/Copmlete';
import NoticeScreen from '../page/notice/Notice';
import MeScreen from '../page/me/Me';

const style = StyleSheet.create({
    footImage: {
        width: 23,
        height: 23
    }
});  

const headerStyle = {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomColor:'#eee',
    borderBottomWidth: 1
}


//Tab
export default createMaterialTopTabNavigator({
    //每一个页面的配置
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            tabBarLabel: '待处理',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage, { tintColor: tintColor }]}
                    source={require('../static/img/wait.png')}
                />
            ),
            headerStyle: headerStyle
        })
    },
    Complete: {
        screen: CompleteScreen,
        navigationOptions: () => ({
            tabBarLabel: '处理完成',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage, { tintColor: tintColor }]}
                    source={require('../static/img/done.png')}
                />
            ),
            headerStyle: headerStyle
        })
    },
    Notice: {
        screen: NoticeScreen,
        navigationOptions: () => ({
            tabBarLabel: '通知',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage, { tintColor: tintColor }]}
                    source={require('../static/img/notice.png')}
                />
            ),
            headerStyle: headerStyle
        })
    },
    Me: {
        screen: MeScreen,
        navigationOptions: () => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage, { tintColor: tintColor }]}
                    source={require('../static/img/me.png')}
                />
            ),
            headerStyle: headerStyle
        })
    }
}, {
        //设置TabNavigator的位置
        tabBarPosition: 'bottom',
        //是否在更改标签时显示动画
        animationEnabled: false,
        //是否允许在标签之间进行滑动
        swipeEnabled: true,
        //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        backBehavior: "none",
        //　懒加载
        lazy: false,
        //设置Tab标签的属性
        tabBarOptions: {
            //共有属性
            showLabel: true,//是否显示label，默认开启
            activeBackgroundColor: '#666',
            activeTintColor: '#000',
            inactiveBackgroundColor: '#999',
            pressColor: '#eee',//  波纹
            inactiveTintColor: '#999', // label和icon的背景色 不活跃状态下（未选中）。
            style: { //TabNavigator 的背景颜色
                backgroundColor: '#fff',
                height: 50
            },
            showIcon: true,
            labelStyle: {//文字的样式
                fontSize: 11,
                marginTop: 0
            },
            indicatorStyle: {
                height: 0
            }
        }
    });




