import {CHANGE_FROM_SCREEN, SERVER_IP} from "../constants/BasicActionTypes";

function changeFromPreviousScreen(screen) {
    return {
        type: CHANGE_FROM_SCREEN,
        fromScreen: screen
    }
}

export function changeFromScreen(screen) {
    return (dispatch) => {
        dispatch(changeFromPreviousScreen(screen));
    }
}

function modifyServerIp(ip) {
    return {
        type: SERVER_IP,
        ip: ip,
    }
}

export function changeServerIp(ip) {
    return (dispatch) => {
        dispatch(modifyServerIp(ip))
    }
}