import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
import { detail } from '../../redux/actions';

class TextInputScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    componentDidMount = () => {
        let { params } = this.props.navigation.state;
        this.setState({
            value: params.value
        })
    };
    
    //  确认
    comfirm = () => {
        this.props.store.detail.item.m_notes = this.state.value;
        this.props.dispatch(detail(this.props.store.detail));
        this.props.navigation.goBack();
    }

    //  页面
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.text}
                    autoFocus={true}
                    onChangeText={(value) => this.setState({ value })}
                    value={this.state.value}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    placeholder='维修说明'
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => preventDoublePress.onPress(() => this.comfirm())}
                    activeOpacity={0.8}>
                    <Text style={styles.buttonText}>提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(TextInputScreen);
