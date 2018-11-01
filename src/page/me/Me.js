import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    DatePickerAndroid
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
            list: [],
            total:[],
            startTime: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            endTime: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`,
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
                        ],
                        startTime: `${new Date().getFullYear()}-${this.farmatTime(new Date().getMonth())}-${this.farmatTime(new Date().getDate())}`,
                        endTime: `${new Date().getFullYear()}-${this.farmatTime(new Date().getMonth() + 1)}-${this.farmatTime(new Date().getDate())}`,
                    })
                    this.getStatisticsData()
                }
            }
        })
    }
    //  格式时间
    farmatTime(i) {
        return i < 10 ? '0'+i :i
    }
    //  时间选择框
    datePick = (tag) => {
        try {
            const { action } = DatePickerAndroid.open({
                // 要设置默认值为今天的话，使用`new Date()`即可
                date: new Date(tag == 0 ? this.state.startTime : this.state.endTime),
                maxDate: tag == 0 ? new Date(this.state.endTime) : new Date(),
                minDate: tag == 1 ? new Date(this.state.startTime) : new Date('2018-03-01'),
            }).then(({ year, month, day }) => {
                if (action !== DatePickerAndroid.dismissedAction) {
                    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                    //  取消则不执行
                    if (year == undefined || year == NaN || month == undefined || month == NaN) {

                    } else {
                        this.props.dispatch(refreshing(true))
                        //  0 是开始时间 1是结束时间呢
                        if (tag == 0) {
                            this.setState({
                                startTime: `${year}-${this.farmatTime(month + 1)}-${this.farmatTime(day)}`
                            })
                        } else {
                            this.setState({
                                endTime: `${year}-${this.farmatTime(month + 1)}-${this.farmatTime(day)}`
                            })
                        }
                        this.getStatisticsData()
                    }
                }
            })
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    //  获取评价
    getStatisticsData() {
        fetch(getURL + 'getStatisticsData', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                admin_id: this.state.list[0].value,
                end_time: this.state.endTime,
                start_time: this.state.startTime,
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.error == 0) {
               this.setState({
                   total: [
                       { title: '完成订单', value: res.data.count },
                       { title: '平均评分', value: res.data.average },
                       { title: '出色评分个数', value: res.data.level_5 },
                       { title: '优秀评分个数', value: res.data.level_4 },
                       { title: '一般评分个数', value: res.data.level_3 },
                       { title: '较差评分个数', value: res.data.level_2 },
                       { title: '极差评分个数', value: res.data.level_1 },
                   ],
               })
            } else {
                ToastAndroid.show(res.data, ToastAndroid.SHORT);
            }
            this.props.dispatch(refreshing(false))
        })
        .catch((err) => {
            this.props.dispatch(refreshing(false))
            ToastAndroid.show('网络异常', ToastAndroid.SHORT);
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
    //  下拉刷新
    onRefresh = () => {
        this.props.dispatch(refreshing(true))
        this.getStatisticsData()
    }

    //  页面
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.card}>
                        <Text style={styles.headerTitle}>我的信息</Text>
                        <FlatList
                            data={this.state.list}
                            initialNumToRender={8}
                            renderItem={({ item, index }) =>
                                <View key={index} style={styles.item}>
                                    <View>
                                        <Text>{item.title}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                        <Text>{item.value}</Text>
                                    </View>
                                </View>
                            }
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => preventDoublePress.onPress(() => this.jumpLogin())}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>切换账号</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.headerTitle}>统计信息</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 15, }}>
                                <View style={{ flexDirection: 'row'}}>
                                    <Text onPress={() => preventDoublePress.onPress(() => this.datePick(0))}>{this.state.startTime}</Text>
                                    <Text>至</Text>
                                    <Text onPress={() => preventDoublePress.onPress(() => this.datePick(1))}>{this.state.endTime}</Text>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.total}
                            initialNumToRender={8}
                            refreshing={this.props.store.refreshing}
                            onRefresh={() => this.onRefresh()}
                            renderItem={({ item, index }) =>
                                <View key={index} style={styles.item}>
                                    <View>
                                        <Text>{item.title}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                        <Text>{item.value}</Text>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(ViewPictureScreen);
