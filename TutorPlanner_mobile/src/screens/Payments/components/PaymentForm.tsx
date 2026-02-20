import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { useAlert } from '@contexts/AlertContext';
import { useStudentsContext } from '@contexts/StudentsContext';
import { Payment, PAYMENTS_TYPES, PaymentType, StudentDTO } from '@model';
import { useIsFocused } from '@react-navigation/native';
import { paymentsService } from '@services/payments.service';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { getFullName } from '@utils/utils';
import { ACCOUNTS } from '@utils/consts';

//TODO - extendend fields
interface CreatePaymentData {
    student: string;
    price: number;
    date?: Date;
    type?: PaymentType;
    account: number;
}

interface PaymentFormProps {
    initialData?: Payment;
    mode?: 'Edit' | 'Create';
    onCancel: () => void;
    cb: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
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
            if (!data.student || data.student == 'none') {
                showAlert({
                    message: 'Wybierz studenta.',
                    severity: 'danger',
                });
                return;
            }
            if (!data.price || data.price < 0) {
                showAlert({
                    message: 'Kwota musi być liczbą dodatnią.',
                    severity: 'danger',
                });
                return;
            }
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
        await paymentsService.create({
            studentId: Number(data.student),
            price: Number(data.price),
            date: data.date ? format(data.date, 'yyyy-MM-dd') : undefined,
            type: data.type || 'DIGITAL',
            accountId: data.account
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
            type: data.type || 'DIGITAL',
            accountId: data.account
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
                          type: initialData.type,
                          account: initialData.account
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
                confirmLabel={
                    mode === 'Create' ? 'Dodaj płatność' : 'Zapisz zmiany'
                }
            />
        </FormProvider>
    );
};

const defaultCreateDate: CreatePaymentData = {
    student: 'none',
    price: 0,
    date: new Date(),
    type: 'DIGITAL',
    account: 0
};

const getFormSchema = (
    students: StudentDTO[],
    initialData: CreatePaymentData = defaultCreateDate,
): FormRendererSchema => {
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
            type: {
                component: 'dropdown',
                componentProps: {
                    label: 'Typ płatności',
                    placeholder: '--Wybierz ucznia--',
                    options: PAYMENTS_TYPES.map(typ => ({
                        value: typ,
                        label: typ, 
                    })),
                }
            },
            account: {
                component: 'dropdown',
                componentProps: {
                    label: 'Konto',
                    placeholder: '--Wybierz konto--',
                    options: ACCOUNTS.map(acc => ({
                        value: acc.id,
                        label: acc.name, 
                    })),
                }
            },
        },
    };
};
