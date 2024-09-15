import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomInput from '../../components/input/Input';
import { ICON_NAME } from '../../components/icon/Icon';

//In next version - disable in first release
export const Notes: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Notes'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Notes'}>
            <Text>Notes</Text>
            <CustomInput
                title="TEST INPUT"
                label="TEST INPUT"
                icon="minus"
            ></CustomInput>
        </Layout>
    );
};
