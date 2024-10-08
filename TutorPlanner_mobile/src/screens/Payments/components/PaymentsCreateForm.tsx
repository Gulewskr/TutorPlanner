import { FormProvider, FormRenderer } from '@components/form-renderer';
import { studentsService } from '@services/students.service';

interface createPaymentsData {
    student: string;
    price: string;
}

const defaultData: createPaymentsData = {
    student: '',
    price: '80',
};

export const PaymentsCreateForm: React.FC<{ onCancel: () => void }> = ({
    onCancel,
}) => {
    const handleSubmit = async (data: createPaymentsData): Promise<void> => {
        try {
            // TO-DO: Add after paymentService
            // const response = await paymentsService.create({
            //     student: data.student,
            //     price: Number(data.price),
            // });
        } catch (e) {}
    };

    return (
        <FormProvider>
            <FormRenderer
                schema={{
                    title: 'Dodaj pŁatność',
                    initValue: defaultData,
                    fields: {
                        student: {
                            component: 'dropdown',
                            componentProps: {
                                label: 'Uczeń',
                                placeholder: '--Wybierz ucznia--',
                            },
                        },

                        price: {
                            component: 'input',
                            componentProps: {
                                label: 'Kwota',
                                icon: 'payments',
                                placeholder: '--Podaj kwotę--',
                            },
                        },
                    },
                }}
                onSubmit={handleSubmit}
                onCancel={onCancel}
            />
        </FormProvider>
    );
};
