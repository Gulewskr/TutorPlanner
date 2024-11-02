import { Text } from 'react-native';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useStudentContext } from '../StudentContext';

export const StudentLessons: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Lessons'>
> = props => {
    const { navigation, route } = props;
    const {
        data: { student },
        loading,
    } = useStudentContext();

    return (
        <StudentsLayout {...props} student={student}>
            <Text>This is {student.id}'s profile</Text>
        </StudentsLayout>
    );
};
