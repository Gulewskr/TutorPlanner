import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, ICON_NAME } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';

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
    const [selectedValue, setSelectedValue] = useState<
        DropdownOption | undefined
    >(() => {
        if (!options || !defaultValue) {
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
                    {icon && <Icon icon={icon} />}
                    <Text>
                        {selectedValue ? selectedValue.label : placeholder}
                    </Text>
                    <View
                        style={{
                            marginLeft: 'auto',
                            transform: `rotate(${openMenu ? '-90deg' : '90deg'})`,
                        }}
                    >
                        <Icon icon="arrowRight" />
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
            <View style={[styles.shadow]}></View>
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
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 2,
        backgroundColor: '$color_white',
        paddingHorizontal: 5,
        fontSize: 12,
        color: '$color_black',
        width: 120,
        height: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '$color_black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 40,
        borderWidth: 1,
        borderColor: '$color_black',
        borderRadius: 15,
        backgroundColor: '$color_white',
        gap: 10,
        padding: 10,
    },

    shadow: {
        borderRadius: 15,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: '$shadow_color_primary',
        borderWidth: 1,
        borderColor: '$color_black',
        zIndex: -1,
    },

    itemList: {
        backgroundColor: '$tile_bgColor',
        top: -15,
        paddingTop: 15,
        marginBottom: -15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '$color_black',
        borderWidth: 1,
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
