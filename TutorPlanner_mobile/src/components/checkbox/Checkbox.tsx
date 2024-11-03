import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Tile } from '@components/tile';

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
                style={styles.checkboxBG}
                onPress={toggleCheckbox}
            >
                <View style={[styles.checkbox, isChecked && styles.checked]}>
                    {isChecked && <Icon icon="check" size="xxs" />}
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
                    {isChecked && <Icon icon="check" size="xxs" />}
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
        borderWidth: 1,
        borderColor: '$color_black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: '$color_white',
        borderWidth: 1,
        borderColor: '$color_black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '$color_primary',
    },
    label: {
        fontSize: 16,
    },
});
