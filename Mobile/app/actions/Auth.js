import axios from 'axios';
import {AuthSession} from "expo";
import {
    LOG_IN,
    LOG_IN_FACEBOOK_FAILURE,
    LOG_IN_FACEBOOK_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_GOOGLE_FAILURE,
    LOG_IN_GOOGLE_SUCCESS,
    LOG_IN_SUCCESS,
    LOG_OUT,
    SIGN_UP,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS, TOKEN
} from "../constants/AuthActionTypes";

function signUp() {
    return {
        type: SIGN_UP
    }
}

function signUpSuccess(res) {
    return {
        type: SIGN_UP_SUCCESS,
        res: res
    }
}

function signUpFailure(err) {
    return {
        type: SIGN_UP_FAILURE,
        err: err
    }
}

export function createUser(fullname, email, password, server) {
    return (dispatch) => {
        dispatch(signUp());
        axios.post(`http://${server}:3000/api/users`, {
            email: email,
            password: password,
            services: []
        })
            .then(data => {
                dispatch(signUpSuccess(data));
            })
            .catch(err => {
                dispatch(signUpFailure(err));
            })
    }
}

function login() {
    return {
        type: LOG_IN
    }
}

function loginSuccess(res) {
    return {
        type: LOG_IN_SUCCESS,
        res: res
    }
}

function loginFailure(err) {
    return {
        type: LOG_IN_FAILURE,
        err: err
    }
}

export function authenticateWithCredentials(email, password, server) {
    return (dispatch) => {
        dispatch(login());
        axios.post(`http://${server}:3000/api/users/login`, null, {
            params: {
                email: email,
                password: password,
                services: []
            }
        })
            .then(res => {
                console.log('DATA:', JSON.stringify(res));
                dispatch(loginSuccess(res));
            })
            .catch(err => {
                console.log('ERROR:', JSON.stringify(err));
                dispatch(loginFailure(err));
            });
    }
}

function loginGoogleSuccess(res) {
    return {
        type: LOG_IN_GOOGLE_SUCCESS,
        res: res
    }
}

function loginGoogleFailure(err) {
    return {
        type: LOG_IN_GOOGLE_FAILURE,
        err: err
    }
}

async function signInOnGoogle() {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
        authUrl:
            `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=token` +
            `&client_id=824148393899-dak1fsl6dbr8bjpqf3ogall2gc9puln2.apps.googleusercontent.com` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    return axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            'Authorization': `Bearer ${result.params.access_token}`
        }
    })
        .then(res => {
            return {
                email: res.data.email,
                email_verified: res.data.email_verified,
                sub: res.data.sub,
                access_token: result.params.access_token
            };
        })
        .catch(err => {
            console.error(err);
        });
}

export function authenticateWithGoogle(server) {
    return (dispatch) => {
        dispatch(login());
        signInOnGoogle()
            .then(res => {
                    axios.post(`http://${server}:3000/api/users/google-authentication`, {
                        email: res.email,
                        email_verified: res.email_verified,
                        sub: res.sub,
                        google_token: res.access_token,
                    })
                        .then(res => {
                            dispatch(loginGoogleSuccess(res))
                        })
                        .catch(err => {
                            dispatch(loginGoogleFailure(err))
                        })
                },
            )
            .catch(err => {
                console.error(err);
            })
    }
}

function loginFacebookSuccess(res) {
    return {
        type: LOG_IN_FACEBOOK_SUCCESS,
        res: res
    }
}

function loginFacebookFailure(err) {
    return {
        type: LOG_IN_FACEBOOK_FAILURE,
        err: err
    }
}

async function signInOnFacebook() {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
        authUrl:
            `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
            `&client_id=2059085010813517` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    return axios.get("https://graph.facebook.com/v3.2/me", {
        params: {
            fields: "id,name,email",
            access_token: result.params.access_token
        }
    })
        .then(res => {
            return {
                email: res.data.email,
                email_verified: true,
                id: res.data.id,
                access_token: result.params.access_token
            };
        })
        .catch(err => {
            console.error(err);
        });
}

export function authenticateWithFacebook(server) {
    return (dispatch) => {
        dispatch(login());
        signInOnFacebook()
            .then(res => {
                    axios.post(`http://${server}:3000/api/users/facebook-authentication`, {
                        email: res.email,
                        email_verified: res.email_verified,
                        id: res.id,
                        facebook_token: res.access_token,
                    })
                        .then(res => {
                            dispatch(loginFacebookSuccess(res))
                        })
                        .catch(err => {
                            dispatch(loginFacebookFailure(err))
                        })
                },
            )
            .catch(err => {
                console.error(err);
            })
    }
}

function updateToken(token) {
    return {
        type: TOKEN,
        token: token,
    }
}

export function modifyToken(token) {
    return (dispatch) => {
        dispatch(updateToken(token));
    }
}

function logout() {
    return {
        type: LOG_OUT
    }
}