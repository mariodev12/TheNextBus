import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView
} from 'react-native'
import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';

import { config } from '../helpers/config';

const _ = require('lodash');

class ParadaBus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bus: []
        }
    }
    
    componentDidMount() {
        const { id } = this.props
        fetch(`https://api.tmb.cat/v1/ibus/stops/${id}?app_id=${config.appId}&app_key=${config.apiKey}&numberOfPredictions=2`)
            .then(data => data.json())
            .then((bus) => {
                const arr = bus.data.ibus
                this.setState({
                    bus: arr
                })
            })
    }

    renderParadas(data) {
        return data.map((el, k) => {
            return (
                <View style={styles.parades}key={k}>
                    <Text>{el.line}</Text>
                    <Text style={styles.paradesName}>{el['text-ca']}</Text>
                    <Text>{el.destination}</Text>
                </View>
            )
        })
    }
    
    render() {
        console.log(this.state.nearby)
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.bus.length > 0 ? this.renderParadas(this.state.bus) : null}
                </ScrollView>
                <TouchableHighlight 
                    style={styles.buttonDismiss}
                    onPress={() => Navigation.dismissModal(this.props.componentId)}>
                    <Text style={styles.buttonTextDismiss}>Dismiss</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonDismiss: {
        padding: 20,
        backgroundColor: '#5564B9',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextDismiss: {
        fontSize: 20,
        color: 'white'
    },
    containerLines: {
        flexDirection: 'row'
    },
    lineBus: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    parades: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paradesName: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 5
    }
})

export default ParadaBus;