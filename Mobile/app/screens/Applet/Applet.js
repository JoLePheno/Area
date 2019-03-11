import React, {Component} from 'react';
import {AsyncStorage, SafeAreaView, View} from 'react-native';
import {connect} from 'react-redux';

import {Toolbar} from "../../components/Header";
import {ListItem} from "react-native-elements";

import {changeFromScreen} from "../../actions/Basic";

import {styles} from "./AppletStyles";
import {toggleApplet, updateApplets} from "../../actions/Area";
import {modifyToken} from "../../actions/Auth";
import axios from "axios";

class Applet extends Component {
    static navigationsOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            fromScreen: 'Applet',
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('token').then(res => {
            this.props.dispatchToken(res);
            axios.get(`http://${this.props.server}:3000/api/areas`, {
                headers: {'Authorization': `Bearer ${res}`}
            }).then(res => {
                if (res.data !== null) {
                    let newArray = this.props.applets.map((item) => {
                        let data = '';
                        res.data.forEach((applet) => {
                            if (item.name === applet.name) {
                                data = {
                                    ...item,
                                    id: applet.id,
                                    checked: true,
                                }
                            } else {
                                if (data === '') {
                                    data = item;
                                }
                            }
                        });
                        return data;
                    });
                    this.props.dispatchApplets(newArray);
                }
            }).catch(err => {

            });
        });
    }

    _navigateToAdmin() {
        const { fromScreen } = this.state;
        this.props.dispatchChangeFromScreen(fromScreen);
    }

    _isServiceActive(applet) {
        let isActivated = false;
        this.props.services.forEach((item) => {
            if (applet.service === item.id) {
                isActivated = item.activate;
            }
        });
        return isActivated;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Toolbar navigation={this.props.navigation} navigateFrom={this._navigateToAdmin.bind(this)}/>
                <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    {
                        this.props.applets.filter((item) => this._isServiceActive(item)).map((a, i) => (
                            <ListItem style={styles.item}
                                      key={i}
                                      leftAvatar={{source: a.url}}
                                      title={a.action}
                                      subtitle={a.reaction}
                                      onPress={() => this.props.dispatchToggleApplet(i, this.props)}
                                      checkmark={a.checked}
                            />
                        ))
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        server: state.basic.server,
        fromScreen: state.basic.fromScreen,
        services: state.area.services,
        applets: state.area.applets,
     }
};

const mapDispatchToProps = {
    dispatchChangeFromScreen: (screen) => changeFromScreen(screen),
    dispatchToggleApplet: (index, props) => toggleApplet(index, props),
    dispatchApplets: (applets) => updateApplets(applets),
    dispatchToken: (token) => modifyToken(token),
};

export default connect(mapStateToProps, mapDispatchToProps)(Applet);