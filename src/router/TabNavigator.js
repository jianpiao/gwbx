import React from 'react';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';


//  页面
import HomeScreen from '../page/home/Home';
import CompleteScreen from '../page/complete/Complete';

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
            // tabBarIcon: ({ tintColor }) => (
            //     <Image style={[style.footImage, { tintColor: tintColor }]}
            //         source={require('../src/static/icon/new.png')}
            //     />
            // ),
            headerStyle: headerStyle
        })
    },
    Complete: {
        screen: CompleteScreen,
        navigationOptions: () => ({
            tabBarLabel: '已完成',
            // tabBarIcon: ({ tintColor }) => (
            //     <Image style={[style.footImage, { tintColor: tintColor }]}
            //         source={require('../src/static/icon/manage.png')}
            //     />
            // ),
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
            inactiveBackgroundColor: '#666',
            pressColor: '#e9e9e9',//  波纹
            inactiveTintColor: '#ccc', // label和icon的背景色 不活跃状态下（未选中）。
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




