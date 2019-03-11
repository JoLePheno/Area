import {AsyncStorage} from 'react-native';
import {
    LOG_IN, LOG_IN_FACEBOOK_FAILURE, LOG_IN_FACEBOOK_SUCCESS,
    LOG_IN_FAILURE, LOG_IN_GOOGLE_FAILURE, LOG_IN_GOOGLE_SUCCESS,
    LOG_IN_SUCCESS,
    LOG_OUT,
    SIGN_UP,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS, TOKEN
} from "../../constants/AuthActionTypes";
import {showMessage} from "react-native-flash-message";

const initialState = {
    isLogged: false,
    isAuthenticating: false,
    isRegistering: false,
    user: {
        fullname: 'Davy HANTZ',
        email: 'davy.hantz@gmail.com',
        password: 'testing',
        admin: false,
    },
    token: '',
};

function showMsg(message, description, type) {
    showMessage({
        message: message,
        description: description,
        type: type,
    });
}

function defaultAuth(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case LOG_IN:
            nextState = {
                ...state,
                isLogged: false,
                isAuthenticating: true,
            };
            return nextState || state;
        case LOG_IN_SUCCESS:
            AsyncStorage.setItem('token', action.res.data.token);
            nextState = {
                ...state,
                isLogged: true,
                isAuthenticating: false,
                user: {
                    email: action.res.data.user.email,
                    admin: action.res.data.user.admin,
                },
                token: action.res.data.token,
            };
            return nextState || state;
        case LOG_IN_GOOGLE_SUCCESS:
            AsyncStorage.setItem('token', action.res.data.token);
            nextState = {
                ...state,
                isLogged: true,
                isAuthenticating: false,
                user: {
                    email: action.res.data.user.email,
                    admin: action.res.data.user.admin,
                },
            };
            return nextState || state;
        case LOG_IN_FACEBOOK_SUCCESS:
            AsyncStorage.setItem('token', action.res.data.token);
            nextState = {
                ...state,
                isLogged: true,
                isAuthenticating: false,
                user: {
                    email: action.res.data.user.email,
                    admin: action.res.data.user.admin,
                },
            };
            return nextState || state;
        case LOG_IN_FAILURE:
            nextState = {
                ...state,
                isAuthenticating: false,
            };
            if (action.err.response == null) {
                showMsg('Error', action.err.request._response, 'danger')
            } else {
                showMsg('Error', action.err.response.data.error, 'danger');
            }
            return nextState || state;
        case LOG_IN_GOOGLE_FAILURE:
            nextState = {
                ...state,
                isAuthenticating: false,
            };
            showMsg('Error', 'Failed to login with Google', 'danger')
            return nextState || state;
        case LOG_IN_FACEBOOK_FAILURE:
            nextState = {
                ...state,
                isAuthenticating: false,
            };
            showMsg('Error', 'Failed to login with Facebook', 'danger')
            return nextState || state;
        case LOG_OUT:
            return {
                ...initialState,
            };
        case SIGN_UP:
            nextState = {
                ...state,
                isRegistering: true,
            };
            return nextState || state;
        case SIGN_UP_SUCCESS:
            nextState = {
                ...state,
                isRegistering: false,
            };
            showMsg('Successful', 'You successfully registered, please confirm your email', 'success');
            return nextState || state;
        case SIGN_UP_FAILURE:
            nextState = {
                ...state,
                isRegistering: false,
            };
            if (action.err.response == null) {
                showMsg('Error', action.err.request._response, 'danger')
            } else {
                showMsg('Error', action.err.response.data.error, 'danger');
            }
            return nextState || state;
        case TOKEN:
            nextState = {
                ...state,
                token: action.token,
            };
            return nextState || state;
        default:
            return state
    }
}

export default defaultAuth
