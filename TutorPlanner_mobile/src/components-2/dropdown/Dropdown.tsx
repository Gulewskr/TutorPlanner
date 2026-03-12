import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, ICON_NAME } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import { $border_width } from '@styles/global';
import { DEFAULT, DEFAULT_STYLES } from '@styles/theme';
import { primary, white_bg } from '@styles/colors';

interface DropdownOption {
    label: string;
    value: any;
}

interface CheckboxProps {
    label?: string;
    onChange: (v: boolean) => void;
    placeholder?: string;
    icon?: ICON_NAME;
    value?: string;
    options?: DropdownOption[];
    defaultValue?: any;
}

const Dropdown: React.FC<CheckboxProps> = ({
    label,
    placeholder,
    icon,
    options,
    onChange,
    defaultValue,
}) => {
    const [selectedValue, setSelectedValue] = useState<DropdownOption | undefined>(() => {
        if (!options || defaultValue === undefined) {
            return undefined;
        }
        return options.find(opt => opt.value == defaultValue);
    });
    const [openMenu, setOpenMenu] = useState(false);

    const handleChange = (opt: DropdownOption) => {
        onChange(opt.value);
        setSelectedValue(opt);
        setOpenMenu(false);
    };

    return (
        <View style={[styles.input, label && { marginTop: 5 }]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity
                onPress={() => setOpenMenu(!openMenu)}
                style={{
                    zIndex: 1,
                }}
                activeOpacity={1}
            >
                <View style={styles.content}>
                    {icon && (
                        <View
                            style={{
                                borderRightWidth: DEFAULT.border.width.m,
                                borderColor: DEFAULT.border.color,
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: DEFAULT.SPACING.XXS,
                            }}
                        >
                            <Icon icon={icon} />
                        </View>
                    )}
                    <Text style={{marginLeft: DEFAULT.SPACING.S}}>{selectedValue ? selectedValue.label : placeholder}</Text>
                    <View
                        style={{
                            borderLeftWidth: DEFAULT.border.width.m,
                            borderColor: DEFAULT.border.color,
                            marginLeft: 'auto',
                            backgroundColor: primary,
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: DEFAULT.boxShadow.primary.default
                        }}
                    >
                        <Icon icon='arrow-down' rotate={openMenu ? '180deg' : undefined} />
                    </View>
                </View>
            </TouchableOpacity>
            {openMenu && (
                <View style={styles.itemList}>
                    <ScrollView nestedScrollEnabled={true}>
                        {options?.map(opt => (
                            <TouchableOpacity
                                key={opt.value}
                                onPress={() => handleChange(opt)}
                                style={styles.item}
                            >
                                <Text>{opt.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;

const styles = EStyleSheet.create({
    input: {
        position: 'relative',
        width: '100%',
    },

    label: {
        zIndex: 2,
        paddingHorizontal: 5,
        color: '$color_black',
        width: '100%',
        fontSize: DEFAULT.fonsSize.body,
        fontWeight: DEFAULT.fontWeight.bold,
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: DEFAULT_STYLES.input.borderWidth,
        borderColor: DEFAULT_STYLES.input.borderColor,
        borderRadius: DEFAULT_STYLES.input.borderRadius,
        backgroundColor: white_bg,
        boxShadow: DEFAULT.boxShadow.tile.default,
    },

    itemList: {
        backgroundColor: '$tile_bgColor',
        top: -15,
        paddingTop: 15,
        marginBottom: -15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '$color_black',
        borderWidth: $border_width,
        maxHeight: 200,
        zIndex: 0,
    },
    item: {
        borderTopColor: '$color_black',
        borderTopWidth: 1,
        height: 40,
        paddingLeft: 20,
    },
});
