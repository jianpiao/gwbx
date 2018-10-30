
import React, { Component } from 'react';
import { 
    Platform, 
    StyleSheet, 
    Text, 
    View,
    FlatList,
    ToastAndroid
} from 'react-native';
import styles from './Style';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { isRefreshing, getRepairList } from '../../redux/actions';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    
    componentDidMount = () =>{
        this.getData()
    }
    
    //  更新版本
    getData() {
        fetch('http://gwbx2.wokecp.com/public/index.php/Index/admin/myRepair/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                repair_state: '2'
            })
        }).then((res) => res.json()).then((res) => {
            if (res.error == 0) {
                console.log(res.data);
                this.props.dispatch(getRepairList(res.data))
            } else {
                ToastAndroid.show(res.data, ToastAndroid.SHORT);
            }
        }).catch((error) => {
            console.log(error);
            ToastAndroid.show('网络异常', ToastAndroid.SHORT);
        })
    }
    //  下拉刷新事件
    onRefresh = () => {
        this.props.dispatch(isRefreshing(true))
        this.getData()
    }
    //  底部加载提示
    footer = () => {
        return (
            <View style={styles.loadMore}>
                <Text
                    style={{ color: '#666' }}
                    onPress={() => this.loadMore()}>
                    加载更多
                    </Text>
            </View>
        )
    }
    //  行与行之间的分隔线组件
    itemSeparatorComponent = () => {
        return <View style={{ height: 0.8, backgroundColor: '#e8e8e8' }} />
    }
    //  列表为空时渲染该组件
    emptyComponent = () => {
        return <Text>暂无内容</Text>
    }
    //  加载更多
    loadMore = () => {
        console.log("下拉刷新");
    }

    jumpDetail = () => {
        this.props.navigation.navigate('Detail');
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.store.getRepairList}
                    initialNumToRender={8}
                    refreshing={this.props.store.refreshing}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                    ListEmptyComponent={() => this.emptyComponent()}
                    ListFooterComponent={() => this.footer()}
                    onEndReached={(info) => this.loadMore()}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text style={{color:'#000'}}>{item.admin_id}</Text>
                                <Text style={{ color: '#000' }}>{item.admin_name}</Text>
                                <Text style={{ color: '#000' }}>{item.campus_name}</Text>
                            </View>
                        )}
                    }
                />
                <Text onPress={() => this.jumpDetail()}>跳转到详情</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(HomeScreen);
