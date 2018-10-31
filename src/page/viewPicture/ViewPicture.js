import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';

//  查看图片
class ViewPictureScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:''
        }
    }

    
    componentDidMount = () => {
        let { params } = this.props.navigation.state;
        this.setState({
            img: params.img
        })
    };
    

    //  页面
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={{ uri: this.state.img }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(ViewPictureScreen);
