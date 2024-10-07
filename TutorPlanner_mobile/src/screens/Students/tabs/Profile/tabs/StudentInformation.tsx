import { Text } from 'react-native';
import { StudentProfileTabParamList } from '../StudentProfile';
import React from 'react';
import { StudentsLayout } from '../Layout';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export const StudentInformations: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Info'>
> = props => {
    const { navigation, route } = props;
    return (
        <StudentsLayout {...props}>
            <Text>This is {route.params?.studentId}'s profile</Text>
        </StudentsLayout>
    );
};
