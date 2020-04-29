import React from 'react';
import type {RootStackPropsList} from '../navigators';
import {Stack} from '../navigators';
import {Home} from '@components/pages/Home';
import {AuthCredentialProvider} from '@hooks/auth';

const HomeScreenImpl = ({}: RootStackPropsList['Home']) => {
  return (
    <AuthCredentialProvider>
      <Home />
    </AuthCredentialProvider>
  );
};

export const HomeScreen = (
  <Stack.Screen
    name="Home"
    options={{
      headerTitle: 'Home',
    }}
    component={HomeScreenImpl}
  />
);
