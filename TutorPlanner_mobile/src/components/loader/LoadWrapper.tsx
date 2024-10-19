import { $color_primary } from '@styles/colors';
import React from 'react';
import { ActivityIndicator } from 'react-native';

interface LoadWrapperProps {
    loading: boolean;
    size?: 'large' | 'small';
}

const LoadWrapper: React.FC<React.PropsWithChildren<LoadWrapperProps>> = ({
    loading,
    children,
    size = 'large',
}) => (
    <>
        {loading ? (
            <ActivityIndicator size={size} color={$color_primary} />
        ) : (
            children
        )}
    </>
);

export default LoadWrapper;
