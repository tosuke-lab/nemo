import React, {Suspense, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SeaPostItem} from '@components/modules/PostItem';
import {usePublicTLPager} from '@hooks/usePublicTLPager';
import {PagedResource, fetchLatest} from '@models/pager';
import {SeaPost} from '@models/sea';
import {usePagedResource} from '@hooks/usePagedResource';
import {Box, ActivityIndicator} from '@components/ui';

const LoadingView = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <ActivityIndicator size="large" color="blue600" />
  </Box>
);

const LoadingItem = () => (
  <Box
    justifyContent="center"
    alignItems="center"
    paddingVertical="xs"
    borderTopColor="gray600"
    borderTopWidth={StyleSheet.hairlineWidth}>
    <ActivityIndicator size="small" color="blue600" />
  </Box>
);

const HomeContent = ({resource}: {resource: PagedResource<SeaPost>}) => {
  const {data, loadNext, hasNext} = usePagedResource(resource);
  const offsetRef = useRef(0);
  const flatListRef = useRef<FlatList<SeaPost>>(null);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(p) => `${p.id}`}
      renderItem={({item: post}) => <SeaPostItem time="" post={post} />}
      overScrollMode="always"
      onScroll={(ev) => {
        const y = ev.nativeEvent.contentOffset.y;
        offsetRef.current = y;
      }}
      onEndReached={() => {
        loadNext(50);
      }}
      ListFooterComponent={hasNext ? <LoadingItem /> : null}
    />
  );
};

export const Home = () => {
  const pager = usePublicTLPager();
  const resource = fetchLatest(pager, 50);
  return (
    <Suspense fallback={<LoadingView />}>
      <HomeContent resource={resource} />
    </Suspense>
  );
};
