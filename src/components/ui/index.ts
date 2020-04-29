import React from 'react';
import {createBox, createText} from '@shopify/restyle';
import type {Theme} from '@components/theme';
import {Image as NativeImage, KeyboardAvoidingView} from 'react-native';
import {TextInput as NativeTextInput} from 'react-native-gesture-handler';

export const Box = createBox<Theme>();
export const Image = createBox<
  Theme,
  React.PropsWithChildren<React.ComponentProps<typeof NativeImage>>
>(NativeImage);
export const TextInput = createText<
  Theme,
  React.ComponentProps<typeof NativeTextInput>
>(NativeTextInput);
export const KeyboardAvoidingBox = createBox<
  Theme,
  React.PropsWithChildren<React.ComponentProps<typeof KeyboardAvoidingView>>
>(KeyboardAvoidingView);

export {Text} from './Text';
export type {TextProps} from './Text';

export {ActivityIndicator} from './ActivityIndicator';
export {RectButton, BorderlessButton} from './Buttons';
export {Icon} from './Icon';
