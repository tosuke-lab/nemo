import React from 'react';
import {SeaPost} from '@models/sea';
import {PostItem} from './PostItem';

type SeaPostItemProps = {
  readonly time: string;
  readonly post: SeaPost;
};

export const SeaPostItem = ({time, post}: SeaPostItemProps) => (
  <PostItem
    authorName={post.user.name}
    authorScreenName={post.user.screenName}
    authorAvatarUrl={post.user.avatarFile?.variants[0].url}
    time={time ?? ''}
    body={post.text}
    appName={post.app.name}
    appIsBot={post.app.isBot}
  />
);
