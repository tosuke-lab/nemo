import React, {useRef, useState, useEffect} from 'react';
import type {
  NavigationContainerRef,
  InitialState,
} from '@react-navigation/native';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import {Stack} from './navigators';
import {HomeScreen} from './screens/HomeScreen';
import {AuthScreen} from './screens/AuthScreen';
import {CallbackScreen} from './screens/CallbackScreen';

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
      getInitialState(),
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

  return !loadingState ? (
    <NavigationContainer ref={ref} initialState={initialState}>
      <Stack.Navigator initialRouteName="Auth">
        {HomeScreen}
        {AuthScreen}
        {CallbackScreen}
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
};
