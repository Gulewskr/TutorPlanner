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
import { StudentContextProvider } from './StudentContext';
export type { StudentProfileTabParamList };

const Tab = createBottomTabNavigator<StudentProfileTabParamList>();

export const StudentProfile: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'Profile'>
> = ({ navigation, route }) => {
    return (
        <StudentContextProvider student={route.params.student}>
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
                <Tab.Screen
                    name="CreateLessons"
                    component={StudentCreateLessons}
                />
                <Tab.Screen name="Analise" component={StudentAnalise} />
                <Tab.Screen name="Edit" component={StudentEdit} />
                <Tab.Screen
                    name="CreatePayment"
                    component={StudentAddPayment}
                />
            </Tab.Navigator>
        </StudentContextProvider>
    );
};
