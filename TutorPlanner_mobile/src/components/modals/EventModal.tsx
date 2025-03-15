import { Button } from '@components/button';
import { Icon } from '@components/icon';
import { Tile } from '@components/tile';
import { useAlert } from '@contexts/AlertContext';
import { useModalContext } from '@contexts/modalContext';
import { EventDTO } from '@model';
import { eventsService } from '@services/events.service';
import { mapHourValueToText } from '@utils/dateUtils';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface EventModalProps {
    event: EventDTO;
    goToEditForm: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
    event,
    goToEditForm
}) => {
    const { showAlert } = useAlert();
    const { setIsOpen } = useModalContext();
    const [isSending, setSending] = useState(false);

    const subText = React.useMemo(() => {
        if (!event.startHour && !event.endHour) {
            return '';
        }
        if (!event.endHour) {
            return `Od: ${mapHourValueToText(event.startHour!)}`;
        }
        if (!event.startHour) {
            return `Do: ${mapHourValueToText(event.endHour!)}`;
        }
        {
            `(${mapHourValueToText(event.startHour)} - ${mapHourValueToText(event.endHour)})`;
        }
    }, []);

    const handleRestore = async (): Promise<void> => {
        try {
            setSending(true);
            await eventsService.cancel(event.id, false);
            showAlert({
                message: 'Przywrócono',
                severity: 'success',
            });
            setIsOpen(false);
        } catch (e) {
            showAlert({
                message: 'Błąd',
                severity: 'danger',
            });
        }
        setSending(false);
    };

    const onDelete = async (): Promise<void> => {
        try {
            setSending(true);
            await eventsService.delete(event.id);
            showAlert({
                message: 'Usunięto wydarzenie',
                severity: 'success',
            });
            setIsOpen(false);
        } catch (e) {
            showAlert({
                message: 'Błąd',
                severity: 'danger',
            });
        }
        setSending(false);
    };

    return (
        <View style={styles.container}>
            <View style={{ bottom: 5 }}>
                <Text style={styles.label}>{event.name}</Text>
                <Text style={styles.message}>{subText}</Text>
            </View>
            <View style={styles.description}>
                <Tile color="white" centered={!event.description}>
                    <Text>{event.description || 'Brak opisu'}</Text>
                </Tile>
            </View>
            <View style={{ marginTop: 30, width: '100%' }}>
                {!event.isCanceled ? (
                        <Button
                            icon="pencil"
                            size="small"
                            onClick={() => {
                                setIsOpen(false);
                                goToEditForm();
                            }}
                            label="Edytuj"
                            severity="warning"
                            disabled={isSending}
                        />
                ) : (
                    <View style={styles.footer}>
                        <Button
                            icon="refresh"
                            size="small"
                            onClick={handleRestore}
                            label="Przywróć"
                            severity="warning"
                        />
                        <Button
                            icon='trash'
                            size="small"
                            onClick={onDelete}
                            label="Usuń"
                            severity='error'
                            disabled={isSending}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10,
    },
    label: {
        fontSize: 16,
    },
    message: {
        fontSize: 12,
        textAlign: 'center',
    },
    description: {
        display: 'flex',
        width: '100%',
    },
    footer: {
        display: 'flex',
        width: '100%',
        gap: 10,
    },
});
