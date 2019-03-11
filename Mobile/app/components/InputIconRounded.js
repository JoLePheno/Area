import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input} from "react-native-elements";
import PropTypes from 'prop-types';

export default class InputIconRounded extends Component {
    render() {
        return (
            <Input
                containerStyle={s.container}
                inputContainerStyle={s.inputContainer}
                inputStyle={s.input}
                leftIconContainerStyle={s.icon}
                leftIcon={
                    <Icon
                        name={this.props.iconName}
                        size={this.props.iconSize}
                        color={this.props.iconColor}
                    />
                }
                {...this.props}
            />
        )
    }
}

const s = StyleSheet.create({
    container: {
        width: 300,
        height: 40,
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    inputContainer: {
        borderColor: 'transparent',
    },
    input: {
        fontSize: 16,
        color: 'white',
    },
    icon: {
        marginRight: 10,
    }
});

InputIconRounded.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
};

InputIconRounded.defaultProps = {
    iconName: 'people',
    iconSize: 24,
    iconColor: 'white',
};