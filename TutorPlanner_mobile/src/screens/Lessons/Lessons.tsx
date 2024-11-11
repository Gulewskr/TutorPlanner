import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateLessonForm } from './CreateLessonForm';
import { LessonsTabParamList, RootStackParamList } from '@components/ui/navbar';
import { EditLessonForm } from './EditLessonForm';

const Tab = createBottomTabNavigator<LessonsTabParamList>();

export const Lessons: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Lessons'>
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
            <Tab.Screen name="List" component={LessonList} />
            <Tab.Screen name="Create" component={CreateLessonForm} />
            <Tab.Screen name="Edit" component={EditLessonForm} />
        </Tab.Navigator>
    );
};

const LessonList: React.FC<
    NativeStackScreenProps<LessonsTabParamList, 'List'>
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
