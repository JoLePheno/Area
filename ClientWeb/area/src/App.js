import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import Store from './store/configureStore'


import DashBoard from './dashboard/Dashboard';
import Introduction from './dashboard/Introduction';
import Register from "./login/Register"
import Login from "./login/Login"
import Admin from "./admin/Admin"

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={Store}>
                    <Router basename="/">
                        <div>
                            <Route exact path="/" component={Login}>
                            </Route>
                            <Route exact path="/dashboard" component={DashBoard}>
                            </Route>
                            <Route exact path="/register" component={Register}>
                            </Route>
                            <Route exact path="/login" component={Login}>
                            </Route>
                            <Route exact path="/admin" component={Admin}>
                            </Route>
                            <Route exact path="/introduction" component={Introduction}>
                            </Route>
                        </div>
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;
