import {Dimensions, StyleSheet} from 'react-native';

import commonStyles from '../../commons/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        alignItems: 'center',
    },
    headerStyle: {
        backgroundColor: '#1E90FF',
        borderBottomWidth: 0,
    },
    headerText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        width: '100%',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        height: Dimensions.get('window').width / 2,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    }
});

export {
    commonStyles,
    styles
}