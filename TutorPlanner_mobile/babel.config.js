module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'module:react-native-dotenv',
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './src/components',
                        '@model': './src/model',
                        '@services': './src/services',
                        '@styles': './src/styles',
                        '@hooks': './src/hooks',
                        '@utils': './src/utils',
                        '@contexts': './src/contexts',
                        '@screens': './src/screens',
                    },
                },
            ],
        ],
    };
};
