import React from 'react';
import {ActivityIndicator as NativeActivityIndicator} from 'react-native';
import type {Theme} from '@components/theme';
import {useTheme} from '@components/theme';

type ActivityIndicatorProps = Omit<
  React.ComponentProps<typeof NativeActivityIndicator>,
  'color'
> & {
  color?: keyof Theme['colors'];
};

export const ActivityIndicator = React.memo<ActivityIndicatorProps>((props) => {
  const theme = useTheme();
  return (
    <NativeActivityIndicator
      {...props}
      color={props.color && theme.colors[props.color]}
    />
  );
});
