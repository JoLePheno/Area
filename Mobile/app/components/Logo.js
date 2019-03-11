import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class Logo extends Component {
    render() {
      return (
          <Image {...this.props} source={require('../../assets/logo_area.png')}/>
      );
    }
  }