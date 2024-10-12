import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

interface ScrollViewProps {
    styles?: StyleProp<ViewStyle>;
}

const CustomScrollView: React.FC<PropsWithChildren<ScrollViewProps>> = ({
    children,
    styles,
}) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[{ width: '100%' }, styles]}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
        >
            {children}
        </ScrollView>
    );
};

CustomScrollView.displayName = 'ScrollView';

export { CustomScrollView as ScrollView };
