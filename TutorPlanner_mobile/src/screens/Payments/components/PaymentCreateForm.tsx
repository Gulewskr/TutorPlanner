import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { useStudentsContext } from '@contexts/StudentsContext';
import { StudentDTO } from '@model';
import { paymentsService } from '@services/payments.service';
import { getFullName } from 'src/utils/utils';

//TODO - extendend fields
interface CreatePaymentData {
    student: string;
    price: number;
    date?: string;
}

const defaultData: CreatePaymentData = {
    student: '0',
    price: 0,
    date: '',
};

export const PaymentCreateForm: React.FC<{ onCancel: () => void }> = ({
    onCancel,
}) => {
    const { data: students } = useStudentsContext();
    const handleSubmit = async (data: CreatePaymentData): Promise<void> => {
        try {
            const response = await paymentsService.create({
                studentId: Number(data.student),
                price: Number(data.price),
                date: data.date,
            });
            //TODO - onSuccess
        } catch (e) {
            //TODO - onError
        }
    };

    return (
        <FormProvider>
            <FormRenderer
                schema={getFormSchema(students)}
                onSubmit={handleSubmit}
                onCancel={onCancel}
            />
        </FormProvider>
    );
};

const getFormSchema = (students: StudentDTO[]): FormRendererSchema => ({
    title: 'Dodaj płatność',
    initValue: defaultData,
    fields: {
        student: {
            component: 'dropdown',
            componentProps: {
                label: 'Uczeń',
                icon: 'students',
                placeholder: '--Wybierz ucznia--',
                options: students.map(stud => ({
                    value: stud.id,
                    label: getFullName(stud),
                })),
            },
        },
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
});
