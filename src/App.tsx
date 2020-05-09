import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import React, {Suspense} from 'react';
import {ThemeProvier} from '@components/theme';
import {NavigationRoot} from './routes';
import {AuthStateProvider, useInitialAuthStateResource} from '@hooks/auth';

enableScreens();

const App = () => {
  const initialAuthStateResource = useInitialAuthStateResource();
  return (
    <Suspense fallback={null}>
      <ThemeProvier>
        <AuthStateProvider initialStateResource={initialAuthStateResource}>
          <NavigationRoot />
        </AuthStateProvider>
      </ThemeProvier>
    </Suspense>
  );
};

export default App;
