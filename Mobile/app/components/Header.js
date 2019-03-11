import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Header, Icon} from "react-native-elements";
import PropTypes from 'prop-types';

export class ToolbarRightComponent extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Admin');
                this.props.navigateFrom();
            }}>
                <Icon name={'settings'} color={'#ffffff'}/>
            </TouchableOpacity>
        )
    }
}

export class Toolbar extends Component {
    render() {
        return (
            <Header containerStyle={styles.headerStyle}
                    placement="left"
                    centerComponent={{text: 'AREA', style: styles.headerText}}
                    rightComponent={<ToolbarRightComponent
                        navigation={this.props.navigation}
                        navigateFrom={this.props.navigateFrom}/>}
            />
        );
    }
}

export class AdminRightComponent extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate(this.props.fromScreen);
            }}>
                <Icon name={'close'} color={'#fff'}/>
            </TouchableOpacity>
        )
    }
}

export class AdminHeader extends Component {
    render() {
        return (
            <Header containerStyle={styles.headerStyle}
                    placement="left"
                    centerComponent={{text: 'AREA - Manage Users', style: styles.headerText}}
                    rightComponent={<AdminRightComponent navigation={this.props.navigation} fromScreen={this.props.fromScreen}/>}
            />
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#1E90FF',
        borderBottomWidth: 0,
    },
    headerText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

Toolbar.propTypes = {
    navigateFrom: PropTypes.func.isRequired,
};

