import React, {useCallback} from 'react';
import type {RootStackPropsList} from '../navigators';
import {Stack} from '../navigators';
import {Callback} from '@components/pages/Callback';

const CallbackScreenImpl = ({
  route,
  navigation,
}: RootStackPropsList['Callback']) => {
  const goNext = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <Callback
      state={route.params.state}
      code={route.params.code}
      goNext={goNext}
      goBack={goBack}
    />
  );
};

export const CallbackScreen = (
  <Stack.Screen
    name="Callback"
    options={{headerShown: false}}
    component={CallbackScreenImpl}
  />
);
