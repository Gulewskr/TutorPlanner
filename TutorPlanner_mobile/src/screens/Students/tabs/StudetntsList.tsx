import React, { useEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout } from '@screens/Layout';
import { ScrollView as CustomScrollView } from '@components/ui/scrool-view';
import { Button } from '@components-new/button';
import { StudentsTabParamList } from '@components/ui/navbar';
import { useStudentsContext } from '@contexts/StudentsContext';
import { LoadWrapper } from '@components/loader';
import { CheckboxTile } from '@components/checkbox';
import { ScrollView, Text, View } from 'react-native';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { getFullName } from '@utils/utils';
import { studentsService } from '@services/students.service';
import { useAlert } from '@contexts/AlertContext';
import { StudentDTO } from '@model';
import { setLoadingPage } from '@contexts/NavbarReducer';
import { useIsFocused } from '@react-navigation/native';
import { Input } from '@components-new/input';
import { DEFAULT } from '@styles/theme';
import { StudentTile } from '@components-new/tile';

export const StudentsList: React.FC<BottomTabScreenProps<StudentsTabParamList, 'List'>> = ({
    navigation,
    route,
}) => {
    const [controlEnabled, setControlEnabled] = useState(false);

    const { loading, data: students, fetch } = useStudentsContext();
    const [studentFilter, setStudentFilter] = useState('');
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

    const onDelete = async (stud: StudentDTO) => {
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
            <View
                style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    gap: DEFAULT.SPACING.S,
                }}
            >
                <View
                    style={{
                        height: 40,
                        flex: 1,
                    }}
                >
                    <Input
                        textAlign="center"
                        placeholder="wyszukaj ucznia"
                        onChange={v => setStudentFilter(v)}
                    />
                </View>
                <View
                    style={{
                        height: 50,
                        width: 50,
                    }}
                >
                    <Button
                        onClick={() => navigation.jumpTo('Create')}
                        icon="addStudent"
                        type="icon-button"
                        height={50}
                        width={50}
                    />
                </View>
            </View>
            <CustomScrollView styles={{ paddingHorizontal: 10, marginBottom: 60 }}>
                <LoadWrapper loading={loading}>
                    <ScrollView nestedScrollEnabled={true}>
                        <View
                            style={{
                                gap: DEFAULT.SPACING.S,
                                flex: 1,
                                backgroundColor: 'transparent',
                            }}
                        >
                            {students ? (
                                students
                                    .filter(
                                        student =>
                                            !studentFilter ||
                                            `${student.firstname}${student.surename}`
                                                .toLocaleLowerCase()
                                                .includes(studentFilter.toLocaleLowerCase()),
                                    )
                                    .map(student => (
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
                                                                  navigation.jumpTo('Profile', {
                                                                      screen: 'Edit',
                                                                      initial: true,
                                                                      studentId: student.id,
                                                                      params: {
                                                                          student: student,
                                                                      },
                                                                  });
                                                              },
                                                          },
                                                          {
                                                              icon: 'trash',
                                                              onClick: () => {
                                                                  openModal({
                                                                      message: `Czy chcesz usunąć ${getFullName(student)}`,
                                                                      onConfirm: () => {
                                                                          onDelete(student);
                                                                      },
                                                                  });
                                                              },
                                                          },
                                                      ]
                                                    : []
                                            }
                                            onClick={() => handleMoveToStudentProfile(student)}
                                        />
                                    ))
                            ) : (
                                <Text>Brak danych</Text>
                            )}
                        </View>
                    </ScrollView>
                </LoadWrapper>
            </CustomScrollView>
        </Layout>
    );
};
