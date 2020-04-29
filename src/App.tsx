import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import React, {Suspense} from 'react';
import {ThemeProvier} from '@components/theme';
import {NavigationRoot} from './routes';
import {AuthStateProvider} from '@hooks/auth';

enableScreens();

const App = () => (
  <Suspense fallback={null}>
    <ThemeProvier>
      <AuthStateProvider>
        <NavigationRoot />
      </AuthStateProvider>
    </ThemeProvier>
  </Suspense>
);

export default App;
