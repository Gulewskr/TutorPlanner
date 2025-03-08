import { Icon, ICON_NAME } from '@components/icon';
import { $border_width } from '@styles/global';
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
                                isActive && styles.active_tab,
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
        borderBottomWidth: 1,
        borderBottomColor: '$color_black',
        width: '100%',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginHorizontal: 10,
    },

    tab: {
        flexDirection: 'row',
        gap: 10,
        borderWidth: $border_width,
        borderBottomWidth: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minWidth: 50,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
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

    active_tab: {
        backgroundColor: '$color_primary',
        paddingHorizontal: 20,
        flexGrow: 1,
    },
});
