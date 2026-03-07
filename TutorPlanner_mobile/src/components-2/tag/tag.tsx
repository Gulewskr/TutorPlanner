import * as React from 'react';
import { Text, View } from 'react-native';
import { DEFAULT } from '@styles/theme';
import { black, error_color, error_color_shadow, primary, primary_shadow, success_color, success_color_shadow, tile_bg, white } from '@styles/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

interface TagProps {
    text: string;
    severity?: 'success' | 'error' | 'warning' | 'info';
    onDelete?: () => void;
}

const Tag: React.FC<TagProps> = ({ severity, text, onDelete }) => {
    return (
        <View
            style={[
                styles.tag,
                !severity && styles.default,
                severity === 'success' && styles.success,
                severity === 'error' && styles.error,
                severity === 'warning' && styles.warning,
                severity === 'info' && styles.default,
            ]}
        >
            <Text
                style={{
                    fontSize: DEFAULT.fonsSize.min,
                    fontWeight: DEFAULT.fontWeight.body,
                }}
            >
                {text}
            </Text>
        </View>
    );
};

const styles = EStyleSheet.create({
    tag: {
        backgroundColor: 'transparent',
        borderWidth: DEFAULT.border.width.m,
        borderColor: DEFAULT.border.color,
        borderRadius: DEFAULT.border.radius.m,
        alignSelf: "flex-start",
        paddingHorizontal: DEFAULT.SPACING.XS,
    },
    default: {
        backgroundColor: primary,
        borderColor: primary_shadow,
    },
    success: {
        backgroundColor: success_color,
        borderColor: success_color_shadow,
    },
    error: {
        backgroundColor: error_color,
        borderColor: error_color_shadow,
    },
    warning: {
        backgroundColor: primary,
        borderColor: primary_shadow,
    },
});

export { Tag };
