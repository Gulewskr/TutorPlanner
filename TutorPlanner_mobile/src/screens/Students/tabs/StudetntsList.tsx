import React, { useEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout } from '@screens/Layout';
import { StudentTile } from '../components/StudentTile';
import { ScrollView as CustomScrollView } from '@components/ui/scrool-view';
import { Button } from '@components/button';
import { StudentsTabParamList } from '@components/ui/navbar';
import { useStudentsContext } from '@contexts/StudentsContext';
import { LoadWrapper } from '@components/loader';
import { CheckboxTile } from '@components/checkbox';
import { Text, View } from 'react-native';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { getFullName } from '@utils/utils';
import { studentsService } from '@services/students.service';
import { useAlert } from '@contexts/AlertContext';
import { StudentDTO } from '@model';
import { setLoadingPage } from '@contexts/NavbarReducer';
import { useIsFocused } from '@react-navigation/native';

export const StudentsList: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'List'>
> = ({ navigation, route }) => {
    const [controlEnabled, setControlEnabled] = useState(false);

    const { loading, data: students, fetch } = useStudentsContext();
    const { openModal } = useConfirmModal();
    const { showAlert } = useAlert();
    const isFocused = useIsFocused();
    
    useEffect(() => {
        fetch();
    }, []);

    if (isFocused && !loading) {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1000);
    }

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

    const handleMoveToStudentProfile = (stud: StudentDTO) => {
        navigation.jumpTo('Profile', {
            screen: 'Info',
            studentId: stud.id,
        });
    };

    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            title="Lista uczniów"
            hasHeader
        >
            <View style={{ padding: 10 }}>
                <CheckboxTile
                    onChange={setControlEnabled}
                    label="Włącz edycje"
                />
            </View>
            <CustomScrollView
                styles={{ paddingHorizontal: 10, marginBottom: 100 }}
            >
                <LoadWrapper loading={loading}>
                    {students ? (
                        students.map(student => (
                            <StudentTile
                                key={`${student.id}`}
                                student={student}
                                actions={
                                    controlEnabled
                                        ? [
                                              //{ icon: 'messenger', onClick: () => {} },
                                              //{ icon: 'oneNote', onClick: () => {} },
                                              {
                                                  icon: 'pencil',
                                                  onClick: () => {
                                                      navigation.jumpTo(
                                                          'Profile',
                                                          {
                                                              screen: 'Edit',
                                                              initial: true,
                                                              studentId:
                                                                  student.id,
                                                              params: {
                                                                  student:
                                                                      student,
                                                              },
                                                          },
                                                      );
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
                                    handleMoveToStudentProfile(student)
                                }
                            />
                        ))
                    ) : (
                        <Text>Brak danych</Text>
                    )}
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
