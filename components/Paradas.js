import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View, Picker, TouchableHighlight} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { config } from '../helpers/config';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Paradas extends Component {
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
      parada: null,
      text: null,
      direction: 'Tornada'
    }

  }

  componentDidMount() {
    const { direction } = this.state;
    fetch(`https://api.tmb.cat/v1/transit/linies/bus/${this.props.id}/trajectes/parades?app_id=${config.appId}&app_key=${config.apiKey}&cql_filter=(TIPUS_PAQUET+IN+(1)+AND+ID_SENTIT+IN+(${direction == 'Anada' ? 1 : 2}))&sortBy=ORDRE`)
        .then(data => data.json())
        .then((paradas) => {
            console.log(paradas.features[0])
            this.setState({
              paradas: paradas.features,
              text: paradas.features[0].properties.ORIGEN_TRAJECTE + " / " + paradas.features[0].properties.DESTI_TRAJECTE,
              language:`${paradas.features[0].properties.CODI_LINIA} / ${paradas.features[0].properties.CODI_PARADA} / ${paradas.features[0].properties.NOM_PARADA}`
            })
        })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.direction != this.state.direction) {
        console.log('componentDidUpdate')
        const { direction } = this.state;
        fetch(`https://api.tmb.cat/v1/transit/linies/bus/${this.props.id}/trajectes/parades?app_id=${config.appId}&app_key=${config.apiKey}&cql_filter=(TIPUS_PAQUET+IN+(1)+AND+ID_SENTIT+IN+(${direction == 'Anada' ? 1 : 2}))&sortBy=ORDRE`)
            .then(data => data.json())
            .then((paradas) => {
                console.log(paradas.features[0])
                this.setState({
                    paradas: paradas.features,
                    text: paradas.features[0].properties.ORIGEN_TRAJECTE + " / " + paradas.features[0].properties.DESTI_TRAJECTE,
                    language:`${paradas.features[0].properties.CODI_LINIA} / ${paradas.features[0].properties.CODI_PARADA} / ${paradas.features[0].properties.NOM_PARADA}`
                })
            })    
    }
  }
  
  render() {
    const { paradas, text } = this.state;
    console.log(text)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Escull la parada de Bus</Text>
         <TouchableHighlight
            onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: 'Time',
                  passProps: {
                    id: this.state.language
                  },
                }
              });
            }}
          >
            <Text style={styles.confirm}>Confirmar</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          {paradas && (
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 25}}>{this.state.text}</Text>
            <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: Dimensions.get('window').width - 30}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                }
            >
              {this.state.paradas.map((item, k) => {return <Picker.Item size={20} color="#fff" value={`${item.properties.CODI_LINIA} / ${item.properties.CODI_PARADA} / ${item.properties.NOM_PARADA}`} label={item.properties.NOM_PARADA} key={k}  /> })}
            </Picker>
          </View>
          )}
        </View>
        <View style={styles.buttonChange}>
            <TouchableHighlight
            onPress={() => 
                this.setState({
                    direction: this.state.direction == 'Tornada' ? 'Anada' : 'Tornada'
                })
            }
          >
            <Text style={styles.directionButton}>
              <Icon name="sync" size={30} color="#fff" />
              {this.state.direction}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
              onPress={() => {
                  Navigation.pop(this.props.componentId);
              }}
          >
              <Text>
                <Icon name="arrow-alt-circle-left" size={30} color="#fff" />
              </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingRight: 15,
    paddingLeft: 15,
    flex: 1,
    backgroundColor: '#1f2125',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
     color: '#2991d8',
     fontSize: 20
  },
  confirm: {
    color: 'white',
    fontSize: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonChange: {
      flex: .5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  directionButton: {
      fontSize: 30,
      color: '#fff'
  }
});
