import * as React from 'react';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { lessonsService } from '@services/lessons.service';
import { ActivityIndicator, Text, View } from 'react-native';
import { ScrollView } from '@components/ui/scrool-view';
import { LessonDTO, StudentDTO } from '@model';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { getFullName } from '@utils/utils';
import { LessonsTabParamList } from '@components/ui/navbar';
import { $color_primary } from '@styles/colors';
import { useStudentsContext } from '@contexts/StudentsContext';
import { useAlert } from '@contexts/AlertContext';
import { Button } from '@components/button';
import { format } from 'date-fns';
import { formatToDayInCalendar } from '@utils/dateUtils';
import { useModalContext } from '@contexts/modalContext';
import { LessonCancelationModal } from '@components/modals/LessonCancelationModal';

interface CreateLessonData {
    name: string;
    description: string;
    student: string;
    price: string;
    date: string;
    hour: {
        startHour: string;
        endHour: string;
    };
}

/*
Case:
1. wybraliśmy lekcje -> idLekcji
2. Możemy zmienić:
    nazwa -
    opis -
    student -
    cena - 
    godziny
    dzień - (v2)
3a. zastosuj dla całej serii
    - co z poprzednimi lekcjami? (v2)
3b - pojedynczej lekcji
 */

export const EditLessonForm: React.FC<
    NativeStackScreenProps<LessonsTabParamList, 'Edit'>
> = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(true);
    const [selectedLesson, setSelectedLesson] = React.useState<
        LessonDTO | undefined
    >();
    const [page, setPage] = React.useState(0);
    const [dataToSave, setDataToSave] = React.useState<CreateLessonData>();

    const { setIsOpen, setModalBody } = useModalContext();
    const { showAlert } = useAlert();
    const { loading: studentsLoading, data: students } = useStudentsContext();

    const loadData = async () => {
        setLoading(true);
        try {
            const lesson = await lessonsService.getLesson(
                route.params.lessonId,
            );
            console.log(lesson);
            setSelectedLesson(lesson);
        } catch (err) {
            showAlert({
                message: 'Błąd ładownia danych.',
                severity: 'danger',
            });
        }
        setLoading(false);
    };

    React.useEffect(() => {
        loadData();
    }, [route.params.lessonId]);

    const onSuccess = () => {
        showAlert({
            message: 'Zapisano zmiany',
            severity: 'success',
        });
        navigation.goBack();
    };

    const onError = () => {
        showAlert({
            message: 'Błąd zapisu',
            severity: 'danger',
        });
    };

    const onCancel = (): void => {
        navigation.goBack();
    };

    const handleSubmit = async (data: CreateLessonData): Promise<void> => {
        try {
            if (selectedLesson?.eventSeriesId) {
                setPage(1);
                setDataToSave(data);
            } else {
                await lessonsService.update(selectedLesson!.id, {
                    name: data.name,
                    description: data.description,
                    student: Number(data.student),
                    price: Number(data.price),
                    date: new Date(data.date),
                    startHour: data.hour.startHour,
                    endHour: data.hour.endHour,
                });
                onSuccess();
            }
        } catch (e) {
            onError();
        }
    };

    const handleLessonSeriesUpdate = async (): Promise<void> => {
        try {
            if (!dataToSave) {
                return onError();
            }
            await lessonsService.updateSeries(selectedLesson!.eventSeriesId!, {
                name: dataToSave.name,
                description: dataToSave.description,
                student: Number(dataToSave.student),
                price: Number(dataToSave.price),
                date: new Date(dataToSave.date),
                startHour: dataToSave.hour.startHour,
                endHour: dataToSave.hour.endHour,
            });
            onSuccess();
        } catch (e) {
            onError();
        }
    };

    const handleLessonSingleEntryUpdate = async (): Promise<void> => {
        try {
            if (!dataToSave) {
                return onError();
            }
            await lessonsService.update(selectedLesson!.id, {
                name: dataToSave.name,
                description: dataToSave.description,
                student: Number(dataToSave.student),
                price: Number(dataToSave.price),
                date: new Date(dataToSave.date),
                startHour: dataToSave.hour.startHour,
                endHour: dataToSave.hour.endHour,
            });
            onSuccess();
        } catch (e) {
            onError();
        }
    };

    const handleLessonCancelation = async (): Promise<void> => {
        setModalBody(
            <LessonCancelationModal
                lesson={selectedLesson!}
                cb={navigation.goBack}
            />,
        );
        setIsOpen(true);
    };

    const getSubTitle = (): string => {
        if (!selectedLesson) {
            return '-';
        }
        return `${selectedLesson.name} - ${formatToDayInCalendar(selectedLesson.date)}`;
    };

    return (
        <Layout
            navigation={navigation}
            route={'Lessons'}
            title="Edytuj zajecia"
            subtitle={getSubTitle()}
            hasHeader
            hasHeaderSeperated
        >
            {loading || studentsLoading ? (
                <ActivityIndicator size="large" color={$color_primary} />
            ) : (
                <FormProvider>
                    <ScrollView>
                        <View style={styles.form_container}>
                            {selectedLesson ? (
                                page == 0 ? (
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            gap: 20,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <FormRenderer
                                            schema={getFormSchema(
                                                students,
                                                selectedLesson,
                                            )}
                                            onSubmit={handleSubmit}
                                            onCancel={onCancel}
                                            confirmLabel={'Zapisz'}
                                        />
                                        {selectedLesson.isCanceled || (
                                            <Button
                                                label="Odwołaj zajęcia"
                                                severity="error"
                                                onClick={
                                                    handleLessonCancelation
                                                }
                                            />
                                        )}
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            gap: 20,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text>
                                            Zastosować zmiany dla całej serii?
                                        </Text>
                                        <Button
                                            label="Zastosuj dla wszystkich"
                                            onClick={handleLessonSeriesUpdate}
                                        />
                                        <Button
                                            label={`Zastosuj dla wybranej lekcji ${format(selectedLesson.date, 'yyyy-MM-dd')}`}
                                            onClick={
                                                handleLessonSingleEntryUpdate
                                            }
                                        />
                                        <Button
                                            label="Cofnij"
                                            onClick={() => setPage(0)}
                                        />
                                    </View>
                                )
                            ) : (
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        gap: 20,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text>Błąd ładowania danych</Text>
                                    <Button
                                        label="Spróbuj ponownie"
                                        onClick={loadData}
                                    />
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </FormProvider>
            )}
        </Layout>
    );
};

const getFormSchema = (
    students: StudentDTO[],
    lesson: LessonDTO,
): FormRendererSchema => ({
    title: 'Dodaj zajęcia',
    initValue: {
        name: lesson.name,
        description: lesson.description,
        student: lesson.studentId,
        price: `${lesson.price}`,
        date: lesson.date,
        hour: {
            startHour: lesson.startHour,
            endHour: lesson.endHour,
        },
    },
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
        hour: {
            component: 'hour-input',
            componentProps: {
                label: 'Godzina',
                placeholder: '--Godzina--',
            },
        },
    },
});

const styles = EStyleSheet.create({
    form_container: {
        width: '100%',
        padding: 15,
    },
});
