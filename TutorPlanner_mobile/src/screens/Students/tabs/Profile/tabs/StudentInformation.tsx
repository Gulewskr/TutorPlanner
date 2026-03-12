import React from 'react';
import { Text, View } from 'react-native';
import { StudentProfileTabParamList } from '../StudentProfile';
import { StudentsLayout } from '../Layout';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from '@components-new/button';
import { StudentNextLesson } from '@screens/Students/components/StudentNextLesson';
import { useStudentContext } from '../StudentContext';
import { ScrollView } from '@components/ui/scrool-view';
import { setLoadingPage } from '@contexts/NavbarReducer';
import { STYLES } from '@styles/theme';

export const StudentInformations: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Info'>
> = props => {
    const { navigation, route } = props;
    const { data, recalculate, refresh, loading } = useStudentContext();

    const { student, studentNextLesson } = data;

    if (!loading) {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1000);
    }


    const goToCreateLesson = (): void => navigation.jumpTo('CreateLessons');
    const goToLessonsList = (): void => navigation.jumpTo('Lessons');
    const reloadBalance = async () => {
        student && recalculate(student.id);
    };
    const goToEdit = (): void =>
        student &&
        navigation.jumpTo('Edit', {
            student: student,
        });
    const goToAddPayment = (): void => navigation.jumpTo('CreatePayment');

    return (
        <StudentsLayout {...props} student={student}>
            <ScrollView>
                <View style={styles.double_button_container}>
                    <View style={{ width: '48%' }}>
                        <View style={{

                        }}>
                            <Text style={[STYLES.tile, {
                                textAlign: 'center',
                                textAlignVertical: 'center'
                            }]}>
                                Bilans: {student?.balance || 0}zł
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '48%' }}>
                        <Button
                            icon="addPayment"
                            label="Dodaj wpłate"
                            secondary
                            onClick={goToAddPayment}
                        />
                    </View>
                    {/*
                    <View style={{ width: '48%' }}>
                        <Button
                            icon="refresh"
                            label={`Bilans: ${student?.balance || 0}zł`}
                            onClick={() => {
                                reloadBalance();
                            }}
                            size="small"
                        />
                    </View>
                    <View style={{ width: '58%' }}>
                        <Button
                            icon="addPayment"
                            label="Dodaj wpłate"
                            secondary
                            onClick={goToAddPayment}
                            size="small"
                        />
                    </View>
                    */}
                </View>
                <StudentNextLesson lesson={studentNextLesson} />
                <View style={styles.double_button_container}>
                    <View style={{ width: '48%' }}>
                        <Button
                            icon="addLesson"
                            label="Dodaj zajęcia"
                            secondary
                            onClick={goToCreateLesson}
                        />
                    </View>
                    <View style={{ width: '48%' }}>
                        <Button
                            icon="list"
                            label="Lista zajęć"
                            secondary
                            onClick={goToLessonsList}
                        />
                    </View>
                </View>
            </ScrollView>
        </StudentsLayout>
    );
};

const styles = EStyleSheet.create({
    double_button_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    controlPanel: {
        gap: 5,
    },
    timeline: {},
});
