const {
    AndroidConfig,
    createRunOncePlugin,
    withAndroidStyles,
} = require('@expo/config-plugins');

const withNavigationBarColor = config => {
    return withAndroidStyles(config, config => {
        const styles = config.modResults;

        const appThemeStyle = styles?.resources?.style?.find(
            style => style.$.name === 'AppTheme',
        );

        if (appThemeStyle) {
            const existingItem = appThemeStyle.item.find(
                item => item.$.name === 'android:navigationBarColor',
            );
            if (existingItem) {
                existingItem._ = '@android:color/white';
            } else {
                appThemeStyle.item.push(
                    AndroidConfig.Resources.buildResourceItem({
                        name: 'android:navigationBarColor',
                        value: '@android:color/white',
                    }),
                );
            }
        }

        const themeStyle = styles?.resources?.style?.find(
            style => style.$.name === 'Theme.FullScreenDialog',
        );

        if (themeStyle) {
            const existingItem = themeStyle.item.find(
                item => item.$.name === 'android:navigationBarColor',
            );
            if (existingItem) {
                existingItem._ = '@android:color/white';
            } else {
                themeStyle.item.push(
                    AndroidConfig.Resources.buildResourceItem({
                        name: 'android:navigationBarColor',
                        value: '@android:color/white',
                    }),
                );
            }
        }

        return config;
    });
};

module.exports = createRunOncePlugin(
    withNavigationBarColor,
    'fix-modal-navigation-bar-color',
    '1.0.0',
);
