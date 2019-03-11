import React, {Component} from 'react';
import {SafeAreaView, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native'
import {connect} from 'react-redux';

import Logo from '../../components/Logo'

import {commonStyles, styles} from './AuthLoadingStyles';

class AuthLoading extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    async _bootstrapAsync() {
        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token ? 'App': 'Auth')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Logo style={styles.logoContainer}/>
                <ActivityIndicator size="large" color="#ffffff" style={{marginTop: 50}}/>
                <StatusBar barStyle="default"/>
            </SafeAreaView>
        )
    }
}

export default connect()(AuthLoading);