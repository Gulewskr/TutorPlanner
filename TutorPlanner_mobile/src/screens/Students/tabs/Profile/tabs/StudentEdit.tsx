import React from 'react';
import { StudentProfileTabParamList } from '@components/ui/navbar';
import { useAlert } from '@contexts/AlertContext';
import { useStudentsContext } from '@contexts/StudentContext';
import { StudentDTO } from '@model';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { getFullName } from '@utils/utils';
import { Text, View, ViewStyle } from 'react-native';
import { Layout } from 'src/screens/Layout';
import { StudentForm } from 'src/screens/Students/components/StudentForm';
import { StudentsLayout } from '../Layout';

const FormHeader = (
    <Text
        style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
        }}
    >
        Edycja danych ucznia
    </Text>
);

const containerStyle: ViewStyle = {
    paddingVertical: 0,
    paddingHorizontal: 15,
    width: '100%',
};

export const StudentEdit: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Edit'>
> = props => {
    const { navigation, route } = props;
    const { student, inProfile } = route.params;

    const { fetch: refreshStudentsData } = useStudentsContext();
    const { showAlert } = useAlert();

    const handleStudentUpdate = (data: StudentDTO) => {
        refreshStudentsData();
        showAlert({
            message: `Zaktualizowano dane ucznia.`,
            severity: 'success',
        });
        navigation.jumpTo('Info', {
            student: data,
        });
    };

    return inProfile ? (
        <StudentsLayout {...props}>
            {FormHeader}
            <View style={containerStyle}>
                <StudentForm
                    type="edit"
                    onCancel={() =>
                        navigation.jumpTo('Info', { student: student })
                    }
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
            <View style={containerStyle}>
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
    );
};
