import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { StudentsTabParamList } from './Students';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type StudentProfileTabParamList = {
    Info: { name: string };
    Lessons: { name: string };
    Analise: { name: string };
};

const Tab = createBottomTabNavigator<StudentProfileTabParamList>();

export const StudentProfile: React.FC<
    NativeStackScreenProps<StudentsTabParamList, 'Profile'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Profil ucznia"
            hasHeader
        >
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
                <Tab.Screen name="Analise" component={StudentAnalise} />
            </Tab.Navigator>
        </Layout>
    );
};

const StudentInformations: React.FC<
    NativeStackScreenProps<StudentProfileTabParamList, 'Info'>
> = ({ navigation, route }) => {
    return <Text>This is {route.params?.name}'s profile</Text>;
};

const StudentLessons: React.FC<
    NativeStackScreenProps<StudentProfileTabParamList, 'Lessons'>
> = ({ navigation, route }) => {
    return <Text>This is {route.params?.name}'s profile</Text>;
};

const StudentAnalise: React.FC<
    NativeStackScreenProps<StudentProfileTabParamList, 'Analise'>
> = ({ navigation, route }) => {
    return <Text>This is {route.params?.name}'s profile</Text>;
};
