const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
// getDefaultConfig가 비동기 함수이므로, 이를 감싸는 비동기 함수를 만들어야 합니다.
async function createConfig() {
  // 기본 구성을 비동기적으로 가져옵니다.
  const defaultConfig = await getDefaultConfig(__dirname);

  // 기존의 설정 또는 추가적인 사용자 정의 설정이 있을 수 있습니다.
  const customConfig = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      // "await" 키워드로 인해 "defaultConfig" 내부의 값을 가져올 수 있습니다.
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
  };

  // mergeConfig 함수를 사용하여 두 구성을 병합합니다.
  return mergeConfig(defaultConfig, customConfig);
}

// 이제 모듈을 비동기 함수로 내보내야 합니다.
module.exports = createConfig(); // 이렇게 하면 최종 구성이 프로미스로 내보내집니다.
