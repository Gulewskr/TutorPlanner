import { Layout } from '../../Layout';
import { StudentsTabParamList } from '@components/ui/navbar';
import { Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { getFullName } from '@utils/utils';

export const StudentEdit: React.FC<
    BottomTabScreenProps<StudentsTabParamList, 'Edit'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            hasHeader
            title={getFullName(route.params.student)}
            hasHeaderSeperated
        >
            <View style={{ padding: 15, width: '100%' }}>
                <Text>TODO add edit form</Text>
            </View>
        </Layout>
    );
};
