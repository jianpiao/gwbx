
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import styles from './Style';


export default class CompleteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { title: '页面而' },
                { title: '阿德法' },
                { title: '啊哈哈' },
                { title: '卡卡卡' }
            ],
            refreshing: false,
            time:2
        }
    }

    //  下拉刷新事件
    onRefresh = () => {
        this.setState({
            refreshing: false
        })
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


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.list}
                    initialNumToRender={8}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                    ListEmptyComponent={() => this.emptyComponent()}
                    ListFooterComponent={() => this.footer()}
                    onEndReached={(info) => this.loadMore()}
                    renderItem={({ item }) => <Text>{item.title}</Text>}
                />
            </View>
        );
    }
}
