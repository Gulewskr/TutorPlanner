import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from '../Layout';
import { StudentCreateForm } from '../Students/components/StudentCreateForm';
import { View } from 'react-native';
import { RootStackParamList } from '@components/ui/navbar';

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
            <View style={{ padding: 15, width: '100%' }}>
                <StudentCreateForm onCancel={navigation.goBack} />
            </View>
        </Layout>
    );
};
