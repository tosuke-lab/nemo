module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@utils': './src/utils',
          '@constants': './src/constants',
        },
      },
    ],
  ],
};
