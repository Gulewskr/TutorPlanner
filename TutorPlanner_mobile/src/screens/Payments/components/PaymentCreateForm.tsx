import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { useAlert } from '@contexts/AlertContext';
import { useStudentsContext } from '@contexts/StudentsContext';
import { PaymentDTO, StudentDTO } from '@model';
import { useIsFocused } from '@react-navigation/native';
import { paymentsService } from '@services/payments.service';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { getFullName } from 'src/utils/utils';

//TODO - extendend fields
interface CreatePaymentData {
    student: string;
    price: number;
    date?: Date;
}

const defaultData: CreatePaymentData = {
    student: '0',
    price: 0,
    date: new Date(),
};

interface PaymentFormProps {
    initialData?: PaymentDTO;
    mode?: 'Edit' | 'Create';
    onCancel: () => void;
    cb: () => void;
}

export const PaymentCreateForm: React.FC<PaymentFormProps> = ({
    onCancel,
    mode = 'Create',
    initialData,
    cb,
}) => {
    const { showAlert } = useAlert();
    const isFocused = useIsFocused();
    const { data: students } = useStudentsContext();
    const handleSubmit = async (data: CreatePaymentData): Promise<void> => {
        try {
            if (mode === 'Create') {
                await handleCreateAction(data);
            } else {
                await handleEditAction(data);
            }
            cb();
        } catch (e) {
            showAlert({
                message: 'Błąd zapisu',
                severity: 'danger',
            });
        }
    };

    const handleCreateAction = async (
        data: CreatePaymentData,
    ): Promise<void> => {
        const response = await paymentsService.create({
            studentId: Number(data.student),
            price: Number(data.price),
            date: data.date ? format(data.date, 'yyyy-MM-dd') : undefined,
        });
        showAlert({
            message: 'Dodano płatnośc',
            severity: 'success',
        });
    };

    const handleEditAction = async (data: CreatePaymentData): Promise<void> => {
        if (!initialData) {
            throw new Error('Brak id zapisu');
        }
        const response = await paymentsService.update(initialData.id, {
            studentId: Number(data.student),
            price: Number(data.price),
            date: data.date ? format(data.date, 'yyyy-MM-dd') : undefined,
        });
        showAlert({
            message: 'Zapisano zmiany',
            severity: 'success',
        });
    };

    const schema = useMemo(
        () =>
            getFormSchema(
                students,
                initialData
                    ? {
                          student: `${initialData.student.id}`,
                          price: initialData.price,
                          date: initialData.date,
                      }
                    : undefined,
            ),
        [isFocused],
    );

    return (
        <FormProvider>
            <FormRenderer
                key={`${isFocused}`}
                schema={schema}
                onSubmit={handleSubmit}
                onCancel={onCancel}
            />
        </FormProvider>
    );
};

const getFormSchema = (
    students: StudentDTO[],
    initialData: CreatePaymentData = defaultData,
): FormRendererSchema => {
    console.log(initialData);
    return {
        title: 'Dodaj płatność',
        initValue: initialData,
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
    };
};
