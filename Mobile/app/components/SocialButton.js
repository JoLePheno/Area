import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Image} from "react-native-elements";
import PropTypes from 'prop-types';

const Social = {
    google: require('../../assets/google_rounded.png'),
    facebook: require('../../assets/facebook_rounded.png')
};

export default class SocialButton extends Component {
    _loadSocialIcon() {
        if (this.props.google)
            return Social.google;
        else
            return Social.facebook
    }

    render() {
        return (
            <TouchableOpacity {...this.props}>
                <Image style={styles.icon} {...this.props} source={this._loadSocialIcon()}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
   icon: {
       borderRadius: 25,
       width: 50,
       height: 50,
       marginLeft: 10,
       marginRight: 10,
   }
});

SocialButton.propTypes = {
    google: PropTypes.bool,
    facebook: PropTypes.bool,
};

SocialButton.defaultProps = {
    google: false,
    facebook: false,
};