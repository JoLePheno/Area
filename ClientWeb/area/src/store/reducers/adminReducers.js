// Store/Reducers/favoriteReducer.js

import {nextTick} from "q";

const initialState = {
    services: [],
    servicesToString: "",
    switchValue: {
        facebookApplets1: false,
        facebookApplets2: false,
        spotifyApplets1: false,
        spotifyApplets2: false,
        spotifyApplets3: false,
        spotifyApplets4: false,
        spotifyApplets5: false,
        spotifyApplets6: false,
        twitterApplets1: false,
        steamApplets1: false,
        steamApplets2: false,
        lolApplets1: false,
        lolApplets2: false,
        meteoApplets1: false,
        meteoApplets2: false,
        meteoApplets3: false,
        redditApplets1: false,
        bpiApplets1: false
    },
    paramValue: {meteoCity: ""},
    isAdmin: false,
    myToken: "",
    myId: "",
    myAccessToken: "",
    createSpotify: false,
    createLol: false,
    createReddit: false,
    createMeteo: false,
    createSteam: false,
    createBpi: false,
    AppletsSteam1Id: "",
    AppletsSteam2Id: "",
    AppletsLol1Id: "",
    AppletsLol2Id: "",
    AppletsBpi1Id: "",
    AppletsReddit1Id: "",
    AppletsMeteo1Id: "",
    AppletsMeteo2Id: "",
    AppletsMeteo3Id: "",
    AppletsSpotify1Id: "",
    AppletsSpotify2Id: "",
    AppletsSpotify3Id: "",
    AppletsSpotify4Id: "",
    AppletsSpotify5Id: "",
    AppletsSpotify6Id: "",
}

