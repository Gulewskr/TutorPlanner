import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { useAlert } from '@contexts/AlertContext';
import { StudentDTO } from '@model';
import { studentsService } from '@services/students.service';

//TODO - extendend fields
interface StudentFormData {
    firstname: string;
    lastname: string;
    price: string;
}

const defaultData: StudentFormData = {
    firstname: '',
    lastname: '',
    price: '',
};

interface StudentFormProps {
    onCancel: () => void;
    type?: 'create' | 'edit';
    cb?: (response: StudentDTO) => void;
    data?: StudentFormData;
    id?: number;
}

export const StudentForm: React.FC<StudentFormProps> = ({
    onCancel,
    type = 'create',
    cb,
    data = defaultData,
    id,
}) => {
    const { showAlert } = useAlert();
    const isCreateMode = type === 'create';

    const handleSubmit = async (data: StudentFormData): Promise<void> => {
        try {
            let response;
            if (isCreateMode) {
                response = await studentsService.create({
                    firstname: data.firstname,
                    surename: data.lastname,
                    defaultPrice: Number(data.price),
                });
            } else {
                if (id == undefined) {
                    throw new Error(`Brak id studenta do zaktualizowania.`);
                }
                response = await studentsService.update(id, {
                    firstname: data.firstname,
                    surename: data.lastname,
                    defaultPrice: Number(data.price),
                });
            }

            if ('id' in response) {
                cb?.(response);
            } else {
                showAlert({
                    message: response.message,
                    severity: 'danger',
                });
            }
        } catch (e) {
            showAlert({
                message: 'Błąd zapisu do bazy danych.',
                severity: 'danger',
            });
        }
    };

    return (
        <FormProvider>
            <FormRenderer
                schema={{
                    title: 'Dodaj ucznia',
                    initValue: data,
                    fields: {
                        firstname: {
                            component: 'input',
                            componentProps: {
                                label: 'Imię',
                                placeholder: '--Podaj imię--',
                            },
                        },
                        lastname: {
                            component: 'input',
                            componentProps: {
                                label: 'Nazwisko',
                                placeholder: '--Podaj nazwisko--',
                            },
                        },
                        price: {
                            component: 'input',
                            componentProps: {
                                label: 'Cena - domyślna',
                                icon: 'payments',
                                placeholder: '--Podaj cene--',
                            },
                        },
                    },
                }}
                onSubmit={handleSubmit}
                onCancel={onCancel}
                confirmLabel={isCreateMode ? 'Dodaj' : 'Zapisz'}
            />
        </FormProvider>
    );
};
