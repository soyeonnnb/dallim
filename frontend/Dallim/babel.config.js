module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver', {
        "root": ["./src"],
        "alias": {
          "@": "./src"
        }
      }
    ],
    'react-native-reanimated/plugin', // react-native-reanimated/plugin 을 제일 마지막에 배치
  ],
};