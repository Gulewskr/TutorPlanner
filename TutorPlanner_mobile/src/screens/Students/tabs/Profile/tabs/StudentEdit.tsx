import React, { useMemo } from 'react';
import { StudentProfileTabParamList } from '@components/ui/navbar';
import { useAlert } from '@contexts/AlertContext';
import { useStudentsContext } from '@contexts/StudentsContext';
import { StudentDTO } from '@model';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { getFullName } from '@utils/utils';
import { Text, View, ViewStyle } from 'react-native';
import { Layout } from '@screens/Layout';
import { StudentForm } from '@screens/Students/components/StudentForm';
import { StudentsLayout } from '../Layout';
import { useStudentContext } from '../StudentContext';
import { STYLES } from '@styles/theme';

const FormHeader = (
    <Text
        style={{
            ...STYLES.h3,
            textAlign: 'center',
        }}
    >
        Edycja danych ucznia
    </Text>
);

export const StudentEdit: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Edit'>
> = props => {
    const { navigation, route } = props;
    const { student: studentParam, inProfile } = route.params;

    const { fetch: refreshStudentsData } = useStudentsContext();
    const {
        data: { student: studentContext },
        refresh,
    } = useStudentContext();
    const { showAlert } = useAlert();

    const student = useMemo(
        () => studentParam || studentContext,
        [studentParam],
    );

    const handleStudentUpdate = (data: StudentDTO) => {
        refreshStudentsData();
        refresh();
        showAlert({
            message: `Zaktualizowano dane ucznia.`,
            severity: 'success',
        });
        navigation.jumpTo('Info');
    };

    return !student ? (
        <Text>Missing student data</Text>
    ) : (
        <>
            {inProfile ? (
                <StudentsLayout {...props} student={student}>
                    {FormHeader}
                    <View style={STYLES.fullWidthContainer}>
                        <StudentForm
                            type="edit"
                            onCancel={() => navigation.jumpTo('Info')}
                            data={{
                                firstname: student.firstname,
                                lastname: student.surename,
                                price: String(student.defaultPrice || 0),
                            }}
                            id={student.id}
                            cb={handleStudentUpdate}
                        />
                    </View>
                </StudentsLayout>
            ) : (
                <Layout
                    navigation={navigation.getParent()}
                    route={'Students'}
                    hasHeader
                    title={getFullName(student)}
                    hasHeaderSeperated
                >
                    {FormHeader}
                    <View style={STYLES.fullWidthContainer}>
                        <StudentForm
                            type="edit"
                            onCancel={navigation.goBack}
                            data={{
                                firstname: student.firstname,
                                lastname: student.surename,
                                price: String(student.defaultPrice || 0),
                            }}
                            id={student.id}
                            cb={handleStudentUpdate}
                        />
                    </View>
                </Layout>
            )}
        </>
    );
};
