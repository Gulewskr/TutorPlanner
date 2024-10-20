import * as React from 'react';
import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { StudentProfileTabParamList } from '@components/ui/navbar';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { StudentDTO } from '@model';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { paymentsService } from '@services/payments.service';
import { useAlert } from '@contexts/AlertContext';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface AddStudentPaymentData {
    price: string;
    date: string;
}

const defaultData: AddStudentPaymentData = {
    price: '',
    date: '',
};

interface CreateStudentLessonForm {
    student: StudentDTO;
    navigation: BottomTabNavigationProp<
        StudentProfileTabParamList,
        'CreatePayment',
        undefined
    >;
}

export const AddStudentPayment: React.FC<CreateStudentLessonForm> = ({
    student,
    navigation,
}) => {
    const { showAlert } = useAlert();

    const handleSubmit = async (data: AddStudentPaymentData): Promise<void> => {
        try {
            await paymentsService.create({
                date: data.date,
                studentId: student.id,
                price: Number(data.price),
            });
            showAlert({
                severity: 'success',
                message: 'Dodano płatność',
            });
            navigation.jumpTo('Info', {
                student,
            });
        } catch (e) {
            showAlert({
                severity: 'success',
                message: 'Błąd dodawania płatności',
            });
        }
    };

    const handleCancel = (): void => {
        navigation.jumpTo('Info', {
            student: student,
        });
    };

    return (
        <FormProvider>
            <View style={styles.form_container}>
                <FormRenderer
                    schema={FORM_SCHEMA}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </View>
        </FormProvider>
    );
};

const FORM_SCHEMA: FormRendererSchema = {
    title: 'Dodaj płatność',
    initValue: defaultData,
    fields: {
        price: {
            component: 'input',
            componentProps: {
                label: 'Cena',
                icon: 'payments',
                placeholder: '--Podaj cene--',
            },
        },
        date: {
            component: 'datepicker',
            componentProps: {
                label: 'Data',
                icon: 'calendar',
                placeholder: '--Data--',
            },
        },
    },
};

const styles = EStyleSheet.create({
    form_container: {
        width: '100%',
        padding: 15,
    },
});
