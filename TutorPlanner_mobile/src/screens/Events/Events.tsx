import * as React from 'react';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateEventForm } from './CreateEventForm';
import { EventsTabParamList, RootStackParamList } from '@components/ui/navbar';
import { EditEventForm } from './EditEventForm';

const Tab = createBottomTabNavigator<EventsTabParamList>();

export const Events: React.FC<
    BottomTabScreenProps<RootStackParamList, 'Events'>
> = () => {

    return (
        <Tab.Navigator
            initialRouteName="Create"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'none',
                },
            }}
            backBehavior="history"
        >
            <Tab.Screen name="Create" component={CreateEventForm} />
            <Tab.Screen name="Edit" component={EditEventForm} />
        </Tab.Navigator>
    );
};
