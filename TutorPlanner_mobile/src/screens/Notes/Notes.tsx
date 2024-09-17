import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomInput from '../../components/input/Input';
import { ICON_NAME } from '../../components/icon/Icon';
import CustomHeader from '../../components/header/Header';

//In next version - disable in first release
export const Notes: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Notes'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Notes'}>
            <CustomHeader
                firstIcon={'back'}
                firstAction={() => navigation.goBack()}
                secondIcon="settings"
                secondAction={() => navigation.navigate('Settings')}
                centered
            >
                Notatki
            </CustomHeader>
            <CustomInput
                title="TEST INPUT"
                label="TEST INPUT"
                icon="minus"
            ></CustomInput>
        </Layout>
    );
};
