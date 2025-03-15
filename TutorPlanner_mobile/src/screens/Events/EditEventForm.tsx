import * as React from 'react';
import { Layout } from '../Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { Text, View } from 'react-native';
import { ScrollView } from '@components/ui/scrool-view';
import { EventsTabParamList } from '@components/ui/navbar';
import { useAlert } from '@contexts/AlertContext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { eventsService } from '@services/events.service';
import { EventFormData, FORM_SCHEMA, UPDATE_FORM_SCHEMA } from './formSchema';
import { formatToDayInCalendar } from '@utils/dateUtils';
import { Button } from '@components/button';

export const EditEventForm: React.FC<
    BottomTabScreenProps<EventsTabParamList, 'Edit'>
> = ({ navigation, route }) => {
    const [page, setPage] = React.useState(0);
    const [formData, setFormData] = React.useState<EventFormData | undefined>();
    const [mode, setMode] = React.useState<'update' | 'cancel'>('update');
    const { showAlert } = useAlert();
    const selectedEvent = route.params.event;

    const handleSubmit = async (data: EventFormData): Promise<void> => {
        try {
            if (selectedEvent.eventSeriesId) {
                setFormData(data);
                setPage(1);
                return;
            }
            showAlert({
                message: 'Pomyślnie zaktualizowano wydarzenie',
                severity: 'success',
            });
            onCancel();
        } catch (e) {
            showErrorAlert();
        }
    };

    const showErrorAlert = () => {
        showAlert({
            message: 'Błąd zapisu',
            severity: 'danger',
        });
    };

    const onCancel = (): void => {
        navigation.goBack();
    };

    const handleCancel = (): void => {
        if (selectedEvent.eventSeriesId) {
            setMode('cancel');
            setPage(1);
            return;
        }
        eventsService.cancel(selectedEvent.id, true);
        onCancel();
    };

    const handleSingleUpdate = async () => {
        try {
            if (mode === 'cancel') {
                await eventsService.cancel(selectedEvent.id, true);
                onCancel();
                return;
            }
            if (!formData) {
                showAlert({
                    message: 'Błąd formularza',
                    severity: 'danger',
                });
                return;
            }
            await eventsService.update(selectedEvent.id, {
                name: formData.name,
                description: formData.description,
                date: new Date(formData.date),
                startHour: formData.hour.startHour,
                endHour: formData.hour.endHour,
                weekly: formData.isWeekly,
            });
            onCancel();
        } catch (e) {
            showErrorAlert();
        }
    };

    const handleSeriesUpdate = async () => {
        try {
            if (mode === 'cancel') {
                await eventsService.cancel(selectedEvent.id, true, true);
                onCancel();
                return;
            }
            if (!formData) {
                showAlert({
                    message: 'Błąd formularza',
                    severity: 'danger',
                });
                return;
            }
            await eventsService.update(
                selectedEvent.id,
                {
                    name: formData.name,
                    description: formData.description,
                    date: new Date(formData.date),
                    startHour: formData.hour.startHour,
                    endHour: formData.hour.endHour,
                    weekly: formData.isWeekly,
                },
                true,
            );
            onCancel();
        } catch (e) {
            showErrorAlert();
        }
    };

    return (
        <Layout
            navigation={navigation}
            title="Edytuj wydarzenie"
            hasHeader
            hasHeaderSeperated
        >
            <FormProvider>
                <ScrollView>
                    {page === 0 && (
                        <>
                            <View style={styles.form_container}>
                                <FormRenderer
                                    schema={{
                                        ...UPDATE_FORM_SCHEMA,
                                        ...(selectedEvent
                                            ? {
                                                  initValue: {
                                                      name: selectedEvent.name,
                                                      description:
                                                          selectedEvent.description,
                                                      date: selectedEvent.date,
                                                      hour: {
                                                          startHour:
                                                              selectedEvent.startHour,
                                                          endHour:
                                                              selectedEvent.endHour,
                                                      },
                                                  },
                                              }
                                            : {}),
                                    }}
                                    onSubmit={handleSubmit}
                                    onCancel={onCancel}
                                />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Button
                                    label="Anuluj wydarzenie"
                                    secondary={true}
                                    icon="cancelled"
                                    onClick={handleCancel}
                                />
                            </View>
                        </>
                    )}
                    {page === 1 && (
                        <View
                            style={{
                                flexDirection: 'column',
                                gap: 20,
                                marginHorizontal: 15,
                                alignItems: 'center',
                            }}
                        >
                            <Text>Zastosować zmiany dla całej serii?</Text>
                            <Button
                                label={
                                    mode === 'update'
                                        ? `Zastosuj dla wybranego wydarzenia (${formatToDayInCalendar(selectedEvent.date)})`
                                        : `Odwołaj wybrane wydarzenie (${formatToDayInCalendar(selectedEvent.date)})`
                                }
                                onClick={handleSingleUpdate}
                            />
                            <Button
                                label={
                                    mode === 'update'
                                        ? `Zastosuj dla wszystkich`
                                        : `Odwołaj wszystkie`
                                }
                                onClick={handleSeriesUpdate}
                            />
                            <Button
                                label="Anuluj"
                                secondary={true}
                                onClick={() => {
                                    setMode('update');
                                    setPage(0);
                                }}
                            />
                        </View>
                    )}
                </ScrollView>
            </FormProvider>
        </Layout>
    );
};

const styles = EStyleSheet.create({
    form_container: {
        width: '100%',
        padding: 15,
    },
});
