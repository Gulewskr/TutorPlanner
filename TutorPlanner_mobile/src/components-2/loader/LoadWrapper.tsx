import { $color_primary } from '@styles/colors';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

interface LoadWrapperProps {
    loading: boolean;
    error?: boolean;
    errorMessage?: string;
    size?: 'large' | 'small';
}

const LoadWrapper: React.FC<React.PropsWithChildren<LoadWrapperProps>> = ({
    loading,
    error,
    errorMessage = 'Błąd',
    children,
    size = 'large',
}) => (
    <>
        {loading ? (
            <ActivityIndicator size={size} color={$color_primary} />
        ) : error ? (
            <Text>{errorMessage}</Text>
        ) : (
            children
        )}
    </>
);

export default LoadWrapper;
