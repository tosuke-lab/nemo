import {Resource} from './resource';

export type Edge<A> = Readonly<{
  node: A;
  cursor: string;
}>;

export type Connection<A> = Readonly<{
  edges: readonly Edge<A>[];
  pageInfo: Readonly<{
    hasNextPage: boolean;
    hasPrevPage: boolean;
    startCursor?: string;
    endCursor?: string;
  }>;
}>;

export interface Pager<A> {
  fetchLatest(first: number): Promise<Connection<A>>;
  fetchAfter(cursor: string, first: number): Promise<Connection<A>>;
  fetchBefore(cursor: string, first: number): Promise<Connection<A>>;
}

export type PagedResource<A> = Resource<{
  readonly initial: Connection<A>;
  readonly pager: Pager<A>;
}>;

export const fetchLatest = <A>(
  pager: Pager<A>,
  first: number,
): PagedResource<A> =>
  new Resource(
    pager.fetchLatest(first).then((conn) => ({initial: conn, pager})),
  );

export const fetchAfter = <A>(
  pager: Pager<A>,
  cursor: string,
  first: number,
): PagedResource<A> =>
  new Resource(
    pager.fetchAfter(cursor, first).then((conn) => ({initial: conn, pager})),
  );

export const fetchBefore = <A>(
  pager: Pager<A>,
  cursor: string,
  last: number,
): PagedResource<A> =>
  new Resource(
    pager.fetchBefore(cursor, last).then((conn) => ({initial: conn, pager})),
  );
