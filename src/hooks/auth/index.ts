import React, {useContext} from 'react';
import {
  atom,
  selector,
  DefaultValue,
  useRecoilValue,
  RecoilValue,
  useRecoilCallback,
} from 'recoil';
import {memoize} from 'lodash-es';
import type {Credential} from '@models/type';
import type {SeaCredential} from '@models/sea';
import type {AuthState} from './types';
import {setAuthState, getAuthState} from './store';

const authStateAtom = atom<AuthState | undefined>({
  key: 'authState__atom',
  default: undefined,
});
console.log(authStateAtom);

const authState = selector<AuthState>({
  key: 'authState',
  get: async ({get}) => {
    const state = get(authStateAtom);
    console.log(state);
    if (state !== undefined) return state;
    const newState = await getAuthState();
    if (newState !== undefined) return newState;
    return {credentials: []};
  },
  set: async ({get, set}, value) => {
    const old = get(authStateAtom);
    set(authStateAtom, value);
    try {
      if (value instanceof DefaultValue) return;
      await setAuthState(value);
    } catch (e) {
      console.error(e);
      set(authStateAtom, old);
    }
  },
});

export const authStateValue = authState as RecoilValue<AuthState>;

export const authStateFamily = memoize((id: string) =>
  selector<Credential | undefined>({
    key: `authState/${id}`,
    get: ({get}) => {
      const {credentials} = get(authStateValue);
      return credentials.find((c) => c.id === id);
    },
  }),
);

export const useAuthState = () => {
  return useRecoilValue(authState);
};
export const useAuthStateOperations = () => {
  const addCredential = useRecoilCallback(
    ({set}, credential: Credential) =>
      set(authState, (prev) => ({
        ...prev,
        defaultId: prev.defaultId ?? credential.id,
        credentials: [...prev.credentials, credential],
      })),
    [],
  );
  const removeCredential = useRecoilCallback(
    ({set}, id: string) =>
      set(authState, (prev) => {
        const newCredentials = prev.credentials.filter((c) => c.id !== id);
        return {
          ...prev,
          defaultId:
            prev.defaultId === id ? newCredentials[0]?.id : prev.defaultId,
          credentials: newCredentials,
        };
      }),
    [],
  );
  return {
    addCredential,
    removeCredential,
  } as const;
};

const AuthCredentialContext = React.createContext<Credential | undefined>(
  undefined,
);
type AuthCredentialProviderProps = React.PropsWithChildren<{id?: string}>;
export const AuthCredentialProvider = (props: AuthCredentialProviderProps) => {
  const {defaultId} = useAuthState();
  const credential = useRecoilValue(
    authStateFamily(props.id ?? defaultId ?? ''),
  );

  return React.createElement(
    AuthCredentialContext.Provider,
    {value: credential},
    props.children,
  );
};

export function useCredential(provider: 'sea'): SeaCredential;
export function useCredential(provider?: Credential['provider']): Credential {
  const credential = useContext(AuthCredentialContext);
  if (credential == null) {
    throw new Error('no credential found');
  }
  if (provider != null && credential.provider !== provider) {
    throw new Error(
      `expect provider ${provider}, but got ${credential.provider}`,
    );
  }
  return credential;
}
