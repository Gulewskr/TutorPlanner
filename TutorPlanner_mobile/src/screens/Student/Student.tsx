import * as React from 'react';
import { Text } from 'react-native';

export const Student: React.FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
}) => {
    return <Text>Student {route.params.name}'s profile</Text>;
};
