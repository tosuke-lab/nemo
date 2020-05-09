import React, {
  useReducer,
  Reducer,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import type {Credential} from '@models/type';
import {Resource} from '@models/resource';
import type {SeaCredential} from '@models/sea';
import type {AuthState} from './types';
import {setAuthState, getAuthState} from './store';

type AuthStateActions =
  | {
      type: 'add';
      credential: Credential;
    }
  | {
      type: 'remove';
      id: string;
    };

const authStateReducer: Reducer<AuthState, AuthStateActions> = (
  prev,
  action,
) => {
  switch (action.type) {
    case 'add':
      return {
        ...prev,
        defaultId: prev.defaultId ?? action.credential.id,
        credentials: [...prev.credentials, action.credential],
      };
    case 'remove':
      const newCredentials = prev.credentials.filter((c) => c.id !== action.id);
      return {
        ...prev,
        defaultId:
          prev.defaultId === action.id ? newCredentials[0]?.id : prev.defaultId,
        credentials: newCredentials,
      };
    default:
      /* eslint-disable-next-line */
      const _exhausiveCheck: never = action;
      throw 'unreachable';
  }
};

export const useInitialAuthStateResource = () => new Resource(getAuthState());

const AuthStateContext = React.createContext<
  [AuthState, React.Dispatch<AuthStateActions>]
>([
  {credentials: []},
  () => {
    throw new Error('can dispatch within `AuthStateProvider`');
  },
]);

type AuthStateProviderProps = React.PropsWithChildren<{
  initialStateResource: Resource<AuthState | undefined>;
}>;

export const AuthStateProvider = ({
  initialStateResource,
  children,
}: AuthStateProviderProps) => {
  const initialState = initialStateResource.read() ?? {credentials: []};
  const [authState, dispatch] = useReducer(authStateReducer, initialState);
  useEffect(() => {
    setAuthState(authState);
  }, [authState]);
  return React.createElement(
    AuthStateContext.Provider,
    {value: [authState, dispatch]},
    children,
  );
};

export const useAuthState = () => useContext(AuthStateContext);

const AuthCredentialContext = React.createContext<Credential | undefined>(
  undefined,
);

type AuthCredentialProviderProps = React.PropsWithChildren<{id?: string}>;
export const AuthCredentialProvider = (props: AuthCredentialProviderProps) => {
  const [state] = useAuthState();
  const credential = useMemo(() => {
    const id = props.id ?? state.defaultId;
    if (id == null) {
      throw new Error('no credential registered');
    }
    const cr = state.credentials.find((c) => c.id === id);
    if (cr == null) {
      throw new Error('no credential found');
    }
    return cr;
  }, [state, props.id]);

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
    throw new Error('cannot get a credential out of `AuthCredentialProvider`');
  }
  if (provider != null && credential.provider !== provider) {
    throw new Error(
      `expect provider ${provider}, but got ${credential.provider}`,
    );
  }
  return credential;
}
