import * as React from 'react';
import { Text } from 'react-native';

export const Profile: React.FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};
