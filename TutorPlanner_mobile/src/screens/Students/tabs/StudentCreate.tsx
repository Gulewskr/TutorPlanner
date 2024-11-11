import { Layout } from '../../Layout';
import { StudentsTabParamList } from '@components/ui/navbar';
import { StudentForm } from '../components/StudentForm';
import { View } from 'react-native';
import { StudentDTO } from '@model';
import { useAlert } from '@contexts/AlertContext';
import { useStudentsContext } from '@contexts/StudentsContext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export const StudentCreate: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    const { fetch: refreshStudentsData } = useStudentsContext();
    const { showAlert } = useAlert();

    const handleStudentCreation = (data: StudentDTO) => {
        refreshStudentsData();
        showAlert({
            message: `Zaktualizowano dane ucznia.`,
            severity: 'success',
        });
        navigation.goBack();
        navigation.getParent()?.navigate('Students', {
            screen: 'Profile',
            params: {
                studentId: data.id,
            },
        });
    };

    return (
        <Layout
            navigation={navigation as any}
            route={'Students'}
            title="Dodaj ucznia"
            hasHeader
            hasHeaderSeperated
        >
            <View style={{ padding: 15, width: '100%' }}>
                <StudentForm
                    onCancel={navigation.goBack}
                    cb={handleStudentCreation}
                />
            </View>
        </Layout>
    );
};
