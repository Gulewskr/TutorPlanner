import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { lessonsService } from '@services/lessons.service';
import { View } from 'react-native';
import { ScrollView } from '@components/ui/scrool-view';
import { StudentProfileTabParamList } from '@components/ui/navbar';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { StudentDTO } from '@model';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAlert } from '@contexts/AlertContext';

interface CreateStudentLessonData {
    name: string;
    description: string;
    price: string;
    date: string;
    hour: {
        startHour: string;
        endHour: string;
    };
    isWeekly: boolean;
}

const defaultData: CreateStudentLessonData = {
    name: '',
    description: '',
    price: '',
    date: '',
    hour: {
        startHour: '',
        endHour: '',
    },
    isWeekly: false,
};

interface CreateStudentLessonForm {
    student: StudentDTO;
    navigation: BottomTabNavigationProp<
        StudentProfileTabParamList,
        'CreateLessons',
        undefined
    >;
}

export const CreateStudentLesson: React.FC<CreateStudentLessonForm> = ({
    student,
    navigation,
}) => {
    const { showAlert } = useAlert();

    const handleSubmit = async (
        data: CreateStudentLessonData,
    ): Promise<void> => {
        try {
            await lessonsService.create({
                name: data.name,
                description: data.description,
                student: student.id,
                price: Number(data.price),
                date: new Date(data.date),
                startHour: data.hour.startHour,
                endHour: data.hour.endHour,
                weekly: data.isWeekly,
            });
            showAlert({
                severity: 'success',
                message: 'Utworzono lekcje',
            });
            navigation.jumpTo('Lessons', {
                student,
            });
        } catch (e) {
            showAlert({
                severity: 'danger',
                message: 'Błąd tworzenia lekcji',
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
            <ScrollView>
                <View style={styles.form_container}>
                    <FormRenderer
                        schema={{
                            ...FORM_SCHEMA,
                            initValue: {
                                ...FORM_SCHEMA.initValue,
                                //TODO add numberInput to handle numbers by default
                                price: `${student.defaultPrice}`,
                                name: `Korepetycje ${student.firstname}`,
                            },
                        }}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </View>
            </ScrollView>
        </FormProvider>
    );
};

const FORM_SCHEMA: FormRendererSchema = {
    title: 'Dodaj zajęcia',
    initValue: defaultData,
    fields: {
        name: {
            component: 'input',
            componentProps: {
                label: 'Nazwa',
                placeholder: '--Nazwa wydarzenia--',
            },
        },
        description: {
            component: 'input',
            componentProps: {
                label: 'Opis',
                placeholder: '--Opis--',
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
        hour: {
            component: 'hour-input',
            componentProps: {
                label: 'Godzina',
                placeholder: '--Godzina--',
            },
        },
        isWeekly: {
            component: 'checkbox-tile',
            componentProps: {
                label: 'Zajęcia cotygodniowe',
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
