import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from '@components/Input';
import { ScrollView } from 'react-native';

//In next version - disable in first release
export const Notes: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Notes'>
> = ({ navigation, route }) => {
    const t = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22,
    ];
    return (
        <Layout
            navigation={navigation}
            route={'Notes'}
            title="Notatki"
            hasHeader
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {t.map(t => (
                    <Input
                        key={t}
                        placeholder="TEST INPUT"
                        label="TEST INPUT"
                        icon="minus"
                    />
                ))}
            </ScrollView>
        </Layout>
    );
};
