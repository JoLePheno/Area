import {CHANGE_FROM_SCREEN, SERVER_IP} from "../../constants/BasicActionTypes";
import {AsyncStorage} from 'react-native';

const initialState = {
    fromScreen: '',
    server: '192.168.1.97',
};

function defaultBasic(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case CHANGE_FROM_SCREEN:
            nextState = {
                ...state,
                fromScreen: action.fromScreen,
            };
            return nextState || state;
        case SERVER_IP:
            AsyncStorage.setItem('server', action.ip);
            nextState = {
                ...state,
                server: action.ip,
            };
            return nextState || state;
        default:
            return state;
    }
}

export default defaultBasic