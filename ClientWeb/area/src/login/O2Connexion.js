import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SocialButton from './SocialButton';
import {FacebookLoginButton, AmazonLoginButton, GoogleLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import {connect} from "react-redux";
import Axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.nodes = {};
        this.state = {
            email: '',
            password: '',
            name: '',
            token: ''
        };

        this.setToken = this.setToken.bind(this);
    }

    setToken(e) {
        const action = { type: "SET_TOKEN", value: this.state.token }
        this.props.dispatch(action)
    }

    render() {
        const handleSocialLogin = (user) => {
            const queryString = require('query-string');
            console.log(user);
            const action = { type: "SET_ACCESS_TOKEN", value: user._token.accessToken }
            this.props.dispatch(action)
            console.log("FINAL:")
            console.log(this.props.myAccessToken)


           Axios({
                method: 'post',
                url: 'http://localhost:3000/api/users/facebook-authentication',
                timeout: 8000, // Let's say you want to wait at least 8 seconds
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "email": user._profile.email,
                    "email_verified": true,
                    "id": user._profile.id,
                    "facebook_token": this.props.myAccessToken
                }
            })
               .then((response) => {
                   this.setState({token: response.data.token});
                   this.setToken();
                   this.props.arg.history.push({
                       pathname: '/introduction',
                       state: {arg: this.props.arg}
                   })
               })
               .catch((error) => {
                   console.log("NON")
               });
        }
        const handleSocialLoginFailure = (err) => {
            console.error(err);
        }
        const facebookConnection = () => {
            console.log('Click facebook');
        }
        const googleConnection = () => {
            console.log('Click google');
        }
        //708310633916-csofb3c3fs72hfjnsotdhcaeljl8anna.apps.googleusercontent.com
        return (
            <div className="ConnectO2">
                <div><SocialButton provider='facebook' appId='753022275083687' onLoginSuccess={handleSocialLogin} onLoginFailure={handleSocialLoginFailure}>
                        <FacebookLoginButton onClick={() => facebookConnection()} />
                    </SocialButton>
                </div>
                <div>
                    <SocialButton provider='google' appId='708310633916-csofb3c3fs72hfjnsotdhcaeljl8anna.apps.googleusercontent.com' onLoginSuccess={handleSocialLogin} onLoginFailure={handleSocialLoginFailure}>
                    <GoogleLoginButton onClick={() => googleConnection()} />
                    </SocialButton>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        myToken: state.myToken,
        myAccessToken: state.myAccessToken
    }
}
export default connect(mapStateToProps)(Login)
