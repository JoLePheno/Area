import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './app/screens/Navigator';
import Store from './app/store/Store';
import FlashMessage from "react-native-flash-message";
import {ThemeProvider} from "react-native-elements";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <ThemeProvider>
                    <Navigation/>
                    <FlashMessage position={'top'}/>
                </ThemeProvider>
            </Provider>
        );
    }
}