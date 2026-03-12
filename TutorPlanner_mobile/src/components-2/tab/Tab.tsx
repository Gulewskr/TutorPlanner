import { Icon, ICON_NAME } from '@components/icon';
import { black, disable_bg, old_primary, primary, primary_shadow, tile_bg_shadow, white_bg } from '@styles/colors';
import { $border_width } from '@styles/global';
import { DEFAULT } from '@styles/theme';
import React, { PropsWithChildren, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface TabProps {
    tabs: Array<TabItem<any>>;
    activeTab: string;
    changeActiveTab: (index: number) => void;
}

export interface TabItem<T> {
    id: T;
    isExpanded: boolean;
    text: string;
    hasHiddenLabel?: 'always' | 'whenNotActive';
    icon?: ICON_NAME;
}

const CustomTabs: React.FC<PropsWithChildren<TabProps>> = ({
    tabs,
    activeTab: activeTab,
    changeActiveTab,
}) => {
    return (
        <View style={styles.border}>
            <View style={styles.content}>
                {tabs.map((tab, index) => {
                    const isActive = tab.id === activeTab;
                    const hiddenLabel =
                        tab.hasHiddenLabel === 'always' ||
                        (!isActive && tab.hasHiddenLabel === 'whenNotActive');

                    return (
                        <TouchableOpacity
                            onPress={() => changeActiveTab(index)}
                            key={index}
                            style={[
                                styles.tab,
                                isActive && {
                                    backgroundColor: primary,
                                    paddingHorizontal: 20,
                                    flexGrow: 1,
                                    boxShadow: [
                                        {
                                            offsetX: -5,
                                            offsetY: -5,
                                            blurRadius: 1,
                                            spreadDistance: 0,
                                            color: primary_shadow,
                                            inset: true,
                                        },
                                        {
                                            offsetX: 5,
                                            offsetY: 5,
                                            blurRadius: 1,
                                            spreadDistance: 0,
                                            color: old_primary,
                                            inset: true,
                                        },
                                    ],
                                },
                                tab.isExpanded && styles.expanded_tab,
                                index != 0 && { marginLeft: -1 },
                            ]}
                        >
                            {tab.icon && <Icon icon={tab.icon} />}
                            <Text
                                style={[
                                    styles.text,
                                    (!isActive && !tab.isExpanded) ||
                                        (hiddenLabel && styles.hidden_text),
                                    isActive && styles.active_text,
                                ]}
                            >
                                {tab.text}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

CustomTabs.displayName = 'CustomTabs';

export default CustomTabs;

const styles = EStyleSheet.create({
    border: {
        borderBottomWidth: DEFAULT.border.width.m,
        borderBottomColor: black,
        width: '100%',
        alignItems: 'center',
        marginTop: DEFAULT.SPACING.S
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginHorizontal: DEFAULT.SPACING.M,
    },

    tab: {
        flexDirection: 'row',
        gap: DEFAULT.SPACING.S,
        borderWidth: DEFAULT.border.width.m,
        borderBottomWidth: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minWidth: 30,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: disable_bg,
        boxShadow: DEFAULT.boxShadow.tile.pressed
    },

    text: {
        fontSize: 12,
    },
    hidden_text: {
        display: 'none',
    },
    active_text: {
        fontWeight: 'bold',
        fontSize: 14,
    },

    expanded_tab: {
        flexGrow: 1,
    },
});
