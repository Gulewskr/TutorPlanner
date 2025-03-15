import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateLessonForm } from './CreateLessonForm';
import { LessonsTabParamList, NavbarNavigationScreens, RootStackParamList } from '@components/ui/navbar';
import { EditLessonForm } from './EditLessonForm';
import { updateCurrentRoute } from '@contexts/NavbarReducer';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator<LessonsTabParamList>();

export const Lessons: React.FC<
    BottomTabScreenProps<RootStackParamList, 'Lessons'>
> = ({ navigation, route }) => {

    //useFocusEffect(() => {
    //    updateCurrentRoute('Lessons' as NavbarNavigationScreens)
    //});

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
            <Tab.Screen name="List" component={LessonList} />
            <Tab.Screen name="Create" component={CreateLessonForm} />
            <Tab.Screen name="Edit" component={EditLessonForm} />
        </Tab.Navigator>
    );
};

const LessonList: React.FC<
    BottomTabScreenProps<LessonsTabParamList, 'List'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Lessons'}
            title="Lessons"
            hasHeader
        >
            <Text>Lekcje</Text>
        </Layout>
    );
};
