import React from 'react';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AddStudentPayment } from '../forms/AddPayment';
import { useStudentContext } from '../StudentContext';

export const StudentAddPayment: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'CreatePayment'>
> = props => {
    const { navigation, route } = props;
    const {
        data: { student },
    } = useStudentContext();

    return (
        <StudentsLayout {...props} student={student}>
            <AddStudentPayment student={student!} navigation={navigation} />
        </StudentsLayout>
    );
};
