import React, {Component} from 'react';
import {SafeAreaView, View} from 'react-native';
import {connect} from 'react-redux';

import {ListItem} from 'react-native-elements'
import {AdminHeader} from "../../components/Header";
import InputIconRounded from "../../components/InputIconRounded";

import {changeServerIp} from "../../actions/Basic";

import {styles, commonStyles} from "./AdminStyles";

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
];

export class Admin extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AdminHeader navigation={this.props.navigation} fromScreen={this.props.fromScreen}/>
                <InputIconRounded placeholder="Server IP"
                                  placeholderTextColor="#cccccc"
                                  iconName='router'
                                  value={this.props.server}
                                  onChangeText={(text) => this.props.dispatchChangeServerIp(text)}/>
                <View style={styles.admin}>
                    {
                        list.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{source: {uri: l.avatar_url}}}
                                rightIcon={{name: 'close', color: '#000000'}}
                                title={l.name}
                                subtitle={l.subtitle}
                            />
                        ))
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = {
    dispatchChangeServerIp: (ip) => changeServerIp(ip),
};

const mapStateToProps = (state) => {
    return {
        server: state.basic.server,
        fromScreen: state.basic.fromScreen,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin)