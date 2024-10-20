import React, { useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout } from 'src/screens/Layout';
import { StudentTile } from '../components/StudentTile';
import { ScrollView as CustomScrollView } from '@components/ui/scrool-view';
import { Button } from '@components/button';
import { StudentsTabParamList } from '@components/ui/navbar';
import { useStudentsContext } from '@contexts/StudentContext';
import { LoadWrapper } from '@components/loader';
import { CheckboxTile } from '@components/checkbox';
import { ScrollView, View } from 'react-native';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { getFullName } from '@utils/utils';
import { studentsService } from '@services/students.service';
import { useAlert } from '@contexts/AlertContext';
import { StudentDTO } from '@model';

export const StudentsList: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'List'>
> = ({ navigation, route }) => {
    const [controlEnabled, setControlEnabled] = useState(false);

    const { loading, data: students, fetch } = useStudentsContext();
    const { openModal } = useConfirmModal();
    const { showAlert } = useAlert();

    const handleDeleteEvent = async (stud: StudentDTO) => {
        try {
            await studentsService.delete(stud.id);
            await fetch();
            showAlert({
                message: `Usunięto ${getFullName(stud)}`,
                severity: 'info',
            });
        } catch (err) {
            showAlert({
                message: `Błąd servera`,
                severity: 'danger',
            });
        }
    };

    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            title="Studenci"
            hasHeader
        >
            <View style={{ padding: 10 }}>
                <CheckboxTile onChange={setControlEnabled} label="modyfikuj" />
            </View>
            <CustomScrollView
                styles={{ paddingHorizontal: 10, marginBottom: 100 }}
            >
                <LoadWrapper loading={loading}>
                    {students.map(student => (
                        <StudentTile
                            key={`${student.id}`}
                            student={student}
                            actions={
                                controlEnabled
                                    ? [
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
                                          {
                                              icon: 'trash',
                                              onClick: () => {
                                                  openModal({
                                                      message: `Czy chcesz usunąć ${getFullName(student)}`,
                                                      onConfirm: () => {
                                                          handleDeleteEvent(
                                                              student,
                                                          );
                                                      },
                                                  });
                                              },
                                          },
                                      ]
                                    : []
                            }
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
            </CustomScrollView>
        </Layout>
    );
};
