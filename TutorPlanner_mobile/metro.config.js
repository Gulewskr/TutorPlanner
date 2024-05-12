const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname, {
    isCSSEnabled: true,
});

const {
    resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname, {
    isCSSEnabled: true,
});

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

module.exports = mergeConfig(defaultConfig, config);
