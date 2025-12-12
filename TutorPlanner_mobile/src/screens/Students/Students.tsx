import * as React from 'react';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StudentCreate } from './tabs/StudentCreate';
import { StudentsList } from './tabs/StudetntsList';
import { StudentProfile } from './tabs/Profile/StudentProfile';
import {
    NavbarNavigationScreens,
    RootStackParamList,
    StudentsTabParamList,
} from '@components/ui/navbar';
import { setLoadingPage, updateCurrentRoute } from '@contexts/NavbarReducer';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator<StudentsTabParamList>();

export const Students: React.FC<
    BottomTabScreenProps<RootStackParamList, 'Students'>
> = ({ navigation, route }) => {

    useFocusEffect(
        React.useCallback(() => {
            updateCurrentRoute('Students' as NavbarNavigationScreens)
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
        
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
        </Tab.Navigator>
    );
};
