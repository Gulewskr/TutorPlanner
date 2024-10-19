import { Layout } from '../../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentsTabParamList } from '@components/ui/navbar';
import { StudentForm } from '../components/StudentForm';
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
                <StudentForm onCancel={navigation.goBack} />
            </View>
        </Layout>
    );
};
