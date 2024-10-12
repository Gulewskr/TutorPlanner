import {
    BottomTabScreenProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { StudentInformations } from './tabs/StudentInformation';
import { StudentAnalise } from './tabs/StudentAnalise';
import { StudentLessons } from './tabs/StudentLessons';
import { StudentDTO } from '@model';
import { StudentsTabParamList } from '@components/ui/navbar';

export type StudentProfileTabParamList = {
    Info: {
        student: StudentDTO;
    };
    Lessons: {
        student: StudentDTO;
    };
    Analise: {
        student: StudentDTO;
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
