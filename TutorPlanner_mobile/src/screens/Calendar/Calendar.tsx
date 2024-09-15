import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const Calendar: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Calendar'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Calendar'}>
            <Text>This is calendar</Text>
        </Layout>
    );
};
