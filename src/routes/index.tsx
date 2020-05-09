import React, {useRef, useState, useEffect} from 'react';
import type {
  NavigationContainerRef,
  InitialState,
} from '@react-navigation/native';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import {Stack} from './navigators';
import {MainScreen} from './screens/MainScreen';
import {AuthScreen} from './screens/AuthScreen';
import {CallbackScreen} from './screens/CallbackScreen';
import {useAuthState} from '@hooks/auth';

export const NavigationRoot = () => {
  const [initialState, setInitialState] = useState<InitialState | undefined>();

  const ref = useRef<NavigationContainerRef>(null);
  const [loadingState, setLoadingState] = useState(true);
  const {getInitialState} = useLinking(ref, {
    prefixes: ['nemo-client://'],
    config: {
      Callback: 'callback',
    },
  });

  useEffect(() => {
    Promise.race([
      Promise.resolve(getInitialState()),
      new Promise<void>((r) => window.setTimeout(r, 150)),
    ] as const)
      .catch((e) => {
        console.error(e);
      })
      .then((state) => {
        if (state !== undefined) {
          console.log(state);
          setInitialState(state);
        }
        setLoadingState(false);
      });
  }, [getInitialState]);

  const [authState] = useAuthState();
  const hasCredential = authState.credentials.length > 0;

  return !loadingState ? (
    <NavigationContainer ref={ref} initialState={initialState}>
      <Stack.Navigator initialRouteName={hasCredential ? 'Main' : 'Auth'}>
        {MainScreen}
        {AuthScreen}
        {CallbackScreen}
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
};
