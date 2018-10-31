import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
import { refreshing, getRepairList, getDoneRepairList } from '../../redux/actions';
var screenHeight = Dimensions.get('window').height;


class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    //  提交
    comfirm = () => {
        fetch(getURL + 'setNotes', {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                repair_state: this.props.store.detail.item.repair_state,
                m_notes: this.props.store.detail.item.m_notes
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.error == 0) {
                let index = this.props.store.detail.index;
                if (this.props.store.detail.item.repair_state == 2) {
                    this.props.store.getRepairList[index].m_notes = this.props.store.detail.item.m_notes
                    this.props.dispatch(getRepairList(this.props.store.getRepairList))
                } else {
                    this.props.store.getDoneRepairList[index].m_notes = this.props.store.detail.item.m_notes
                    this.props.dispatch(getDoneRepairList(this.props.store.getDoneRepairList))
                }
            } else {
                ToastAndroid.show(res.data, ToastAndroid.SHORT);
            }
        })
        .catch((err) => {
            console.log(err);
            ToastAndroid.show('网络异常', ToastAndroid.SHORT);
        })
    }
    //  输入维修说明
    jumpTextInput = (index,note) => {
        if (index == 11) {
            this.props.navigation.navigate('TextInput', {
                value: note
            });
        }
    }
    //  跳转到查看图片
    jumpViewPicture = (i) => {
        this.props.navigation.navigate('ViewPicture', {
            img: i
        });
    }
    //  页面
    render() {
        let data = this.props.store.detail.item;
        let list = [
            { title: '订单编号', value: data.repair_id },
            { title: '报修者',   value: data.user_name },
            { title: '电话号码', value: data.phone_number },
            { title: '校区',     value: data.campus_name },
            { title: '宿舍号',   value: data.dormitory },
            { title: '内容',     value: data.repair_content },
            { title: '提交时间', value: data.up_time },
            { title: '处理时间', value: data.processing_time },
            { title: '分配人员', value: data.admin_name },
            { title: '处理状态', value: data.repair_state == 2 ? '待处理' : '处理完成' },
            { title: '用户评价', value: data.evaluate },
            { title: '维修说明', value: data.m_notes.length > 0 ? data.m_notes : '点击填写' },
        ]
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        list.map((item, index) => {
                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    activeOpacity={1}
                                    style={styles.item}
                                    onPress={() => preventDoublePress.onPress(() => this.jumpTextInput(index,item.m_notes))}>
                                    <View>
                                        <Text>{item.title}</Text>
                                    </View>
                                    <View style={styles.itemRight}>
                                        <Text>{item.value}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <View style={styles.viewPicture}>
                        <View>
                            <Text>图片描述</Text>
                        </View>
                        <View style={styles.images}>
                            {
                                this.props.store.detail.item.incidental_picture.map((item,index) => {
                                    return (
                                        <TouchableOpacity 
                                            key={index}
                                            activeOpacity={.8}
                                            onPress={() => preventDoublePress.onPress(() => this.jumpViewPicture(item))}>
                                            <Image
                                                style={styles.img}
                                                source={{ uri: item }}
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => preventDoublePress.onPress(() => this.comfirm())}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>提交</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(DetailScreen);
