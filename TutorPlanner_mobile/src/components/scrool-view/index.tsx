import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

const CustomScrollView: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
        >
            {children}
        </ScrollView>
    );
};

CustomScrollView.displayName = 'ScrollView';

export { CustomScrollView as ScrollView };
