import { StudentsTabParamList } from '../../Students';
import {
    BottomTabScreenProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { StudentInformations } from './tabs/StudentInformation';
import { StudentAnalise } from './tabs/StudentAnalise';
import { StudentLessons } from './tabs/StudentLessons';

export type StudentProfileTabParamList = {
    Info: {
        studentId: number;
    };
    Lessons: {
        studentId: number;
    };
    Analise: {
        studentId: number;
    };
};

const Tab = createBottomTabNavigator<StudentProfileTabParamList>();

export const StudentProfile: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'Profile'>
> = ({ navigation, route }) => {
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
            <Tab.Screen
                name="Info"
                component={StudentInformations}
                initialParams={route.params}
            />
            <Tab.Screen
                name="Lessons"
                component={StudentLessons}
                initialParams={route.params}
            />
            <Tab.Screen
                name="Analise"
                component={StudentAnalise}
                initialParams={route.params}
            />
        </Tab.Navigator>
    );
};
