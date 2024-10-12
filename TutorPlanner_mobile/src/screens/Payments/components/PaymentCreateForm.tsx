import { FormProvider, FormRenderer } from '@components/form-renderer';
import { FormRendererSchema } from '@components/form-renderer/model';
import { StudentDTO } from '@model';
import { paymentsService } from '@services/payments.service';
import { useStudents } from 'src/hooks/useStudents';
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
    const students = useStudents();
    const handleSubmit = async (data: CreatePaymentData): Promise<void> => {
        try {
            console.log(data);
            const response = await paymentsService.create({
                studentId: Number(data.student),
                price: Number(data.price),
                date: data.date,
            });
            console.log(response);
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
    title: 'Dodaj zajęcia',
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
            //TODO change to datepicker
            component: 'input',
            componentProps: {
                label: 'Data',
                icon: 'calendar',
                placeholder: '--Data--',
            },
        },
    },
});
