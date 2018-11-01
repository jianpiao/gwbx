import { StyleSheet, Dimensions } from 'react-native';

var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    item:{
        marginLeft: 10, 
        marginRight: 10, 
        backgroundColor: '#fff', 
        borderRadius: 5, 
        padding: 10
    },
    itemHeader:{
        flexDirection: 'row', 
        borderBottomColor: '#eee', 
        borderBottomWidth: .8, 
        paddingTop: 8, 
        paddingBottom: 8,
    },
    headerText: {
        color: '#000'
    }, 
    itemHeaderRight: {
        flex: 1,
        alignItems: 'flex-end',
    },  
    itemContent:{
        flexDirection: 'row', 
        paddingTop: 8, 
        paddingBottom: 8
    },
    img:{
        width: 80, 
        height: 80, 
        borderRadius: 5, 
        marginLeft: 15, 
    },
    separ:{
        height: 7,
        backgroundColor: '#f3f3f3'
    },
    empty:{
        flex: 1, 
        marginTop: 100,
        alignItems: 'center',
    },
    listHead:{
        height: 50, 
        justifyContent: 'center', 
        paddingLeft: 15,
    },
    listHeadText:{
        fontSize: 20, 
        fontWeight: '600', 
        color: '#000'
    }
})

export default styles;