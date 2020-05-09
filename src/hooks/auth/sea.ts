import {useCallback} from 'react';
import {Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import $, {Transformer} from 'transform-ts';
import ky from 'ky';
import * as Crypto from 'expo-crypto';
import {config} from '@constants';
import {uuidv4} from '@utils/uuidv4';
import {SeaCredential} from '@models/sea';

const SEA_AUTH_STATE_KEY = '@sea_auth_state';

const seaAuthStateTransformer = $.obj({
  provider: $.literal('sea'),
  state: $.string,
  host: $.string,
  clientId: $.string,
  clientSecret: $.string,
});

const seaAuthState = {
  get: async () => {
    const item = await AsyncStorage.getItem(SEA_AUTH_STATE_KEY);
    if (item == null) {
      return undefined;
    }
    return seaAuthStateTransformer.transformOrThrow(JSON.parse(item));
  },
  set: (state: Transformer.TypeOf<typeof seaAuthStateTransformer>) =>
    AsyncStorage.setItem(SEA_AUTH_STATE_KEY, JSON.stringify(state)),
  delete: () => AsyncStorage.removeItem(SEA_AUTH_STATE_KEY),
};

export type UseAuthErrors = 'closed' | 'requireCredentials' | 'unknown';

const resolveAppCredentials = async (host: string) => {
  const hashedHost = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    host,
  );
  return config.sea_apps.find((app) => app.hashed_host === hashedHost);
};

export const useAuth = () => {
  const startAuth = useCallback(
    async ({
      host,
      clientId,
      clientSecret,
      onError,
    }: {
      host: string;
      clientId?: string;
      clientSecret?: string;
      onError: (error: UseAuthErrors) => void;
    }) => {
      try {
        const state = await uuidv4();
        const credential =
          clientId != null && clientSecret != null
            ? {client_id: clientId, client_secret: clientSecret}
            : await resolveAppCredentials(host);
        if (credential == null) {
          onError('requireCredentials');
          return;
        }

        seaAuthState.set({
          provider: 'sea',
          state,
          host,
          clientId: credential.client_id,
          clientSecret: credential.client_secret,
        });
        try {
          const url = new URL('/oauth/authorize', `https://${host}`);
          url.search = new URLSearchParams({
            response_type: 'code',
            state,
            client_id: credential.client_id,
          }).toString();

          if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.openAuth(
              url.href,
              'nemo-client://callback',
              {
                ephemeralWebSession: true,
                showTitle: false,
                enableUrlBarHiding: true,
                enableDefaultShare: false,
              },
            );
            if (result.type === 'success') {
              await Linking.openURL(result.url);
            } else {
              onError('closed');
            }
          } else {
            await Linking.openURL(url.href);
          }
        } catch (e) {
          await seaAuthState.delete();
          throw e;
        }
      } catch (e) {
        console.error(e);
        onError('unknown');
      }
    },
    [],
  );

  return {
    startAuth,
  };
};

export type UseAuthCallbackErrorTypes =
  | 'unknown'
  | 'invalidState'
  | 'invalidCode';
export const useAuthCallback = () => {
  const processCallback = useCallback(
    async ({
      state,
      code,
      onSuccess,
      onFailure,
    }: {
      state: string;
      code: string;
      onSuccess: (credential: SeaCredential) => void;
      onFailure: (error: UseAuthCallbackErrorTypes) => void;
    }) => {
      try {
        const authState = await seaAuthState.get();
        if (authState == null || authState.state !== state) {
          onFailure('invalidState');
          return;
        }

        try {
          const json = await ky
            .post(new URL('/oauth/token', `https://${authState.host}`), {
              json: {
                grant_type: 'authorization_code',
                client_id: authState.clientId,
                client_secret: authState.clientSecret,
                code,
                state,
              },
            })
            .json();
          const {access_token: token} = $.obj({
            access_token: $.string,
          }).transformOrThrow(json);

          const credential: SeaCredential = {
            id: authState.state,
            provider: 'sea',
            host: authState.host,
            accessToken: token,
          };

          onSuccess(credential);
          return;
        } catch (e) {
          if (e instanceof ky.HTTPError) {
            onFailure('invalidCode');
            return;
          }
          throw e;
        }
      } catch (e) {
        console.error(e);
        onFailure('unknown');
      } finally {
        await seaAuthState.delete();
      }
    },
    [],
  );
  return {
    processCallback,
  };
};
