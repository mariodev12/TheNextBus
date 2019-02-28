import React from 'react'
import { Navigation } from 'react-native-navigation'

import Linias from './Linias'
import Paradas from './components/Paradas'
import Time from './components/Time'

const registerScreens = () => {
  Navigation.registerComponent('Home', () => Linias)
  Navigation.registerComponent('Paradas', () => Paradas)
  Navigation.registerComponent('Time', () => Time)
}

export default registerScreens