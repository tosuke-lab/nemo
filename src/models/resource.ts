type State<A> =
  | ['pending', Promise<A>]
  | ['fulfilled', A]
  | ['rejected', unknown];

export class Resource<A> {
  private state: State<A>;

  constructor(promise: Promise<A>) {
    this.state = ['pending', promise];
    promise.then(
      (v) => {
        this.state = ['fulfilled', v];
      },
      (e) => {
        this.state = ['rejected', e];
      },
    );
  }

  static join<RS extends Resource<any>[]>(...resources: RS) {
    return new Resource<
      {[K in keyof RS]: RS[K] extends Resource<infer A> ? A : never}
    >(Promise.all(resources.map((r) => r.promise)) as any);
  }

  read(): A {
    switch (this.state[0]) {
      case 'pending':
        throw this.state[1];
      case 'rejected':
        throw this.state[1];
      case 'fulfilled':
        return this.state[1];
    }
  }

  get promise(): Promise<A> {
    switch (this.state[0]) {
      case 'pending':
        return this.state[1];
      case 'rejected':
        return Promise.reject(this.state[1]);
      case 'fulfilled':
        return Promise.resolve(this.state[1]);
    }
  }

  then<B>(onFulfilled: (x: A) => B | PromiseLike<B>): Resource<B> {
    return new Resource(this.promise.then(onFulfilled));
  }

  catch(onRejected: (e: unknown) => A | PromiseLike<A>): Resource<A> {
    return new Resource(this.promise.catch(onRejected));
  }
}
