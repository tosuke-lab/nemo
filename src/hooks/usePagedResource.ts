import {useState, useEffect, useCallback, useMemo} from 'react';
import {PagedResource, Connection} from '@models/pager';

export function usePagedResource<A>(resource: PagedResource<A>) {
  const {initial, pager} = resource.read();
  const [edges, setEdges] = useState(initial.edges);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isLoadingPrev, setIsLoadingPrev] = useState(false);
  const [startCursor, setStartCursor] = useState(
    () => initial.pageInfo.startCursor,
  );
  const [endCursor, setEndCursor] = useState(() => initial.pageInfo.endCursor);
  const [hasNext, setHasNext] = useState(() => initial.pageInfo.hasNextPage);
  const [hasPrev, setHasPrev] = useState(() => initial.pageInfo.hasPrevPage);

  const data = useMemo(() => edges.map((edge) => edge.node), [edges]);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (error != null) {
      throw error;
    }
  }, [error]);

  const loadNext = useCallback(
    (count: number, onComplete?: (conn: Connection<A>) => void) => {
      if (isLoadingNext || isLoadingPrev) {
        return;
      }
      if (endCursor == null) {
        return;
      }
      setIsLoadingNext(true);
      pager.fetchAfter(endCursor, count).then(
        (conn) => {
          setIsLoadingNext(false);
          setEdges((es) => [...es, ...conn.edges]);
          setHasNext(conn.pageInfo.hasNextPage);
          setEndCursor(conn.pageInfo.endCursor);
          onComplete?.(conn);
        },
        (err) => {
          setIsLoadingNext(false);
          setError(err);
        },
      );
    },
    [pager, isLoadingNext, isLoadingPrev, endCursor],
  );

  const loadPrev = useCallback(
    (count: number, onComplete?: (conn: Connection<A>) => void) => {
      if (isLoadingNext || isLoadingPrev) {
        return;
      }
      setIsLoadingPrev(true);
      pager.fetchBefore(startCursor ?? edges[0].cursor, count).then(
        (conn) => {
          setIsLoadingPrev(false);
          setEdges((es) => [...conn.edges, ...es]);
          setHasPrev(conn.pageInfo.hasPrevPage);
          setStartCursor(conn.pageInfo.startCursor);
          onComplete?.(conn);
        },
        (err) => {
          setIsLoadingPrev(false);
          setError(err);
        },
      );
    },
    [pager, edges, isLoadingNext, isLoadingPrev, startCursor],
  );

  return {
    data,
    isLoadingNext,
    isLoadingPrev,
    hasNext,
    hasPrev,
    loadNext,
    loadPrev,
  };
}
