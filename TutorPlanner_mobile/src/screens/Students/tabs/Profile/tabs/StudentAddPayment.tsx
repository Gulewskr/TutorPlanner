import React from 'react';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AddStudentPayment } from '../forms/AddPayment';

export const StudentAddPayment: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'CreatePayment'>
> = props => {
    const { navigation, route } = props;
    return (
        <StudentsLayout {...props}>
            <AddStudentPayment
                student={route.params?.student}
                navigation={navigation}
            />
        </StudentsLayout>
    );
};
