import { 
    View,
    Text,
    StyleSheet
} from 'react-native'
import React, { Component } from 'react';

import GeolocationAPI from 'react-native-geolocation-service';

class Geolocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: {
                latitude: null,
                longitude: null
            }
        }
    }
    
    componentWillMount() {
        GeolocationAPI.getCurrentPosition(
            (position) => {
                this.setState({
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Latitude: {this.state.coords.latitude}
                </Text>
                <Text>
                    Longitude: {this.state.coords.longitude}
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Geolocation;