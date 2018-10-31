import { StyleSheet, Dimensions } from 'react-native';

var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    item: {
        marginTop: 10, 
        marginLeft: 12, 
        marginRight: 12, 
        padding: 10, 
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    itemHeader: {
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: .8,
        paddingTop: 5,
        paddingBottom: 5,
    },
    itemContent: {
        paddingTop: 5,
    },
    noticeContent: {
        marginTop: 10,
    }
})

export default styles;