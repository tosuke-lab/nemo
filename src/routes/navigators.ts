import type {RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import type {NativeStackNavigationProp} from 'react-native-screens/native-stack';

type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Callback: {state: string; code: string};
};

export type RootStackPropsList = {
  [K in keyof RootStackParamList]: Readonly<{
    navigation: NativeStackNavigationProp<RootStackParamList, K>;
    route: RouteProp<RootStackParamList, K>;
  }>;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
