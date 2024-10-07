import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';

export const StudentAnalise: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Analise'>
> = props => {
    const { navigation, route } = props;
    return (
        <StudentsLayout {...props}>
            <Text>This is {route.params?.student?.id}'s profile</Text>
        </StudentsLayout>
    );
};
