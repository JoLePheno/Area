import {combineReducers, applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import basicReducers from './reducers/Basic';
import authReducers from './reducers/Auth';
import areaReducers from './reducers/Area';

export default createStore(combineReducers({
    auth: authReducers,
    basic: basicReducers,
    area: areaReducers,
}), applyMiddleware(thunk));