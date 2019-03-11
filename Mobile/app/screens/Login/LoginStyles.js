import {StyleSheet} from 'react-native';

import commonStyles from '../../commons/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
    },
    loginContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
});

export {
    commonStyles,
    styles,
}