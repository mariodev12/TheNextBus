import React from 'react'
import { Navigation } from 'react-native-navigation'

import App from './App'
import Paradas from './components/Paradas'

const registerScreens = () => {
  Navigation.registerComponent('Home', () => App)
  Navigation.registerComponent('Paradas', () => Paradas)
}

export default registerScreens