import { StyleSheet, Dimensions } from 'react-native';

var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 17,
        margin: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 5,
        // textAlignVertical: 'top'
    },
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