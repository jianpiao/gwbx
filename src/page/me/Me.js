import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { refreshing, userInfo } from '../../redux/actions';
import preventDoublePress from '../../global/preventDoublePress';

//  查看图片
class ViewPictureScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.readData()
    }

    //  校区
    compus = (i) => {
        let a = {
            0: '全部',
            1: '高要',
            2: '鼎湖'
        }
        return a[i];
    }
    //  员工权限
    type = (i) => {
        let a = {
            1: '超级管理员',
            2: '普通员工',
            3: '组长'
        }
        return a[i];
    }

    //  读取本地记录
    readData = () => {
        AsyncStorage.getItem('userInfo', (error, value) => {
            if (error) {
                //  读取失败
            } else {
                //  读取成功
                if (value !== null) {
                    value = JSON.parse(value);
                    this.setState({
                        list: [
                            { title: '员工编号', value: value.admin_id },
                            { title: '员工名称', value: value.admin_name },
                            { title: '员工权限', value: this.type(value.authority) },
                            { title: '管理校区', value: this.compus(value.campus) }
                        ]
                    })
                }
            }
        })
    }

    //  跳转到登录
    jumpLogin = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }


    //  页面
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.headerTitle}>我的信息</Text>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <View key={index} style={styles.item}>
                                    <View>
                                        <Text>{item.title}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                        <Text>{item.value}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => preventDoublePress.onPress(() => this.jumpLogin())}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>切换账号</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(ViewPictureScreen);
