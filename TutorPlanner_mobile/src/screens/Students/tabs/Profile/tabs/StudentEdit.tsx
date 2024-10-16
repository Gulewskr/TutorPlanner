import { StudentProfileTabParamList } from '@components/ui/navbar';
import { Text } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { getFullName } from '@utils/utils';
import { Layout } from 'src/screens/Layout';
import { StudentCreateForm } from 'src/screens/Students/components/StudentCreateForm';

export const StudentEdit: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Edit'>
> = props => {
    const { navigation, route } = props;
    const student = route.params.student;
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            hasHeader
            title={getFullName(student)}
            hasHeaderSeperated
        >
            <StudentCreateForm
                type="edit"
                onCancel={navigation.goBack}
                data={{
                    firstname: student.firstname,
                    lastname: student.surename,
                    price: String(student.defaultPrice || 0),
                }}
                id={student.id}
            />
        </Layout>
    );
};
