import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import SocialButton from "../../components/SocialButton";

import {authenticateWithFacebook, authenticateWithGoogle} from "../../actions/Auth";

import {styles} from "./OAuthStyles";

class OAuth extends Component {
    _signInOnGoogle() {
        const {server} = this.props;
        this.props.dispatchAuthGoogle(server);
    };

    _signInOnFacebook = async () => {
        const {server} = this.props;
        this.props.dispatchAuthFacebook(server);
    };

    render() {
        return (
            <View style={styles.socialContainer}>
                <SocialButton onPress={() => this._signInOnGoogle()} google/>
                <SocialButton onPress={() => this._signInOnFacebook()} facebook/>
            </View>
        )
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
    dispatchAuthGoogle: (server) => authenticateWithGoogle(server),
    dispatchAuthFacebook: (server) => authenticateWithFacebook(server)
};

export default connect(mapStateToProps, mapDispatchToProps)(OAuth)