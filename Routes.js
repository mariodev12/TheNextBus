import React from 'react'
import { Navigation } from 'react-native-navigation'

import App from './App'
import Paradas from './components/Paradas'
import Time from './components/Time'

const registerScreens = () => {
  Navigation.registerComponent('Home', () => App)
  Navigation.registerComponent('Paradas', () => Paradas)
  Navigation.registerComponent('Time', () => Time)
}

export default registerScreens