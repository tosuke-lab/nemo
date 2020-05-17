import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import React, {Suspense} from 'react';
import {RecoilRoot} from 'recoil';
import {ThemeProvier} from '@components/theme';
import {NavigationRoot} from './routes';

enableScreens();

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={null}>
        <ThemeProvier>
          <NavigationRoot />
        </ThemeProvier>
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
