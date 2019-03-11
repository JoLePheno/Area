import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import Logo from "../../components/Logo";
import InputIconRounded from "../../components/InputIconRounded";
import ButtonRounded from "../../components/ButtonRounded";
import {ActivityIndicator} from "react-native-paper";
import OAuth from "../OAuth/OAuth";

import {createUser} from "../../actions/Auth";

import {commonStyles, styles} from "./RegisterStyles";


class Register extends Component {
    static navigationOptions = {
        header: null,
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.isLogged) {
            this.props.navigation.navigate('Home');
        }
    }

    _onSignUp() {
        const { fullname, email, password } = this.props.user;
        const { server } = this.props;
        // TODO Checklist
        this.props.dispatchCreateUser(fullname, email, password, server);
    }

    _bootstrapRegister() {
        if (this.props.isRegistering) {
            return (
                <ActivityIndicator size="large" color="#ffffff" style={{marginTop: 25}}/>
            )
        } else {
            return (
                <ButtonRounded onPress={() => this._onSignUp()}
                               touchableStyle={commonStyles.btn150}
                               value="SIGN UP"
                               large
                />
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Logo style={styles.logoContainer}/>
                <View style={styles.registerContainer}>
                    <InputIconRounded placeholder="Full Name"
                                      placeholderTextColor="#cccccc"
                                      iconName='people'
                                      value={this.props.user.fullname}
                    />
                    <InputIconRounded placeholder="E-mail"
                                      placeholderTextColor="#cccccc"
                                      iconName='email'
                                      value={this.props.user.email}
                    />
                    <InputIconRounded placeholder="Password"
                                      secureTextEntry={true}
                                      placeholderTextColor="#cccccc"
                                      iconName='lock'
                                      value={this.props.user.password}
                    />
                    <InputIconRounded placeholder="Confirm Password"
                                      secureTextEntry={true}
                                      placeholderTextColor="#cccccc"
                                      iconName='lock'
                                      value={this.props.user.password}
                    />
                    { this._bootstrapRegister() }
                </View>
                <OAuth/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged,
        isRegistering: state.auth.isRegistering,
        token: state.auth.token,
        user: state.auth.user,
        server: state.basic.server,
    }
};

const mapDispatchToProps = {
    dispatchCreateUser: (fullname, email, password, server) => createUser(fullname, email, password, server)
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)
