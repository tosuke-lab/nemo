import ky from 'ky';
import $, {Transformer} from 'transform-ts';
import type {SeaPost, SeaCredential} from '@models/sea';
import {seaPost} from '@models/sea';
import {Pager, Connection, Edge} from '@models/pager';
import {map} from '@utils/transformers';
import {useCredential} from './auth';
import {useMemo} from 'react';

class SeaPublicTLPager implements Pager<SeaPost> {
  private http: typeof ky;
  private postEdges: Transformer<unknown, Edge<SeaPost>[]>;
  constructor(credential: SeaCredential) {
    const endpoint = `https://${credential.host}/api`;
    this.http = ky.extend({
      prefixUrl: endpoint,
      headers: {
        Authorization: `Bearer ${credential.accessToken}`,
      },
    });
    this.postEdges = $.array(
      seaPost(credential.host).compose(
        map((p) => ({
          node: p,
          cursor: `${p.id}`,
        })),
      ),
    );
  }

  private static createConnection(
    edges: Edge<SeaPost>[],
    count: number,
  ): Connection<SeaPost> {
    const startCursor = edges.length > 0 ? edges[0].cursor : undefined;
    const endCursor =
      edges.length > 0 ? edges[edges.length - 1].cursor : undefined;
    return {
      edges,
      pageInfo: {
        hasNextPage: edges.length === count && endCursor !== '0',
        hasPrevPage: edges.length > 0,
        startCursor,
        endCursor,
      },
    };
  }

  async fetchLatest(first: number): Promise<Connection<SeaPost>> {
    console.log(`v1/timelines/public?count=${first}`);
    const edges = await this.http
      .get('v1/timelines/public', {
        searchParams: {
          count: `${first}`,
        },
      })
      .json()
      .then((json) => this.postEdges.transformOrThrow(json));

    const conn = SeaPublicTLPager.createConnection(edges, first);
    return {
      ...conn,
      pageInfo: {
        ...conn.pageInfo,
        hasPrevPage: false,
      },
    };
  }

  async fetchAfter(
    cursor: string,
    first: number,
  ): Promise<Connection<SeaPost>> {
    console.log(`v1/timelines/public?maxId=${cursor}&count=${first}`);
    const edges = await this.http
      .get('v1/timelines/public', {
        searchParams: {
          count: first,
          maxId: cursor,
        },
      })
      .json()
      .then((json) => this.postEdges.transformOrThrow(json));
    return SeaPublicTLPager.createConnection(edges, first);
  }

  async fetchBefore(
    cursor: string,
    last: number,
  ): Promise<Connection<SeaPost>> {
    const id = parseInt(cursor, 10);
    const edges = await this.http
      .get('v1/timelines/public', {
        searchParams: {
          count: last,
          sinceId: id,
          maxId: id + last + 1,
        },
      })
      .json()
      .then((json) => this.postEdges.transformOrThrow(json));
    const conn = SeaPublicTLPager.createConnection(edges, last);
    return {
      ...conn,
      pageInfo: {
        ...conn.pageInfo,
        hasNextPage: conn.edges.length > 0,
      },
    };
  }
}

export const usePublicTLPager = () => {
  const credential = useCredential('sea');
  return useMemo(() => new SeaPublicTLPager(credential), [credential]);
};
