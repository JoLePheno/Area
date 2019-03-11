import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class Item extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    _applySelected() {
        if (this.props.selected) {
            return (
                <View style={styles.itemSelectedContainer}>
                    <MaterialIcons name={'check'} size={100} style={styles.itemSelected}/>
                </View>
            )
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.item} onPress={this._onPress}>
                <View>
                    <Image
                        source={this.props.source}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text}>{this.props.name}</Text>
                {this._applySelected()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 5,
        height: Dimensions.get('window').width / 2,
    },
    itemNotSelected: {
        backgroundColor: 'transparent',
    },
    itemSelectedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
        height: '100%',
    },
    itemSelected: {
        color: '#228B22',
    },
    image: {
        width: Dimensions.get('window').width / 2 - 10,
        height: Dimensions.get('window').width / 2 - 25,
    },
    text: {
        backgroundColor: '#808080',
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        height: 25,
    }
});