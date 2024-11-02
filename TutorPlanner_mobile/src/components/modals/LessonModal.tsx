import { Button } from '@components/button';
//import { CheckboxTile } from '@components/checkbox';
import { Tile } from '@components/tile';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { LessonDTO } from '@model';
import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface LessonModalProps {
    event: LessonDTO;
    onDelete: (num: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
    event,
    onDelete,
}) => {
    const { openModal } = useConfirmModal();
    const handleDeleteEvent = () => {
        openModal({
            message: `Usunąć ${event.name}?`,
            onConfirm: () => onDelete(event.id),
        });
    };

    return (
        <View style={styles.container}>
            <View style={{ bottom: 5 }}>
                <Text style={styles.label}>{event.name}</Text>
                <Text style={styles.message}>
                    {event.startHour} - {event.endHour}
                </Text>
            </View>
            <View style={styles.double_container}>
                <View style={{ width: '50%' }}>
                    <Tile color="white">
                        <Text>Cena: 60zl</Text>
                    </Tile>
                </View>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="pencil"
                        size="small"
                        onClick={() => console.log(1)}
                        label="Edytuj"
                        severity="warning"
                    />
                </View>
            </View>
            {event.isPaid ? (
                <Tile color="green">
                    <Text>Opłacone</Text>
                </Tile>
            ) : (
                <Tile color="red">
                    <Text>Nieopłacone</Text>
                </Tile>
            )}
            <Button
                onClick={() => console.log(1)}
                icon="students"
                size="small"
                label="Profil ucznia"
                secondary
            />
            <View style={{ marginTop: 30, width: '50%' }}>
                {event.isCanceled ? (
                    <Button
                        icon="trash"
                        size="small"
                        onClick={handleDeleteEvent}
                        label="Usuń"
                        severity="error"
                    />
                ) : (
                    <Button
                        size="small"
                        onClick={() => console.log(event)}
                        label="Anuluj zajęcia"
                        severity="error"
                    />
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
    double_container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: 5,
    },
    double_button_container: {},
});
