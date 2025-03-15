const { mergeConfig } = require('@react-native/metro-config');
const { getDefaultConfig } = require('expo/metro-config');
const {
    wrapWithReanimatedMetroConfig,
  } = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname, {
    isCSSEnabled: true,
});

const {
    resolver: { sourceExts, assetExts },
} = defaultConfig;

/**
 * Metro configuration
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    transformer: {
        babelTransformerPath: require.resolve('./transformer.js'),
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        assetExts: [...assetExts.filter(ext => ext !== 'svg'), 'png'],
        sourceExts: [...sourceExts, 'scss', 'sass', 'svg'],
    },
};

module.exports = wrapWithReanimatedMetroConfig(mergeConfig(
    getDefaultConfig(__dirname, {
        isCSSEnabled: true,
    }),
    config,
));
