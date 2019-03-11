import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import Logo from '../../components/Logo';
import InputIconRounded from "../../components/InputIconRounded";
import ButtonRounded from "../../components/ButtonRounded";
import {ActivityIndicator} from "react-native-paper";
import OAuth from "../OAuth/OAuth";

import {authenticateWithCredentials} from "../../actions/Auth";

import {commonStyles, styles} from './LoginStyles';
import {changeServerIp} from "../../actions/Basic";

class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.isLogged) {
            this.props.navigation.navigate('Applet');
        }
    }

    _onSignIn() {
        const {email, password} = this.props.user;
        const {server} = this.props;
        // TODO Checklist
        this.props.dispatchLogin(email, password, server);
    }

    _bootstrapLogin() {
        if (this.props.isAuthenticating) {
            return (
                <ActivityIndicator size="large" color="#ffffff" style={{marginTop: 25}}/>
            )
        } else {
            return (
                <ButtonRounded onPress={() => this._onSignIn()}
                               touchableStyle={commonStyles.btn150}
                               value="SIGN IN"
                               large
                />
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Logo style={styles.logoContainer}/>
                <View style={styles.loginContainer}>
                    <InputIconRounded placeholder="E-mail"
                                      placeholderTextColor="#cccccc"
                                      iconName='email'
                                      autoComplete={"email"}
                                      value={this.props.user.email}
                                      onChangeText={(text) => this.setState({user: {email: text}})}/>
                    <InputIconRounded placeholder="Password"
                                      secureTextEntry={true}
                                      placeholderTextColor="#cccccc"
                                      iconName='lock'
                                      autoComplete={"password"}
                                      value={this.props.user.password}
                                      onChangeText={(text) => this.setState({user: {password: text}})}
                    />
                    {this._bootstrapLogin()}
                </View>
                <View style={{marginTop: 100}}>
                    <InputIconRounded placeholder="Server IP"
                                      placeholderTextColor="#cccccc"
                                      iconName='router'
                                      value={this.props.server}
                                      onChangeText={(text) => this.props.dispatchChangeServerIp(text)}/>
                </View>
                <OAuth/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged,
        isAuthenticating: state.auth.isAuthenticating,
        token: state.auth.token,
        user: state.auth.user,
        server: state.basic.server,
    }
};

const mapDispatchToProps = {
    dispatchLogin: (email, password, server) => authenticateWithCredentials(email, password, server),
    dispatchChangeServerIp: (ip) => changeServerIp(ip),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)