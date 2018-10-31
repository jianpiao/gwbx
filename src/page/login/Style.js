import { StyleSheet, Dimensions } from 'react-native';

var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageBackground: {
        height: screenHeight
    },
    logo: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    body: {
        padding: 15
    },
    title: {
        color: '#e9e9e9',
        marginTop: 15,
        paddingLeft: 5,
    },
    textInput: {
        height: 40, 
        color: '#fff', 
        fontSize: 16, 
        borderWidth: 0, 
        borderBottomWidth: .8, 
        borderBottomColor: '#fff',
    },
    button: {
        height: 45,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#409eff'
    },
    buttonText: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16
    }
})

export default styles;