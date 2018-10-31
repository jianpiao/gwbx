import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { notice } from '../../redux/actions';
import preventDoublePress from '../../global/preventDoublePress';

//  查看图片
class ViewPictureScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    componentDidMount() {
        // this.setState({
        //     img:''
        // })
    } 

    //  提交
    getNotice = () => {
        fetch(getURL + 'GetNoticeList', {
            method: 'POST',
            mode: "cors",
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
        })
        .catch((err) => {
            console.log(err);
            ToastAndroid.show('网络异常', ToastAndroid.SHORT);
        })
    }


    //  页面
    render() {
        this.props.store.notice = this.props.store.notice.filter(m => m.notice_type == 1 && m.default == 1)
        return (
            <View style={styles.container}>
                {
                    this.props.store.notice.map((item,index) => {
                        return (
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
                        )
                    })
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(ViewPictureScreen);
