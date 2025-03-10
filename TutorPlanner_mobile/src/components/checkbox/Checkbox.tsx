import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Tile } from '@components/tile';
import { $border_width } from '@styles/global';
import { $color_checkbox } from '@styles/colors';

interface CheckboxProps {
    label?: string;
    onChange: (v: boolean) => void;
    defaultValue?: boolean;
}

const CheckboxTile: React.FC<CheckboxProps> = props => {
    return (
        <Tile color="white">
            <Checkbox {...props} />
        </Tile>
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
    container: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    checkboxBG: {
        width: 25,
        height: 25,
        borderRadius: 5,
        backgroundColor: '$shadow_color_primary',
        borderWidth: $border_width,
        borderColor: '$color_black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        width: 25,
        height: 25,
        borderRadius: 5,
        backgroundColor: '$color_white',
        borderWidth: $border_width,
        borderColor: '$color_black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: $color_checkbox,
    },
    label: {
        fontSize: 16,
    },
});
