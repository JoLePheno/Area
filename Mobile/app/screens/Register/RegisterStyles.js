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
    registerContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
    socialContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 50,
    }
});

export {
    commonStyles,
    styles
}