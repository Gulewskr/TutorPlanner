import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CreateStudentLesson } from '../forms/CreateLesson';

export const StudentCreateLessons: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'CreateLessons'>
> = props => {
    const { navigation, route } = props;
    return (
        <StudentsLayout {...props}>
            <CreateStudentLesson
                student={route.params?.student}
                navigation={navigation}
            />
        </StudentsLayout>
    );
};
