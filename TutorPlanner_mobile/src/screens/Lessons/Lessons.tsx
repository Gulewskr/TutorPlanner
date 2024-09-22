import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateLessonForm } from './CreateLessonForm';

export type LessonsTabParamList = {
    List: undefined;
    Create: undefined;
};

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
