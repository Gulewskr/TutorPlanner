import { Text, View } from 'react-native';
import { StudentProfileTabParamList } from '../StudentProfile';
import React, { useEffect, useState } from 'react';
import { StudentsLayout } from '../Layout';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from '@components/button';
import { Tile } from '@components/tile';
import { StudentNextLesson } from 'src/screens/Students/components/StudentNextLesson';
import { studentsService } from '@services/students.service';
import { StudentDTO } from '@model';

export const StudentInformations: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Info'>
> = props => {
    const { navigation, route } = props;
    const [student, setStudent] = useState<StudentDTO>(route?.params?.student);

    useEffect(() => {
        setStudent(route?.params?.student);
    }, [route?.params?.student]);

    const reloadBalance = async () => {
        const res = await studentsService.recalculateBalance(student.id);
        setStudent(res);
    };

    const goToCreateLesson = (): void =>
        navigation.jumpTo('CreateLessons', {
            student: student,
        });
    const goToLessonsList = (): void =>
        navigation.jumpTo('Lessons', {
            student: student,
        });
    const goToEdit = (): void =>
        navigation.jumpTo('Edit', {
            student: student,
        });
    const goToAddPayment = (): void =>
        navigation.jumpTo('CreatePayment', {
            student: student,
        });

    return (
        <StudentsLayout {...props}>
            <View style={styles.double_button_container}>
                <View style={{ width: '48%' }}>
                    <Tile color="white" hasShadow centered>
                        <Text>
                            Cena:{' '}
                            <Text style={{ fontWeight: 'bold' }}>
                                {student.defaultPrice || 0}
                                zł
                            </Text>
                        </Text>
                    </Tile>
                </View>
                <View style={{ width: '48%' }}>
                    <Button
                        icon="pencil"
                        label="Edytuj"
                        onClick={goToEdit}
                        size="small"
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Button
                        icon="refresh"
                        label={`Bilans: ${student.balance}zł`}
                        onClick={() => {
                            reloadBalance();
                        }}
                        size="small"
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Button
                        icon="addPayment"
                        label="Dodaj wpłate"
                        secondary
                        onClick={goToAddPayment}
                        size="small"
                    />
                </View>
            </View>
            <StudentNextLesson studentId={student.id} />
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
        </StudentsLayout>
    );
};

const styles = EStyleSheet.create({
    double_button_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 5,
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
