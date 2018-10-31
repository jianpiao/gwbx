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
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                repair_state: 3
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error == 0) {
                    this.props.dispatch(getDoneRepairList(res.data))
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
        return <View style={styles.separ} />
    }
    //  列表为空时渲染该组件
    emptyComponent = () => {
        return (
            <View style={styles.empty}>
                <Text>暂无内容</Text>
            </View>
        )
    }
    //  列表头部
    listHeaderComponent = () => {
        return (
            <View style={styles.listHead}>
                <Text style={styles.listHeadText}>处理完成: {this.props.store.getDoneRepairList.length} 单</Text>
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
                            <View style={styles.item}>
                                <View style={styles.itemHeader}>
                                    <View>
                                        <Text onPress={() => preventDoublePress.onPress(() => this.call(`tel:${item.phone_number}`))}>{item.user_name}:{item.phone_number}</Text>
                                    </View>
                                    <View style={styles.itemHeaderRight}>
                                        <Text>{item.dormitory}</Text>
                                    </View>
                                </View>
                                <View style={styles.itemContent}>
                                    <View style={{ flex: 1, }}>
                                        <Text>{item.repair_content}</Text>
                                    </View>
                                    <View>
                                        {
                                            item.incidental_picture.length > 0 ?
                                                <Image
                                                    style={styles.img}
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
