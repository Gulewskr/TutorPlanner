import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CreateStudentLesson } from '../forms/CreateLesson';
import { useStudentContext } from '../StudentContext';
import { LoadWrapper } from '@components/loader';

export const StudentCreateLessons: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'CreateLessons'>
> = props => {
    const { navigation, route } = props;
    const {
        data: { student },
    } = useStudentContext();

    return (
        <StudentsLayout {...props} student={student}>
            <LoadWrapper loading={student === undefined}>
                <CreateStudentLesson
                    key={`${student?.id}-${student?.defaultPrice}`}
                    student={student!}
                    navigation={navigation}
                />
            </LoadWrapper>
        </StudentsLayout>
    );
};
