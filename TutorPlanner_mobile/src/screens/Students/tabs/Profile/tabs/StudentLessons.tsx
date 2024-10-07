import { Text } from 'react-native';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export const StudentLessons: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Lessons'>
> = props => {
    const { navigation, route } = props;
    return (
        <StudentsLayout {...props}>
            <Text>This is {route.params?.student?.id}'s profile</Text>
        </StudentsLayout>
    );
};
