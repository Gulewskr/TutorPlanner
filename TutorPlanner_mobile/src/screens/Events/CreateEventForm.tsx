import * as React from 'react';
import { Layout } from '../Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { View } from 'react-native';
import { ScrollView } from '@components/ui/scrool-view';
import { EventsTabParamList } from '@components/ui/navbar';
import { useAlert } from '@contexts/AlertContext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { eventsService } from '@services/events.service';
import { EventFormData, FORM_SCHEMA } from './formSchema';

export const CreateEventForm: React.FC<
    BottomTabScreenProps<EventsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    const { showAlert } = useAlert();
    const handleSubmit = async (data: EventFormData): Promise<void> => {
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

const styles = EStyleSheet.create({
    form_container: {
        width: '100%',
        padding: 15,
    },
});
