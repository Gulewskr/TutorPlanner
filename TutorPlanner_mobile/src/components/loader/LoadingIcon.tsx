import React from 'react';
import { $color_primary } from '@styles/colors';
import { ActivityIndicator } from 'react-native';

interface LoadingIconProps {
    size?: 'large' | 'small';
}

const LoadingIcon: React.FC<React.PropsWithChildren<LoadingIconProps>> = ({
    size = 'large',
}) => (
    <ActivityIndicator size={size} color={$color_primary} />
);

export default LoadingIcon;
            