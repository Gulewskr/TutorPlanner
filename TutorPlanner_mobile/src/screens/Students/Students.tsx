import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StudentCreate } from './tabs/StudentCreate';
import { StudentsList } from './tabs/StudetntsList';
import { StudentProfile } from './tabs/Profile/StudentProfile';
import {
    RootStackParamList,
    StudentsTabParamList,
} from '@components/ui/navbar';
import { StudentEdit } from './tabs/StudentEdit';

const Tab = createBottomTabNavigator<StudentsTabParamList>();

export const Students: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Students'>
> = ({ navigation, route }) => {
    return (
        <Tab.Navigator
            initialRouteName="List"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'none',
                },
            }}
            backBehavior="history"
        >
            <Tab.Screen name="List" component={StudentsList} />
            <Tab.Screen name="Profile" component={StudentProfile} />
            <Tab.Screen name="Create" component={StudentCreate} />
            <Tab.Screen name="Edit" component={StudentEdit} />
        </Tab.Navigator>
    );
};
