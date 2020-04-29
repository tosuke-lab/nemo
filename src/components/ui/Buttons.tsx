import React from 'react';
import {
  RectButton as NativeRectButton,
  BorderlessButton as NativeBorderlessButton,
} from 'react-native-gesture-handler';
import {createBox} from '@shopify/restyle';
import type {Theme} from '@components/theme';
import {useTheme} from '@components/theme';

const RestyledRectButton = createBox<
  Theme,
  React.PropsWithChildren<React.ComponentProps<typeof NativeRectButton>>
>(NativeRectButton);

const RestyledBorderlessButton = createBox<
  Theme,
  React.PropsWithChildren<React.ComponentProps<typeof NativeBorderlessButton>>
>(NativeBorderlessButton);

type Colors = keyof Theme['colors'];
type RectButtonProps = Omit<
  React.ComponentProps<typeof RestyledRectButton>,
  'rippleColor' | 'underlayColor'
> & {
  rippleColor?: Colors;
  underlayColor?: Colors;
};

type BorderlessButtonProps = Omit<
  React.ComponentProps<typeof RestyledBorderlessButton>,
  'rippleColor'
> & {rippleColor?: Colors};

export const RectButton = React.memo<RectButtonProps>((props) => {
  const theme = useTheme();
  return (
    <RestyledRectButton
      {...props}
      rippleColor={props.rippleColor && theme.colors[props.rippleColor]}
      underlayColor={props.underlayColor && theme.colors[props.underlayColor]}
    />
  );
});

export const BorderlessButton = React.memo<BorderlessButtonProps>((props) => {
  const theme = useTheme();
  return (
    <RestyledBorderlessButton
      {...props}
      rippleColor={props.rippleColor && theme.colors[props.rippleColor]}
    />
  );
});
