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
export type { StudentProfileTabParamList };

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
            <Tab.Screen
                name="Edit"
                component={StudentEdit}
                initialParams={route.params}
            />
        </Tab.Navigator>
    );
};
