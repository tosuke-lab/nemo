import React from 'react';
import type {RootStackPropsList} from '../navigators';
import {Stack} from '../navigators';
import {AuthRoot} from '@components/pages/AuthRoot';

const AuthScreenImpl = ({}: RootStackPropsList['Auth']) => {
  return <AuthRoot />;
};

export const AuthScreen = (
  <Stack.Screen
    name="Auth"
    options={{
      headerShown: false,
    }}
    component={AuthScreenImpl}
  />
);
