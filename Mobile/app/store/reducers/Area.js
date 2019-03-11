import {
    TOGGLE_APPLET,
    TOGGLE_SERVICE,
    UPDATE_SERVICES,
    ENABLE_ONE_SERVICE,
    DISABLE_ONE_SERVICE, UPDATE_APPLETS
} from "../../constants/AreaActionTypes";

const ServicesLogo = {
    google: require('../../../assets/google.jpg'),
    facebook: require('../../../assets/facebook.png'),
    spotify: require('../../../assets/spotify.png'),
    steam: require('../../../assets/steam.png'),
    lol: require('../../../assets/lol.png'),
    bpi: require('../../../assets/bitcoin.jpg'),
    reddit: require('../../../assets/reddit.png'),
    weather: require('../../../assets/weather.png'),
};

const initialState = {
    services: [
        {id: 'steam', name: 'Steam', uuid: '', activate: false, url: ServicesLogo.steam},
        {id: 'lol', name: 'League of Legend', uuid: '', activate: false, url: ServicesLogo.lol},
        {id: 'reddit', name: 'Reddit', uuid: '', activate: false, url: ServicesLogo.reddit},
        {id: 'weather', name: 'Weather', uuid: '', activate: false, url: ServicesLogo.weather},
    ],
    applets: [
        {service: 'lol', name: 'ChampionsRotation', action: 'New champion rotation', reaction: 'Notify by e-mail', id: '', checked: false, url: ServicesLogo.lol},
        {service: 'lol', name: 'NewChampion', action: 'New champion released', reaction: 'Notify by e-mail', id: '', checked: false, url: ServicesLogo.lol},
        {service: 'steam', name: 'SteamSales', action: 'New price for steam game', reaction: 'Notify by e-mail', id: '', checked: false, url: ServicesLogo.steam},
        {service: 'reddit', name: 'FreeGamesOnSteam', action: 'New free steam game', reaction: 'Notify by e-mail', id: '', checked: false, url: ServicesLogo.reddit},
        {service: 'reddit', name: 'FollowSubReddit', action: 'New subject on a specific subreddit', reaction: 'Notify by e-mail', id: '', checked: false, url: ServicesLogo.reddit},
    ],
};

function defaultArea(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case TOGGLE_APPLET:
            nextState = {
                ...state,
                applets: action.applets
            };
            return nextState || state;
        case TOGGLE_SERVICE:
            nextState = {
                ...state,
                services: action.services,
            };
            return nextState || state;
        case UPDATE_SERVICES:
            nextState = {
                ...state,
                services: action.services,
            };
            return nextState || state;
        case UPDATE_APPLETS:
            nextState = {
                ...state,
                applets: action.applets,
            };
            return nextState || state;
        default:
            return state;
    }
}

export default defaultArea