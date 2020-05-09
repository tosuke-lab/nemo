import React, {useCallback} from 'react';
import type {RootStackPropsList, MainTabPropsList} from '../navigators';
import {Stack, MainTab} from '../navigators';
import {Home} from '@components/pages/Home';
import {Settings} from '@components/pages/Settings';
import {AuthCredentialProvider} from '@hooks/auth';
import {CommonActions} from '@react-navigation/native';

const HomeScreenImpl = ({}: MainTabPropsList['Home']) => {
  return (
    <AuthCredentialProvider>
      <Home />
    </AuthCredentialProvider>
  );
};

const SettingsScreenImpl = ({navigation}: MainTabPropsList['Settings']) => {
  const navigateToAuthScreen = useCallback(() => {
    navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    });
  }, [navigation]);
  return <Settings navigateToAuthScreen={navigateToAuthScreen} />;
};

const MainScreenImpl = ({}: RootStackPropsList['Main']) => {
  return (
    <MainTab.Navigator initialRouteName="Home" removeClippedSubviews>
      <MainTab.Screen name="Home" component={HomeScreenImpl} />
      <MainTab.Screen name="Settings" component={SettingsScreenImpl} />
    </MainTab.Navigator>
  );
};

export const MainScreen = (
  <Stack.Screen
    name="Main"
    options={{
      headerShown: false,
    }}
    component={MainScreenImpl}
  />
);
