import { Text, View } from 'react-native';
import { StudentProfileTabParamList } from '../StudentProfile';
import React from 'react';
import { StudentsLayout } from '../Layout';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Input } from '@components/input';
import { Button } from '@components/button';
import { Tile } from '@components/tile';
import { StudentNextLesson } from 'src/screens/Students/components/StudentNextLesson';

export const StudentInformations: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Info'>
> = props => {
    const { navigation, route } = props;
    const student = route?.params?.student;
    return (
        <StudentsLayout {...props}>
            <View style={styles.double_button_container}>
                <View style={{ width: '48%' }}>
                    <Tile color="white" hasShadow>
                        <Text>
                            Cena:{' '}
                            <Text style={{ fontWeight: 'bold' }}>
                                {student.defaultPrice}
                                zł
                            </Text>
                        </Text>
                    </Tile>
                </View>
                <View style={{ width: '48%' }}>
                    <Button
                        icon="addPayment"
                        label="Zmień cenę"
                        onClick={function (): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Tile color="white" hasShadow>
                        <Text>
                            Bilans:{' '}
                            <Text style={{ fontWeight: 'bold' }}>
                                {0}
                                zł
                            </Text>
                        </Text>
                    </Tile>
                </View>
                <View style={{ width: '48%' }}>
                    <Button
                        icon="addPayment"
                        label="Dodaj wpłate"
                        secondary
                        onClick={function (): void {
                            throw new Error('Function not implemented.');
                        }}
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
                        onClick={function (): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Button
                        icon="list"
                        label="Lista zajęć"
                        secondary
                        onClick={function (): void {
                            throw new Error('Function not implemented.');
                        }}
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
