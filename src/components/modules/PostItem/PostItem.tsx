import React from 'react';
import {Text, Box, Image} from '@components/ui';
import {StyleSheet} from 'react-native';

export type PostItemProps = {
  authorName: string;
  authorScreenName: string;
  authorAvatarUrl?: string;
  time: string;
  body: string;
  appName: string;
  appIsBot: boolean;
};

const avatarInner:
  | React.ComponentProps<typeof Box>
  | React.ComponentProps<typeof Image> = {
  width: 40,
  height: 40,
  borderRadius: 8,
};

const Avatar = (
  props: Pick<
    PostItemProps,
    'authorName' | 'authorScreenName' | 'authorAvatarUrl'
  >,
) => (
  <Box padding="sm">
    {props.authorAvatarUrl ? (
      <Image {...avatarInner} source={{uri: props.authorAvatarUrl}} />
    ) : (
      <Box
        {...avatarInner}
        backgroundColor="foreground"
        justifyContent="center"
        alignItems="center">
        <Text
          lineHeight={40}
          fontSize={20}
          color="background"
          textTransform="uppercase">
          {[...(props.authorName || props.authorScreenName)][0] ?? ''}
        </Text>
      </Box>
    )}
  </Box>
);

export const PostItem = (props: PostItemProps) => (
  <Box
    flexDirection="row"
    borderTopColor="gray600"
    borderTopWidth={StyleSheet.hairlineWidth}>
    <Avatar {...props} />
    <Box flex={1} paddingVertical="sm" paddingRight="sm">
      <Box flexDirection="row" alignItems="flex-start">
        <Box flexShrink={1}>
          <Text
            variant="body"
            fontWeight="bold"
            textAlignVertical="top"
            numberOfLines={1}
            ellipsizeMode="tail">
            {props.authorName}
          </Text>
        </Box>
        <Box marginLeft="sm" marginRight="sm">
          <Text
            variant="body"
            color="caption"
            textAlignVertical="top"
            numberOfLines={1}>
            @{props.authorScreenName}
          </Text>
        </Box>
        <Box marginLeft="auto">
          <Text variant="body" color="caption" textAlignVertical="top">
            {props.time}
          </Text>
        </Box>
      </Box>
      <Text variant="body">{props.body}</Text>
      <Box flexDirection="row">
        <Text variant="caption">via {props.appName}</Text>
        {props.appIsBot && (
          <Box
            marginLeft="xs"
            paddingHorizontal="xs"
            backgroundColor="caption"
            borderRadius={4}>
            <Text variant="caption" color="background">
              BOT
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  </Box>
);
