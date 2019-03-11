import {StyleSheet} from 'react-native';

import commonStyles from '../../commons/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        width: '100%',
    },
    item: {
        width: '100%',
    }
});

export {
    commonStyles,
    styles
}