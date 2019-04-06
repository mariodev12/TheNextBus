import React from 'react'
import { Navigation } from 'react-native-navigation'

import Linias from './components/Linias'
import Paradas from './components/Paradas'
import Time from './components/Time'
import Geolocation from './components/Geolocation'
import StartPoint from './components/startApplication'
import ParadaBus from './components/ParadaBus'
import LiniasPicker from './components/LiniasPicker'

const registerScreens = () => {
  Navigation.registerComponent('Home', () => StartPoint)
  Navigation.registerComponent('Linias', () => Linias)
  Navigation.registerComponent('Paradas', () => Paradas)
  Navigation.registerComponent('Time', () => Time)
  Navigation.registerComponent('Geolocation', () => Geolocation)
  Navigation.registerComponent('ParadaBus', () => ParadaBus)
  Navigation.registerComponent('LiniasPicker', () => LiniasPicker)
}

export default registerScreens