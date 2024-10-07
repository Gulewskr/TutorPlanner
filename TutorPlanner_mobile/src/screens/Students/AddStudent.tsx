import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentsTabParamList } from './Students';
import { StudentCreateForm } from './components/StudentCreateForm';

export const AddStudent: React.FC<
    NativeStackScreenProps<StudentsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Dodaj ucznia"
            hasHeader
        >
            <StudentCreateForm onCancel={navigation.goBack} />
        </Layout>
    );
};
