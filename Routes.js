import React from 'react'
import { Navigation } from 'react-native-navigation'

import Linias from './components/Linias'
import Paradas from './components/Paradas'
import Time from './components/Time'
import StartPoint from './components/startApplication'

const registerScreens = () => {
  Navigation.registerComponent('Home', () => StartPoint)
  Navigation.registerComponent('Linias', () => Linias)
  Navigation.registerComponent('Paradas', () => Paradas)
  Navigation.registerComponent('Time', () => Time)
}

export default registerScreens