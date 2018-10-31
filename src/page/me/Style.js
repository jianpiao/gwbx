import { StyleSheet, Dimensions } from 'react-native';

var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    headerTitle: {
        paddingLeft: 15, 
        fontSize: 20, 
        fontWeight: '600', 
        color: '#000'
    },  
    item: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        height: 45,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        borderColor: '#999',
        borderWidth: .8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        alignSelf: 'center',
        color: '#444',
        fontSize: 16
    },
    card: {
        margin: 15,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
    }
})

export default styles;