export type Omit<A, Keys extends keyof A> = Pick<A, Exclude<keyof A, Keys>>;

export const extend = <A>() => <B extends A>(x: B) => x;
