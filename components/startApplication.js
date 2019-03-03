import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Linias from './Linias';

import Loader from 'react-native-mask-loader';

import { Navigation } from 'react-native-navigation';
import { goHome } from '../helpers/navigation';

export default class startApplication extends Component {
    static options(passProps) {
        return {
            topBar: {
                visible: false,
                animate: false
            }
        };
    }
    state = {
        appReady: false,
        rootKey: Math.random(),
    };

    constructor() {
        super();

        this._image = require('../assets/twitter.png');
    }

    componentDidMount() {
        this.resetAnimation();
    }

    resetAnimation() {
        this.setState({
            appReady: false,
            rootKey: Math.random()
        });

        setTimeout(() => {
            this.setState({
                appReady: true,
            });
        }, 1000);
    }

    render() {
        console.log(this.props)
        return (
            <View key={this.state.rootKey} style={styles.root}>
                <Loader
                    isLoaded={this.state.appReady}
                    imageSource={this._image}
                    backgroundStyle={styles.loadingBackgroundStyle}
                >
                    <Linias {...this.props} />
                </Loader>
            </View>
            );
        }
    }

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    loadingBackgroundStyle: {
        backgroundColor: 'rgba(125, 125, 255, 1)',
    },
});