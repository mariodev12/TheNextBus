import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View, Picker, TouchableHighlight, ScrollView, RefreshControl} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { config } from '../helpers/config';

import Icon from 'react-native-vector-icons/FontAwesome5';

class Time extends Component {
    static options(passProps) {
        return {
            topBar: {
                visible: false,
                animate: false
            }
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: [],
            refreshing: false
        }
    }
    
    componentDidMount() {  
        const idLinia = this.props.id.split(' / ')[0];
        const idParada = this.props.id.split(' / ')[1]    
        fetch(`https://api.tmb.cat/v1/ibus/lines/${idLinia}/stops/${idParada}?app_id=${config.appId}&app_key=${config.apiKey}`)
            .then(data => data.json())
            .then((bus) => {
                this.setState({
                    timeLeft: bus.data.ibus
                })
            })
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        // In actual case set refreshing to false when whatever is being refreshed is done!
        const idLinia = this.props.id.split(' / ')[0];
        const idParada = this.props.id.split(' / ')[1]    
        fetch(`https://api.tmb.cat/v1/ibus/lines/${idLinia}/stops/${idParada}?app_id=${config.appId}&app_key=${config.apiKey}`)
            .then(data => data.json())
            .then((bus) => {
                this.setState({
                    timeLeft: bus.data.ibus,
                    refreshing: false
                })
            })
    };
    
    render() {
        const { timeLeft } = this.state;
        console.log(timeLeft)
        const parada = this.props.id.split(' / ')[2]
        return (
            <View style={styles.container}>
                { timeLeft.length > 0 ? (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                                title="Pull to refresh"
                            />
                        }
                        contentContainerStyle={styles.scrollView}
                    >
                        <Text style={styles.parada}>{parada}</Text>
                        <Text style={styles.time}>{timeLeft[0]["text-ca"]}</Text>
                        <TouchableHighlight
                            onPress={() => {
                                Navigation.pop(this.props.componentId);
                            }}
                        >
                            <Text>
                                <Icon name="arrow-alt-circle-left" size={30} color="#fff" />
                            </Text>
                        </TouchableHighlight>
                    </ScrollView>
                ) : <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                                title="Pull to refresh"
                            />
                        }
                        contentContainerStyle={styles.scrollView}
                    >
                        <Text style={styles.senseInfo}>Sense informació</Text>
                        <TouchableHighlight
                            onPress={() => {
                                Navigation.pop(this.props.componentId);
                            }}
                        >
                            <Text>
                                <Icon name="arrow-alt-circle-left" size={50} color="#fff" />
                            </Text>
                        </TouchableHighlight>
                    </ScrollView>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2125',
    },
    scrollView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },  
    time: {
        fontSize: 80,
        color: 'white'
    },
    parada: {
        fontSize: 20,
        color: 'white'
    },
    senseInfo: {
        fontSize: 50,
        color: 'white',
        textAlign: 'center'
    }
})

export default Time;