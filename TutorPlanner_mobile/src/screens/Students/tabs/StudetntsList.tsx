import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Layout } from 'src/screens/Layout';
import { StudentTile } from '../components/StudentTile';
import { ScrollView } from '@components/ui/scrool-view';
import { Button } from '@components/button';
import { StudentsTabParamList } from '@components/ui/navbar';
import { useStudentsContext } from '@contexts/StudentContext';
import { LoadWrapper } from '@components/loader';

export const StudentsList: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'List'>
> = ({ navigation, route }) => {
    const { loading, data: students } = useStudentsContext();

    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            title="Studenci"
            hasHeader
        >
            <ScrollView styles={{ paddingHorizontal: 10 }}>
                <LoadWrapper loading={loading}>
                    {students.map(student => (
                        <StudentTile
                            key={`${student.id}`}
                            student={student}
                            actions={[
                                /*
                                { icon: 'messenger', onClick: () => {} },
                                { icon: 'oneNote', onClick: () => {} },
                                */
                                {
                                    icon: 'pencil',
                                    onClick: () => {
                                        navigation.jumpTo('Profile', {
                                            screen: 'Edit',
                                            student: student,
                                            initial: true,
                                        });
                                    },
                                },
                            ]}
                            onClick={() =>
                                navigation.jumpTo('Profile', {
                                    screen: 'Info',
                                    student: student,
                                })
                            }
                        />
                    ))}
                </LoadWrapper>
                <Button
                    onClick={() => navigation.jumpTo('Create')}
                    icon="addStudent"
                    label="Dodaj ucznia"
                />
            </ScrollView>
        </Layout>
    );
};
