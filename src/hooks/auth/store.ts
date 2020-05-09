import AsyncStorage from '@react-native-community/async-storage';
import $, {Transformer} from 'transform-ts';
import {seaCredential} from '@models/sea';
import type {AuthState} from './types';

const AUTH_STATE_KEY = '@auth_state';

const authStateTransformer: Transformer<unknown, AuthState> = $.obj({
  version: $.literal('1'),
  defaultId: $.optional($.string),
  credentials: $.array(seaCredential),
});

export const getAuthState = async () => {
  const item = await AsyncStorage.getItem(AUTH_STATE_KEY);
  if (item == null) {
    return undefined;
  }
  const result = authStateTransformer.transform(JSON.parse(item));
  if (result.type === 'error') {
    console.error(result.errors);
    await AsyncStorage.removeItem(AUTH_STATE_KEY);
    return undefined;
  }
  return result.value;
};

export const setAuthState = async (state: AuthState) => {
  await AsyncStorage.setItem(
    AUTH_STATE_KEY,
    JSON.stringify({
      version: '1',
      ...state,
    }),
  );
};
