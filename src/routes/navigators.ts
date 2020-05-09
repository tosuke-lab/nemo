import type {RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import type {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import type {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  Callback: {state: string; code: string};
};

export type RootStackPropsList = {
  [K in keyof RootStackParamList]: Readonly<{
    navigation: NativeStackNavigationProp<RootStackParamList, K>;
    route: RouteProp<RootStackParamList, K>;
  }>;
};

type MainTabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type MainTabPropsList = {
  [K in keyof MainTabParamList]: {
    readonly navigation: MaterialTopTabNavigationProp<MainTabPropsList, K>;
    readonly route: RouteProp<MainTabPropsList, K>;
  };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
export const MainTab = createMaterialTopTabNavigator<MainTabParamList>();
