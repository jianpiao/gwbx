import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { notice, refreshing } from '../../redux/actions';
import preventDoublePress from '../../global/preventDoublePress';

//  通知
class NoticeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    componentDidMount() {
        this.props.dispatch(refreshing(true));
        this.getNotice()
    } 

    //  提交
    getNotice = () => {
        fetch(getURL + 'GetNoticeList', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                notice_type: 1
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.error == 0) {
                res.data = res.data.filter(m => m.notice_type == 1 && m.default == 1)
                this.props.dispatch(notice(res.data))
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
    //  下拉刷新事件
    onRefresh = () => {
        this.props.dispatch(refreshing(true))
        this.getNotice()
    }
    //  行与行之间的分隔线组件
    itemSeparatorComponent = () => {
        return <View style={styles.separ} />
    }
    //  列表为空时渲染该组件
    emptyComponent = () => {
        return (
            <View style={styles.empty}>
                <Text>暂无通知</Text>
            </View>
        )
    }
    //  列表头部
    listHeaderComponent = () => {
        return (
            <View style={styles.listHead}>
                <Text style={styles.listHeadText}>通知</Text>
            </View>
        )
    }

    //  页面
    render() {
        this.props.store.notice = this.props.store.notice.filter(m => m.notice_type == 1 && m.default == 1)
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.store.notice}
                    initialNumToRender={8}
                    refreshing={this.props.store.refreshing}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                    ListEmptyComponent={() => this.emptyComponent()}
                    ListHeaderComponent={() => this.listHeaderComponent()}
                    renderItem={({ item, index }) =>
                        <View key={index} style={styles.item}>
                            <View style={styles.itemHeader}>
                                <View>
                                    <Text>{item.admin_name}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                    <Text>{item.release_time}</Text>
                                </View>
                            </View>
                            <View style={styles.itemContent}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>{item.notice_title}</Text>
                                <Text style={styles.noticeContent}>{item.notice_content}</Text>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(NoticeScreen);
