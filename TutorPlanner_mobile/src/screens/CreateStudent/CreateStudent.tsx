import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from '../Layout';
import { RootStackParamList } from 'src/App';
import { StudentCreateForm } from '../Students/components/StudentCreateForm';

export const CreateStudent: React.FC<
    NativeStackScreenProps<RootStackParamList, 'CreateStudent'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Dodaj ucznia"
            hasHeader
            hasHeaderSeperated
        >
            <StudentCreateForm onCancel={navigation.goBack} />
        </Layout>
    );
};
