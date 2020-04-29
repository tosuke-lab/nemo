import React from 'react';
import {useTheme} from '@components/theme';
import type {Theme} from '@components/theme';
import type {IconProps as NativeIconProps} from 'react-native-vector-icons/Icon';

type IconProps = Omit<NativeIconProps, 'color'> & {
  as: React.ComponentType<NativeIconProps>;
  color?: keyof Theme['colors'];
};

export const Icon = ({as, ...props}: IconProps) => {
  const theme = useTheme();
  return React.createElement(as, {
    ...props,
    color: theme.colors[props.color ?? 'white'],
  });
};
