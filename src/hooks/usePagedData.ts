import {useState, useEffect} from 'react';
import {Pager} from '@models/pager';

export const usePagedData = <A>(pager: Pager<A>, first: number) => {
  const [data, setData] = useState<A[]>([]);
  const [isLoadingNext, setIsLoadingNext] = useState(true);
  const [isLoadingPrev, setIsLoadingPrev] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(true);

  useEffect(() => {
    setIsLoadingNext(true);
    setIsLoadingPrev(true);
    pager.fetchLatest(first).then((conn) => {
      setData(conn.edges.map((edge) => edge.node));
      setIsLoadingNext(false);
      setIsLoadingPrev(false);
      setHasNext(conn.pageInfo.hasNextPage);
      setHasPrev(conn.pageInfo.hasPrevPage);
    });
  }, [pager, first]);

  return {
    data,
    isLoadingNext,
    isLoadingPrev,
    hasNext,
    hasPrev,
  };
};
