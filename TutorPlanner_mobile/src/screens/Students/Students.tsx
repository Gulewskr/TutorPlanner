import * as React from 'react';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentDTO } from '@model';
import { useState } from 'react';
import { studentsService } from '@services/students.service';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StudentProfile } from './StudentProfile';
import { AddStudent } from './AddStudent';
import { Button } from '@components/button';
import { ScrollView } from '@components/scrool-view';
import { StudentTile } from './components/StudentTile';

export type StudentsTabParamList = {
    List: undefined;
    Create: undefined;
    Profile: { name: string };
};

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
            <Tab.Screen name="Create" component={AddStudent} />
        </Tab.Navigator>
    );
};

export const StudentsList: React.FC<
    NativeStackScreenProps<StudentsTabParamList, 'List'>
> = ({ navigation, route }) => {
    const [students, setStudents] = useState<StudentDTO[]>([]);

    React.useEffect(() => {
        initData();
    }, []);
    const initData = async (): Promise<void> => {
        const response = await studentsService.getStudentsList();
        setStudents(response.data);
    };

    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Studenci"
            hasHeader
        >
            <ScrollView>
                {students.concat(students).map((student, index) => (
                    <StudentTile
                        key={`${index}-${student.id}`}
                        student={student}
                    />
                ))}

                {/* TO-DO: Add function to add students (xd)*/}
                <Button
                    onClick={() => console.log(1)}
                    icon="addStudent"
                    label="Dodaj ucznia"
                />
            </ScrollView>
        </Layout>
    );
};
