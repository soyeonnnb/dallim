module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Prettier 권장 설정 추가 // 반드시 마지막에 넣어주어야 한다.
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // 다른 규칙을 설정할 수 있다.
  },
};