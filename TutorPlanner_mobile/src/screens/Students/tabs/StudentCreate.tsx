import { Layout } from '../../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentsTabParamList } from '@components/ui/navbar';
import { StudentCreateForm } from '../components/StudentCreateForm';
import { View } from 'react-native';

export const StudentCreate: React.FC<
    NativeStackScreenProps<StudentsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Dodaj ucznia"
            hasHeader
            hasHeaderSeperated
        >
            <View style={{ padding: 15, width: '100%' }}>
                <StudentCreateForm onCancel={navigation.goBack} />
            </View>
        </Layout>
    );
};
