import * as React from 'react';
import { Layout } from '../Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { ActivityIndicator, View } from 'react-native';
import { ScrollView } from '@components/ui/scrool-view';
import { StudentDTO } from '@model';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { EventsTabParamList } from '@components/ui/navbar';
import { $color_primary } from '@styles/colors';
import { useStudentsContext } from '@contexts/StudentsContext';
import { useAlert } from '@contexts/AlertContext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { eventsService } from '@services/events.service';
import { formatToDayInCalendar } from '@utils/dateUtils';

interface CreateEventData {
    name: string;
    description: string;
    date: string;
    hour: {
        startHour: string;
        endHour: string;
    };
    isWeekly: boolean;
}

const defaultData: CreateEventData = {
    name: '',
    description: '',
    date: formatToDayInCalendar(new Date()),
    hour: {
        startHour: '',
        endHour: '',
    },
    isWeekly: false,
};

export const CreateEventForm: React.FC<
    BottomTabScreenProps<EventsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    const { showAlert } = useAlert();
    const handleSubmit = async (data: CreateEventData): Promise<void> => {
        try {
            await eventsService.create({
                name: data.name,
                description: data.description,
                date: new Date(data.date),
                startHour: data.hour.startHour,
                endHour: data.hour.endHour,
                weekly: data.isWeekly,
            });
            showAlert({
                message: 'Pomyślnie dodano wydarzenie',
                severity: 'success',
            });
            navigation.goBack();
        } catch (e) {
            showAlert({
                message: 'Błąd zapisu',
                severity: 'danger',
            });
        }
    };

    const handleCancel = (): void => {
        navigation.goBack();
    };

    return (
        <Layout
            navigation={navigation}
            title="Dodaj wydarzenie"
            hasHeader
            hasHeaderSeperated
        >
            <FormProvider>
                <ScrollView>
                    <View style={styles.form_container}>
                        <FormRenderer
                            schema={FORM_SCHEMA}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </View>
                </ScrollView>
            </FormProvider>
        </Layout>
    );
};

const FORM_SCHEMA: FormRendererSchema = {
    title: 'Dodaj wydarzenie',
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
                label: 'Powtarzaj co tydzień',
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
