import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Layout } from 'src/screens/Layout';
import { StudentTile } from '../components/StudentTile';
import { StudentsTabParamList } from '../Students';
import { ScrollView } from '@components/scrool-view';
import { Button } from '@components/button';
import { useStudents } from 'src/hooks/useStudents';

export const StudentsList: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'List'>
> = ({ navigation, route }) => {
    const students = useStudents();

    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            title="Studenci"
            hasHeader
        >
            <ScrollView styles={{ paddingHorizontal: 10 }}>
                {students.concat(students).map((student, index) => (
                    <StudentTile
                        key={`${index}-${student.id}`}
                        student={student}
                        onClick={() =>
                            navigation.jumpTo('Profile', {
                                //@ts-ignore
                                screen: 'Info',
                                params: { student: student },
                            })
                        }
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
