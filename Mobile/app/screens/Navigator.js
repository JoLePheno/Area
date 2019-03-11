import React from "react";
import {Image, StyleSheet} from "react-native";
import {createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {colors} from "../constants/Themes";
import Icon from 'react-native-vector-icons/MaterialIcons'

import Login from "./Login/Login";
import Register from "./Register/Register";
import AuthLoading from "./AuthLoading/AuthLoading";
import Admin from "./Admin/Admin";
import Applet from "./Applet/Applet"
import Select from "./Select/Select";

const styles = StyleSheet.create({
    icon: {
        width: 40,
        height: 40,
    }
});

const AuthStack = createAppContainer(createBottomTabNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Sign In',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../../assets/signInButton.png')}
                        style={[styles.icon, {tintColor}]}
                    />
                )
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: 'Sign Up',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../../assets/signUpButton.png')}
                        style={[styles.icon, {tintColor}]}
                    />
                )
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: true,
            activeTintColor: colors.secondary,
            inactiveTintColor: colors.white,
            indicatorStyle: {backgroundColor: colors.secondary},
            labelStyle: {
                fontSize: 16,
            },
            style: {
                height: 100,
                backgroundColor: colors.primary,
                borderTopWidth: 0,
                paddingBottom: 32
            },
        }
    }
));

const AppStack = createAppContainer(createMaterialBottomTabNavigator(
    {
        Applet: {
            screen: Applet,
            navigationOptions: {
                title: 'Applet',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="home" size={25} style={{color: tintColor}}/>
                )
            }
        },
        Select: {
            screen: Select,
            navigationOptions: {
                title: 'Services',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="view-comfy" size={25} style={{color: tintColor}}/>
                )
            }
        },
    },
    {
        initialRouteName: 'Select',
        inactiveColor: '#000000',
        activeTintColor: '#ffffff',
        barStyle: {
            backgroundColor: '#1E90FF',
        },
    }
));

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Admin: Admin,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
))