function service(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_SERVICE':
            for (var i = 0; i < state.services.length; i++) {
                if (action.value.localeCompare(state.services[i]) === 0) {
                    nextState = {
                        ...state,
                        services: [...state.services.slice(0, i),
                            ...state.services.slice(i + 1)],
                    }
                    return nextState;
                }
            }
            nextState = {
                ...state,
                services: [...state.services, action.value]
            }
            return nextState
        case 'AFF_SERVICES':
            nextState = {
                ...state,
                servicesToString: [...state.services.toString()]
            }
            return nextState
        case 'METEO_CITY': {
            nextState = {
                ...state,
                meteoCity: {meteoCity: action.value}
            }
        }
            return nextState
        case 'SET_ID': {
            nextState = {
                ...state,
                myId: action.value,
            }
        }
            return nextState
        case 'CREATE_SPOTIFY': {
            nextState = {
                ...state,
                createSpotify: {createSpotify: action.value}
            }
        }
            return nextState
        case 'CREATE_LOL': {
            nextState = {
                ...state,
                createLol: {createLol: action.value}
            }
        }
            return nextState
        case 'CREATE_STEAM': {
            nextState = {
                ...state,
                createSteam: {createSteam: action.value}
            }
        }
            return nextState
        case 'CREATE_REDDIT': {
            nextState = {
                ...state,
                createReddit: {createReddit: action.value}
            }
        }
            return nextState
        case 'CREATE_METEO': {
            nextState = {
                ...state,
                createMeteo: {createMeteo: action.value}
            }
        }
            return nextState
        case 'CREATE_BPI': {
            nextState = {
                ...state,
                createBpi: action.value
            }
        }
            return nextState
        case 'APPLETS':
            if (action.value.localeCompare("facebookApplets1") === 0) {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: !state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1, steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("facebookApplets2") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: !state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("spotifyApplets1") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: !state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("spotifyApplets2") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: !state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("spotifyApplets3") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: !state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("spotifyApplets4") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: !state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("spotifyApplets5") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: !state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("spotifyApplets6") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: !state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1, lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("steamApplets1") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: !state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("lolApplets1") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: !state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("lolApplets2") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: !state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("steamApplets1") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: !state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("steamApplets2") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: !state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("meteoApplets1") === 0)
            {
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: !state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("redditApplets1") === 0)
            {
                console.log("ICI")
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: !state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("bpiApplets1") === 0)
            {
                console.log("ICI")
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: !state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("meteoApplets1") === 0)
            {
                console.log("ICI")
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: !state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("meteoApplets2") === 0)
            {
                console.log("ICI")
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: !state.switchValue.meteoApplets2,
                        meteoApplets3: state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            else if (action.value.localeCompare("meteoApplets3") === 0)
            {
                console.log("ICI")
                nextState = {
                    ...state,
                    switchValue: {facebookApplets1: state.switchValue.facebookApplets1, facebookApplets2: state.switchValue.facebookApplets2,
                        spotifyApplets1: state.switchValue.spotifyApplets1, spotifyApplets2: state.switchValue.spotifyApplets2,
                        spotifyApplets3: state.switchValue.spotifyApplets3, spotifyApplets4: state.switchValue.spotifyApplets4,
                        spotifyApplets5: state.switchValue.spotifyApplets5, spotifyApplets6: state.switchValue.spotifyApplets6,
                        twitterApplets1: state.switchValue.twitterApplets1,
                        steamApplets1: state.switchValue.steamApplets1,
                        steamApplets2: state.switchValue.steamApplets2,
                        lolApplets1: state.switchValue.lolApplets1,
                        lolApplets2: state.switchValue.lolApplets2,
                        meteoApplets1: state.switchValue.meteoApplets1,
                        meteoApplets2: state.switchValue.meteoApplets2,
                        meteoApplets3: !state.switchValue.meteoApplets3,
                        redditApplets1: state.switchValue.redditApplets1,
                        bpiApplets1: state.switchValue.bpiApplets1
                    }
                }
            }
            return nextState
        case 'IS_ADMIN':
            nextState = {
                ...state,
                isAdmin: true,
            }
            return nextState
        case 'SET_TOKEN':
            nextState = {
                ...state,
                myToken: action.value,
            }
            return nextState
        case 'SET_ACCESS_TOKEN':
            nextState = {
                ...state,
                myAccessToken: action.value,
            }
            return nextState
        case 'STEAM':
            nextState = {
                ...state,
                AppletsSteam1Id: action.value,
            }
            return nextState
        case 'STEAM2':
            nextState = {
                ...state,
                AppletsSteam2Id: action.value,
            }
            return nextState
        case 'LOL':
            nextState = {
                ...state,
                AppletsLol1Id: action.value,
            }
            return nextState
        case 'LOL2':
            nextState = {
                ...state,
                AppletsLol2Id: action.value,
            }
            return nextState
        case 'METEO':
            nextState = {
                ...state,
                AppletsMeteo1Id: action.value,
            }
            return nextState
        case 'METEO2':
            nextState = {
                ...state,
                AppletsMeteo2Id: action.value,
            }
            return nextState
        case 'METEO3':
            nextState = {
                ...state,
                AppletsMeteo3Id: action.value,
            }
            return nextState
        case 'BPI':
            nextState = {
                ...state,
                AppletsBpiId: action.value,
            }
            return nextState
        case 'REDDIT':
            console.log("je suis ici c'est bon")
            nextState = {
                ...state,
                AppletsReddit1Id: action.value,
            }
            return nextState
        case 'SPOTIFY1':
            nextState = {
                ...state,
                AppletsSpotify1Id: action.value,
            }
            return nextState
        case 'SPOTIFY2':
            nextState = {
                ...state,
                AppletsSpotify2Id: action.value,
            }
            return nextState
        case 'SPOTIFY3':
            nextState = {
                ...state,
                AppletsSpotify3Id: action.value,
            }
            return nextState
        case 'SPOTIFY4':
            nextState = {
                ...state,
                AppletsSpotify4Id: action.value,
            }
            return nextState
        case 'SPOTIFY5':
            nextState = {
                ...state,
                AppletsSpotify5Id: action.value,
            }
            return nextState
        case 'SPOTIFY6':
            nextState = {
                ...state,
                AppletsSpotify6Id: action.value,
            }
            return nextState
        default:
            return state
    }
}

export default service
