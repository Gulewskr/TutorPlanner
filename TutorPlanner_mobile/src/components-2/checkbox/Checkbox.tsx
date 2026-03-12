import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Tile } from '@components/tile';
import { $border_width } from '@styles/global';
import { $color_checkbox, success_color, white, white_bg, window_bg } from '@styles/colors';
import { DEFAULT, DEFAULT_STYLES, STYLES } from '@styles/theme';

interface CheckboxProps {
    label?: string;
    onChange: (v: boolean) => void;
    defaultValue?: boolean;
}

const CheckboxTile: React.FC<CheckboxProps> = props => {
    return (
        <View style={[
            STYLES.tile,
            styles.content
        ]}>
            <Checkbox {...props} />
        </View>
    );
};

const Checkbox: React.FC<CheckboxProps> = ({
    defaultValue = false,
    label,
    onChange,
}) => {
    const [isChecked, setIsChecked] = useState(defaultValue);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={toggleCheckbox}
            >
                <View style={[styles.checkbox, isChecked && styles.checked]}>
                    {isChecked && <Icon icon="checkmark" size='md' />}
                </View>
            </TouchableOpacity>
            {label && <Text style={styles.label}>{label}</Text>}
        </View>
    );
};

interface StaticCheckboxProps {
    label?: string;
    isChecked: boolean;
}

const StaticCheckboxTile: React.FC<StaticCheckboxProps> = ({
    label,
    isChecked,
}) => {
    return (
        <Tile color="white">
            <View style={styles.container}>
                <View style={[styles.checkbox, isChecked && styles.checked]}>
                    {isChecked && <Icon icon='checkmark' size="xxs" />}
                </View>
                {label && <Text style={styles.label}>{label}</Text>}
            </View>
        </Tile>
    );
};

Checkbox.displayName = 'Checkbox';
CheckboxTile.displayName = 'CheckboxTile';
StaticCheckboxTile.displayName = 'StaticCheckboxTile';

export { CheckboxTile, StaticCheckboxTile };
export default Checkbox;

const styles = EStyleSheet.create({
    input: {
        position: 'relative',
        width: '100%',
    },

    label: {
        zIndex: 2,
        color: '$color_black',
        width: '100%',
        fontSize: DEFAULT.fonsSize.body,
        fontWeight: DEFAULT.fontWeight.bold,
    },

    content: {
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: DEFAULT_STYLES.input.borderWidth,
        borderColor: DEFAULT_STYLES.input.borderColor,
        borderRadius: DEFAULT_STYLES.input.borderRadius,
        backgroundColor: white_bg,
        boxShadow: DEFAULT.boxShadow.tile.default,
    },
    container: {
        width: '100%',
        paddingHorizontal: DEFAULT.SPACING.S,
        gap: DEFAULT.SPACING.S,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: white,
        borderWidth: DEFAULT.border.width.m,
        borderColor: DEFAULT.border.color,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: success_color,
    },
});
