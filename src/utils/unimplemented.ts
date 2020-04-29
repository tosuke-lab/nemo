class NotImplementedError extends Error {
  constructor() {
    super('unimplemented!');
  }
}

export const unimplemented = (): never => {
  throw new NotImplementedError();
};
