import React from 'react';
import {Text as NativeText, TextStyle} from 'react-native';
import {
  createRestyleComponent,
  createRestyleFunction,
  textRestyleFunctions,
  backgroundColor,
} from '@shopify/restyle';
import type {
  TextProps as RestyleTextProps,
  BackgroundColorProps,
} from '@shopify/restyle';
import {Theme} from '@components/theme';

export type TextProps = RestyleTextProps<Theme> &
  BackgroundColorProps<Theme> &
  Pick<TextStyle, 'textAlignVertical'>;

export const Text = createRestyleComponent<
  React.PropsWithChildren<TextProps & React.ComponentProps<typeof NativeText>>
>(
  [
    ...textRestyleFunctions,
    backgroundColor,
    createRestyleFunction({
      property: 'textAlignVertical',
    }),
  ],
  NativeText,
);
