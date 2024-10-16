import { Button } from '@components/button';
import { CheckboxTile } from '@components/checkbox';
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
    const { setConfirmIsOpen, setMessage, setOnConfirm } = useConfirmModal();
    const handleDeleteEvent = () => {
        setConfirmIsOpen(true);
        setMessage(`Usunąć ${event.name}?`);
        setOnConfirm(() => () => onDelete(event.id));
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
                        icon="addPayment"
                        size="small"
                        onClick={() => console.log(1)}
                        label="Zmień opłatę"
                    />
                </View>
            </View>
            <CheckboxTile onChange={() => console.log(1)} label="Opłacone" />
            <Button
                onClick={() => console.log(1)}
                icon="students"
                size="small"
                label="Profil ucznia"
            />
            <View style={[styles.double_container, { marginTop: 30 }]}>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="pencil"
                        size="small"
                        onClick={() => console.log(event)}
                        label="Edytuj"
                    />
                </View>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="trash"
                        size="small"
                        onClick={handleDeleteEvent}
                        label="Usuń"
                    />
                </View>
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
