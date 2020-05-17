import React from 'react';
import {
  ThemeProvider as RestyleThemeProvider,
  useTheme as useThemeUntyped,
  BaseTheme,
} from '@shopify/restyle';
import {extend} from '@utils/types';

const palette = {
  transparent: 'transparent',

  black: '#000',
  white: '#fff',

  gray100: '#f7fafc',
  gray200: '#edf2f7',
  gray300: '#e2e8f0',
  gray400: '#cbd5e0',
  gray500: '#a0aec0',
  gray600: '#718096',
  gray700: '#4a5568',
  gray800: '#2d3748',
  gray900: '#1a202c',
  red100: '#fff5f5',
  red200: '#fed7d7',
  red300: '#feb2b2',
  red400: '#fc8181',
  red500: '#f56565',
  red600: '#e53e3e',
  red700: '#c53030',
  red800: '#9b2c2c',
  red900: '#742a2a',
  orange100: '#fffaf0',
  orange200: '#feebc8',
  orange300: '#fbd38d',
  orange400: '#f6ad55',
  orange500: '#ed8936',
  orange600: '#dd6b20',
  orange700: '#c05621',
  orange800: '#9c4221',
  orange900: '#7b341e',
  yellow100: '#fffff0',
  yellow200: '#fefcbf',
  yellow300: '#faf089',
  yellow400: '#f6e05e',
  yellow500: '#ecc94b',
  yellow600: '#d69e2e',
  yellow700: '#b7791f',
  yellow800: '#975a16',
  yellow900: '#744210',
  green100: '#f0fff4',
  green200: '#c6f6d5',
  green300: '#9ae6b4',
  green400: '#68d391',
  green500: '#48bb78',
  green600: '#38a169',
  green700: '#2f855a',
  green800: '#276749',
  green900: '#22543d',
  teal100: '#e6fffa',
  teal200: '#b2f5ea',
  teal300: '#81e6d9',
  teal400: '#4fd1c5',
  teal500: '#38b2ac',
  teal600: '#319795',
  teal700: '#2c7a7b',
  teal800: '#285e61',
  teal900: '#234e52',
  blue100: '#ebf8ff',
  blue200: '#bee3f8',
  blue300: '#90cdf4',
  blue400: '#63b3ed',
  blue500: '#4299e1',
  blue600: '#3182ce',
  blue700: '#2b6cb0',
  blue800: '#2c5282',
  blue900: '#2a4365',
  indigo100: '#ebf4ff',
  indigo200: '#c3dafe',
  indigo300: '#a3bffa',
  indigo400: '#7f9cf5',
  indigo500: '#667eea',
  indigo600: '#5a67d8',
  indigo700: '#4c51bf',
  indigo800: '#434190',
  indigo900: '#3c366b',
  purple100: '#faf5ff',
  purple200: '#e9d8fd',
  purple300: '#d6bcfa',
  purple400: '#b794f4',
  purple500: '#9f7aea',
  purple600: '#805ad5',
  purple700: '#6b46c1',
  purple800: '#553c9a',
  purple900: '#44337a',
  pink100: '#fff5f7',
  pink200: '#fed7e2',
  pink300: '#fbb6ce',
  pink400: '#f687b3',
  pink500: '#ed64a6',
  pink600: '#d53f8c',
  pink700: '#b83280',
  pink800: '#97266d',
  pink900: '#702459',
};

const colors = {
  ...palette,
  background: palette.gray100,
  foreground: palette.black,
  caption: palette.gray700,
  primary: palette.blue600,
  danger: palette.red600,
  border: palette.gray700,
};

const spacing = {
  auto: ('auto' as unknown) as number,
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

const textVariants = extend<
  Record<
    string,
    Partial<{fontSize: number; lineHeight: number; color: keyof typeof colors}>
  >
>()({
  micro: {
    fontSize: 12,
    lineHeight: 18,
    color: 'foreground',
  },
  small: {
    fontSize: 14,
    lineHeight: 21,
    color: 'foreground',
  },
  medium: {
    fontSize: 18,
    lineHeight: 27,
    color: 'foreground',
  },
  large: {
    fontSize: 22,
    lineHeight: 33,
    color: 'foreground',
  },
});

const theme = extend<BaseTheme>()({
  colors: {
    ...colors,
  },
  spacing,
  breakpoints: {},
  textVariants: {
    ...textVariants,
    heading: textVariants.large,
    body: textVariants.small,
    caption: {
      ...textVariants.micro,
      color: 'caption',
    },
  },
});

export type Theme = typeof theme;

export const ThemeProvier = (props: React.PropsWithChildren<{}>) => (
  <RestyleThemeProvider theme={theme}>{props.children}</RestyleThemeProvider>
);

export const useTheme = () => useThemeUntyped<Theme>();
