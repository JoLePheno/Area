// Store/configureStore.js

import { createStore } from 'redux';
import service from './reducers/adminReducers'

export default createStore(service)