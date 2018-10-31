import { StyleSheet, Dimensions } from 'react-native';

var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }, 
    item: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    itemRight: {
        flex: 1, 
        alignItems: 'flex-end', 
        marginLeft: 40,
    }, 
    viewPicture: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },  
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    img: {
        width:100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 15,
    } , 
    button: {
        height: 45,
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#409eff',
    },
    buttonText: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16
    }
})

export default styles;