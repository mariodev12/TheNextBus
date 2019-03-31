import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native'
import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';
import GeolocationAPI from 'react-native-geolocation-service';

import { config } from '../helpers/config';

class Geolocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: {
                latitude: null,
                longitude: null
            },
            nearby: []
        }
    }
    
    componentDidMount() {
        GeolocationAPI.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
                const data = this.getInformationFromCoords(position.coords.latitude, position.coords.longitude)

                data.then((d) => {
                    const lines = this.resolveBus(d);
                    lines.then((l) => {
                        const arr = d.features.map((element, k) => {
                            return {
                                codi: element.properties.CODI,
                                name: element.properties.NOM,
                                metres: element.properties.DISTANCE_IN_METERS,
                                linias: l[k].features
                            }
                        })
                        this.setState({
                            nearby: arr
                        })
                    })
                })
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    resolveBus(parent) {
        const promises = parent.features.map(async item => {
            const response = await fetch(`https://api.tmb.cat/v1/transit/parades/${item.properties.CODI}/corresp?app_id=${config.appId}&app_key=${config.apiKey}&cql_filter=(ID_OPERADOR+IN+(1,3,4,5)+OR+(ID_OPERADOR+IN+(2)+AND+CODI_FAMILIA+IN+(1,3,5,6,7)))&sortBy=ID_OPERADOR,ORDRE_FAMILIA,CODI_LINIA&srsName=EPSG:3857`)
            return response.json()
        })
        return Promise.all(promises)
    }

    async getInformationFromCoords(lat, lon) {
        const response = await fetch(`https://api.tmb.cat/v1/maps/wfs?REQUEST=GetFeature&SERVICE=WFS&TYPENAME=ELEMENTS_SUPERFICIE&VERSION=1.1.0&app_id=${config.appId}&app_key=${config.apiKey}&cql_filter=(+(CODI_TIPUS%3D1)+OR+(CODI_TIPUS%3D2)+)&outputFormat=json&sortBy=DISTANCE_IN_METERS&srsName=EPSG:3857&viewparams=P_LON:${lon};P_LAT:${lat};P_DIST:200`)
        return response.json()
    }
    renderParadas(data) {
        return data.map((el, k) => {
            return (
                <View style={styles.parades}key={k}>
                    <Text style={styles.paradesName}>{el.name} ({el.codi})</Text>
                    <Text style={styles.metres}>{Math.round(el.metres)} metres</Text>
                    <View style={styles.containerLines}> 
                    {
                        el.linias.map((item, i) => {
                            console.log(item.properties.COLOR_TEXT_LINIA)
                            return (
                                <View style={[styles.lineBus, {
                                    backgroundColor: `#${item.properties.COLOR_LINIA}`
                                }]} key={i}>
                                    <Text style={{
                                        color: `#${item.properties.COLOR_TEXT_LINIA}`
                                    }}>{item.properties.NOM_LINIA}</Text>
                                </View>
                            )
                        })
                    }
                    </View>
                </View>
            )
        })
    }
    
    render() {
        console.log(this.state.nearby)
        return (
            <View style={styles.container}>
                <View>
                    {this.state.nearby.length > 0 ? this.renderParadas(this.state.nearby) : null}
                </View>
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
    },
    paradesName: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 5
    }
})

export default Geolocation;