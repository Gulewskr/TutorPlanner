import {
    BottomTabScreenProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { StudentInformations } from './tabs/StudentInformation';
import { StudentAnalise } from './tabs/StudentAnalise';
import { StudentLessons } from './tabs/StudentLessons';
import {
    StudentProfileTabParamList,
    StudentsTabParamList,
} from '@components/ui/navbar';
import { StudentEdit } from './tabs/StudentEdit';
import { StudentCreateLessons } from './tabs/StudentCreateLessons';
import { StudentAddPayment } from './tabs/StudentAddPayment';
import { useStudentContext } from './StudentContext';
import { useEffect } from 'react';
export type { StudentProfileTabParamList };

const Tab = createBottomTabNavigator<StudentProfileTabParamList>();

export const StudentProfile: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'Profile'>
> = ({ navigation, route }) => {
    const { refresh } = useStudentContext();
    useEffect(
        () => refresh(route.params.student.id),
        [route.params.student.id],
    );

    return (
        <Tab.Navigator
            initialRouteName="Info"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'none',
                },
            }}
            backBehavior="history"
        >
            <Tab.Screen name="Info" component={StudentInformations} />
            <Tab.Screen name="Lessons" component={StudentLessons} />
            <Tab.Screen name="CreateLessons" component={StudentCreateLessons} />
            <Tab.Screen name="Analise" component={StudentAnalise} />
            <Tab.Screen
                name="Edit"
                component={StudentEdit}
                initialParams={route.params}
            />
            <Tab.Screen name="CreatePayment" component={StudentAddPayment} />
        </Tab.Navigator>
    );
};
