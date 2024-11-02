import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { useStudentContext } from '../StudentContext';

export const StudentAnalise: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Analise'>
> = props => {
    const { navigation, route } = props;
    const {
        data: { student },
    } = useStudentContext();

    return (
        <StudentsLayout {...props} student={student}>
            <Text>This is {student?.id}'s profile</Text>
        </StudentsLayout>
    );
};
