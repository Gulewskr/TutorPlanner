import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { studentsService } from '@services/students.service';

//TODO - extendend fields
interface CreateLessonData {
    firstname: string;
    lastname: string;
    price: string;
}

const defaultData: CreateLessonData = {
    firstname: '',
    lastname: '',
    price: '80',
};

export const StudentCreateForm: React.FC<{ onCancel: () => void }> = ({
    onCancel,
}) => {
    const handleSubmit = async (data: CreateLessonData): Promise<void> => {
        try {
            const response = await studentsService.create({
                firstname: data.firstname,
                surename: data.lastname,
                defaultPrice: Number(data.price),
            });
            //TODO - move to event in callendar
            console.log(response);
        } catch (e) {
            //TODO - display toast with error notification
        }
    };

    return (
        <FormProvider>
            <FormRenderer
                schema={{
                    title: 'Dodaj ucznia',
                    initValue: defaultData,
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
