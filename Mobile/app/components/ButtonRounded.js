import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class ButtonRounded extends Component {
    _applyButtonStyles() {
        if (this.props.large)
            return s.largeButton;
        else if (this.props.medium)
            return s.mediumButton;
        else
            return s.smallButton;
    }

    _applyTextStyles() {
        if (this.props.large)
            return s.largeText;
        else if (this.props.medium)
            return s.mediumText;
        else
            return s.smallText;
    }

    render() {
        return (
            <TouchableOpacity style={[s.commonButton, this._applyButtonStyles(), this.props.touchableStyle]} {...this.props}>
                <Text style={[s.commonText, this._applyTextStyles(), this.props.textStyle]}>{this.props.value}</Text>
            </TouchableOpacity>
        );
    }
}

const s = StyleSheet.create({
    commonButton: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
    },
    smallButton: {
        padding: 8,
     },
    mediumButton: {
        padding: 10,
    },
    largeButton: {
        padding: 12,
    },
    commonText: {
        fontWeight: '500',
        textAlign: 'center'
    },
    smallText: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 14,
    },
    largeText: {
        fontSize: 16,
    },
});

ButtonRounded.propTypes = {
    value: PropTypes.string.isRequired,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    touchableStyle: PropTypes.any,
    textStyle: PropTypes.any,
};

ButtonRounded.defaultProps = {
    value: 'Value',
    small: false,
    medium: false,
    large: false,
};