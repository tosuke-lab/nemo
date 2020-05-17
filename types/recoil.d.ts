declare module 'recoil' {
  import React from 'react';
  export const RecoilRoot: React.ComponentType<React.PropsWithChildren<{}>>;

  export class DefaultValue {
    readonly __tag?: 'DefaultValue';
  }

  export interface RecoilValue<T> {
    readonly __tag?: 'recoilvalue';
    readonly __type?: Promise<T>;
  }

  export interface RecoilState<T> extends RecoilValue<T> {}

  export interface Loadable<T> {
    readonly state: 'hasValue' | 'hasError' | 'loading';
    getValue(): T;
    toPromise(): Promise<{readonly value: T}>;
    valueMaybe(): T | undefined;
    errorMaybe(): Error | undefined;
    promiseMaybe(): Promise<T> | undefined;
    map<U>(f: (x: T) => U | Promise<U>): Loadable<U>;
  }

  export function isRecoilValue(v: unknown): v is RecoilValue<unknown>;

  export function atom<T>(params: {
    readonly key: string;
    readonly default: T;
  }): RecoilValue<T>;

  type GetRecoilValue = <T>(value: RecoilValue<T>) => T;
  type SetRecoilState = <T>(
    state: RecoilState<T>,
    value: T | DefaultValue | ((prev: T) => T | DefaultValue),
  ) => void;
  type ResetRecoilState = <T>(state: RecoilState<T>) => void;

  type ReadOnlySelectorOptions<T> = Readonly<{
    key: string;
    get: (ops: {get: GetRecoilValue}) => T | RecoilValue<T> | Promise<T>;
  }>;
  type ReadWriteSelectorOptions<T> = ReadOnlySelectorOptions<T> & {
    readonly set: (
      ops: {set: SetRecoilState; get: GetRecoilValue; reset: ResetRecoilState},
      newValue: T | DefaultValue,
    ) => void;
  };
  export function selector<T>(
    options: ReadWriteSelectorOptions<T>,
  ): RecoilState<T>;
  export function selector<T>(
    options: ReadOnlySelectorOptions<T>,
  ): RecoilValue<T>;

  type SetOrUpdate<T> = (value: T | ((prev: T) => T)) => void;
  export function useRecoilValue<T>(value: RecoilValue<T>): T;
  export function useRecoilValueLoadable<T>(value: RecoilValue<T>): Loadable<T>;
  export function useRecoilState<T>(state: RecoilState<T>): [T, SetOrUpdate<T>];
  export function useRecoilStateLoadable<T>(
    state: RecoilState<T>,
  ): [Loadable<T>, SetOrUpdate<T>];
  export function useSetRecoilState<T>(state: RecoilState<T>): SetOrUpdate<T>;
  export function useResetRecoilState<T>(state: RecoilState<T>): () => void;

  // cannot use `useRecoilCallback` in ReactNative
  /*
  type CallbackOperations = Readonly<{
    getPromise: <T>(value: RecoilValue<T>) => Promise<T>;
    getLoadable: <T>(value: RecoilValue<T>) => Loadable<T>;
    set: <T>(state: RecoilState<T>, value: T | ((prev: T) => T)) => void;
    reset: <T>(state: RecoilState<T>) => void;
  }>;
  export function useRecoilCallback<Args extends any[], Return>(
    f: (ops: CallbackOperations, ...args: Args) => Return,
    deps?: unknown[],
  ): (...args: Args) => Return;
  */
}
