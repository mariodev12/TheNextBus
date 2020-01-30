/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Picker, TouchableHighlight} from 'react-native';

import { appId, appKey } from '../helpers/config';

import { Navigation } from 'react-native-navigation';
import Slider from '@react-native-community/slider';

export default class App extends Component {
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
      language: null,
      linea: null,
      km: 200
    }
  }

  componentDidMount() {
    this._isMounted = true;
    fetch(`https://api.tmb.cat/v1/transit/linies/bus/?app_id=${appId}&app_key=${appKey}&cql_filter=(CODI_FAMILIA+IN+(1,3,5,6,7))&propertyName=CODI_LINIA,ID_LINIA,NOM_LINIA,DESC_LINIA,ORIGEN_LINIA,DESTI_LINIA,NOM_TIPUS_TRANSPORT,ORDRE_FAMILIA,COLOR_LINIA,COLOR_TEXT_LINIA,ID_OPERADOR`)
        .then(data => data.json())
        .then((bus) => {
            if(this._isMounted) {
              console.log(bus)
              this.setState({
                linea: bus.features,
                language: bus.features[0].properties.CODI_LINIA
              })
            }
        })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderIcons = () => {
    return this.state.linea.map((item, k) => {
      return (
        <View key={k} style={{
            backgroundColor: `#${item.properties.COLOR_LINIA}`,
            width: 50,
            height: 50,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: `#${item.properties.COLOR_TEXT_LINIA}`}}>{item.properties.CODI_LINIA}</Text>
        </View>
      )
    })
  }
  
  render() {
    const { linea } = this.state;
    return (
      <View style={styles.container}>
        <View style={
          {
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: '#414C84',
            borderBottomLeftRadius: 60,
          }
          }>
           <View style={styles.header}>
          <Text style={styles.title}>Escull la linia de Bus</Text>
        </View>
        </View>
        <View style={styles.searchNearbyBus}>
        <TouchableHighlight
            style={styles.nearbyText}
            onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: 'LiniasPicker',
                  passProps: {
                    id: this.state.language
                  },
                }
              });
            }}
          >
            <Text style={styles.buttonText}>Buscar bus</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.nearbyText}
            onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: 'Geolocation',
                  passProps: {
                    id: this.state.language,
                    km: this.state.km
                  },
                  options: {
                      topBar: {
                          title: {
                              text: `A ${this.state.km} metres`
                          }
                      }
                  }
                }
              });
            }}
          >
            <Text style={styles.buttonText}>Trobar parades</Text>
          </TouchableHighlight>
          <Text>Distancia: {this.state.km} metres</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={200}
            maximumValue={1000}
            onValueChange={ (e) => this.setState({km: Math.round(e)})}
            minimumTrackTintColor="black"
            maximumTrackTintColor="black"
            thumbTintColor="#5564B9"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
     color: '#fff',
     fontWeight: 'bold',
     fontSize: 30
  },
  confirm: {
    color: 'white',
    fontSize: 12,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  searchNearbyBus: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nearbyText: {
    padding: 20,
    backgroundColor: '#5564B9',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  
});
