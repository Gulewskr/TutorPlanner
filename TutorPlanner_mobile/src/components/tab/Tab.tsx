import { Icon, ICON_NAME } from '@components/icon';
import React, { PropsWithChildren, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface TabProps {
    tabs: Array<TabItem>;
    activeTabIndex: number;
    changeActiveTab: (index: number) => void;
}

export interface TabItem {
    isExpanded: boolean;
    text: string;
    icon?: ICON_NAME;
}

const CustomTabs: React.FC<PropsWithChildren<TabProps>> = ({
    tabs,
    activeTabIndex: activeTab,
    changeActiveTab,
}) => {
    return (
        <View style={styles.border}>
            <View style={styles.content}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        onPress={() => changeActiveTab(index)}
                        key={index}
                        style={[
                            styles.tab,
                            index === activeTab && styles.active_tab,
                            tab.isExpanded && styles.expanded_tab,
                        ]}
                    >
                        {tab.icon && <Icon icon={tab.icon} size="sm" />}

                        <Text
                            style={[
                                activeTab !== index &&
                                !tab.isExpanded &&
                                tab.icon
                                    ? styles.hidden_text
                                    : styles.text,
                            ]}
                        >
                            {tab.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

CustomTabs.displayName = 'CustomTabs';

export default CustomTabs;

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: width,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '90%',
    },

    tab: {
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
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

    expanded_tab: {
        flexGrow: 1,
    },

    active_tab: {
        backgroundColor: '$color_primary',
        paddingHorizontal: 20,
        flexGrow: 1,
    },
});
