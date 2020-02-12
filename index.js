/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { Navigation } from 'react-native-navigation';
import registerScreens from './Routes'


registerScreens();
Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
        stack: {
            children: [
            {
                component: {
                    name: 'Home'
                }
            }
            ]
        }
        }
    });
});
