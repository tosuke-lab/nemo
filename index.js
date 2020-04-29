/**
 * @format
 */

import 'core-js/features/reflect';
import 'core-js/features/url';
import 'core-js/features/url-search-params';
import {AppRegistry, unstable_enableLogBox, YellowBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

unstable_enableLogBox();
YellowBox.ignoreWarnings(['Require cycle:']);

AppRegistry.registerComponent(appName, () => App);
