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

import { config } from '../helpers/config';

import { Navigation } from 'react-native-navigation';

export default class LiniasPicker extends Component {
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
      linea: null
    }
  }

  componentDidMount() {
    this._isMounted = true;
    fetch(`https://api.tmb.cat/v1/transit/linies/bus/?app_id=${config.appId}&app_key=${config.apiKey}&cql_filter=(CODI_FAMILIA+IN+(1,3,5,6,7))&propertyName=CODI_LINIA,ID_LINIA,NOM_LINIA,DESC_LINIA,ORIGEN_LINIA,DESTI_LINIA,NOM_TIPUS_TRANSPORT,ORDRE_FAMILIA,COLOR_LINIA,COLOR_TEXT_LINIA,ID_OPERADOR`)
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
  
  render() {
    const { linea } = this.state;
    return (
      <View style={styles.container}>
        {linea && (
            <View style={styles.container}>
            <TouchableHighlight
        onPress={() => {
            Navigation.push(this.props.componentId, {
            component: {
                name: 'Paradas',
                passProps: {
                id: this.state.language
                },
            }
            });
            
        }}
        >
        <Text style={styles.confirm}>Confirmar</Text>
        </TouchableHighlight>
          <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
            {this.state.linea.map((item, k) => {return <Picker.Item size={20} color="#000" value={item.properties.CODI_LINIA} label={item.properties.NOM_LINIA} key={k}  /> })}
          </Picker>
          <TouchableHighlight 
            style={styles.buttonDismiss}
                onPress={() => Navigation.pop(this.props.componentId)}>
                <Text style={styles.buttonTextDismiss}>Back</Text>
          </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
        color: 'white'
    },
  title: {
     color: '#fff',
     fontWeight: 'bold',
     fontSize: 30
  },
  confirm: {
    color: 'black',
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
