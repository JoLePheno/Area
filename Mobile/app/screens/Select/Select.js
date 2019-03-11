import React, {Component} from 'react';
import {View, SafeAreaView, FlatList, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';

import {Toolbar} from "../../components/Header";
import Item from "./Item/Item";

import {styles, commonStyles} from "./SelectStyles";
import {changeFromScreen} from "../../actions/Basic";
import {toggleService, updateServices} from "../../actions/Area";
import {modifyToken} from "../../actions/Auth";

class Select extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            fromScreen: 'Select',
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('token').then(res => {
            this.props.dispatchToken(res);
            axios.get(`http://${this.props.server}:3000/api/services`, {
                headers: {'Authorization': `Bearer ${res}`}
            }).then(res => {
                if (res.data !== null) {
                    let newArray = this.props.services.map((item) => {
                        let data = '';
                        res.data.forEach((service) => {
                            if (item.id === service.name) {
                                data = {
                                    ...item,
                                    uuid: service.id,
                                    activate: true,
                                }
                            } else {
                                if (data === '') {
                                    data = item;
                                }
                            }
                        });
                        return data;
                    });
                    this.props.dispatchServices(newArray);
                }
            }).catch(err => {

            });
        });
    }

    _navigateToAdmin() {
        const {fromScreen} = this.state;
        this.props.dispatchChangeFromScreen(fromScreen);
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        this.props.dispatchToggleService(id, this.props);
    };

    _renderItem = ({item, index}) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]}/>
        }
        return (
            <Item
                id={item.id}
                index={index}
                name={item.name}
                source={item.url}
                onPressItem={this._onPressItem}
                selected={item.activate}
            />
        )
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Toolbar navigation={this.props.navigation} navigateFrom={this._navigateToAdmin.bind(this)}/>
                <FlatList
                    style={styles.itemContainer}
                    data={this.props.services}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    numColumns={2}
                />
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
    }
};

const mapDispatchToProps = {
    dispatchChangeFromScreen: (screen) => changeFromScreen(screen),
    dispatchToggleService: (services, props) => toggleService(services, props),
    dispatchServices: (service) => updateServices(service),
    dispatchToken: (token) => modifyToken(token),
};

export default connect(mapStateToProps, mapDispatchToProps)(Select)