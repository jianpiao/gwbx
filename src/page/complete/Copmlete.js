import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
import { refreshing, getDoneRepairList, detail } from '../../redux/actions';
var screenHeight = Dimensions.get('window').height;


class CompleteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.dispatch(refreshing(true));
        this.getMyRepair();
    }

    //  获取数据
    getMyRepair() {
        fetch(getURL + 'myRepair', {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                repair_state: 3
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error == 0) {
                    console.log("执行了0");
                    console.log(res.data);
                    this.props.dispatch(getDoneRepairList(res.data))
                } else {
                    console.log(res.data);

                    console.log("执行了1");
                    // ToastAndroid.show(res.data, ToastAndroid.SHORT);
                }
                this.props.dispatch(refreshing(false))
            })
            .catch((err) => {
                console.log(err);
                console.log("执行了2");
                this.props.dispatch(refreshing(false))
                ToastAndroid.show('网络异常', ToastAndroid.SHORT);
            })
    }
    //  跳转到详情
    jumpDetail = (item, index) => {
        this.props.dispatch(detail({ item, index }))
        this.props.navigation.navigate('Detail')
    }
    //  下拉刷新事件
    onRefresh = () => {
        this.props.dispatch(refreshing(true))
        this.getMyRepair()
    }

    //  行与行之间的分隔线组件
    itemSeparatorComponent = () => {
        return <View style={{ height: 7, backgroundColor: '#f3f3f3' }} />
    }
    //  列表为空时渲染该组件
    emptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text>暂无内容</Text>
            </View>
        )
    }
    //  列表头部
    listHeaderComponent = () => {
        return (
            <View style={{ height: 50, justifyContent: 'center', paddingLeft: 15, }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>处理完成: {this.props.store.getDoneRepairList.length}</Text>
            </View>
        )
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.store.getDoneRepairList}
                    initialNumToRender={8}
                    refreshing={this.props.store.refreshing}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                    ListEmptyComponent={() => this.emptyComponent()}
                    ListHeaderComponent={() => this.listHeaderComponent()}
                    renderItem={({ item, index }) =>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="#eee"
                            key={index}
                            onPress={() => preventDoublePress.onPress(() => this.jumpDetail(item, index))}>
                            <View style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#fff', borderRadius: 5, padding: 10 }}>
                                <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: .8, paddingTop: 8, paddingBottom: 8 }}>
                                    <View>
                                        <Text>{item.user_name}:{item.phone_number}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                        <Text>{item.dormitory}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8 }}>
                                    <View style={{ flex: 1, }}>
                                        <Text>{item.repair_content}</Text>
                                    </View>
                                    <View>
                                        {
                                            item.incidental_picture.length > 0 ?
                                                <Image
                                                    style={{ width: 80, height: 80, borderRadius: 5, marginLeft: 15, }}
                                                    source={{ uri: item.incidental_picture[0] }}
                                                />
                                                : null
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(CompleteScreen);
