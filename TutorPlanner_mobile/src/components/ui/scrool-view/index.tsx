import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

interface ScrollViewProps {
    styles?: StyleProp<ViewStyle>;
    contentStyles?: StyleProp<ViewStyle>;
}

const CustomScrollView: React.FC<PropsWithChildren<ScrollViewProps>> = ({
    children,
    styles,
    contentStyles = { alignItems: 'center' },
}) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[{ width: '100%' }, styles]}
            contentContainerStyle={contentStyles}
        >
            {children}
        </ScrollView>
    );
};

CustomScrollView.displayName = 'ScrollView';

export { CustomScrollView as ScrollView };
