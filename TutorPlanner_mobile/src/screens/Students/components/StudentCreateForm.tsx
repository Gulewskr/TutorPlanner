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
    price: '80',
};

interface StudentFormProps {
    onCancel: () => void;
    type?: 'create' | 'edit';
    cb?: (response: StudentDTO) => void;
    data?: StudentFormData;
    id?: number;
}

export const StudentCreateForm: React.FC<StudentFormProps> = ({
    onCancel,
    type = 'create',
    cb,
    data = defaultData,
    id,
}) => {
    const { showAlert } = useAlert();

    const handleSubmit = async (data: StudentFormData): Promise<void> => {
        try {
            const response =
                type === 'create'
                    ? await studentsService.create({
                          firstname: data.firstname,
                          surename: data.lastname,
                          defaultPrice: Number(data.price),
                      })
                    : await studentsService.create({
                          firstname: data.firstname,
                          surename: data.lastname,
                          defaultPrice: Number(data.price),
                      });
            //TODO - move to event in callendar
            console.log(response);
            if ('id' in response) {
                cb?.(response);
            } else {
                showAlert({
                    message: response.message,
                    severity: 'danger',
                });
            }
        } catch (e) {
            //TODO - display toast with error notification
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
            />
        </FormProvider>
    );
};
