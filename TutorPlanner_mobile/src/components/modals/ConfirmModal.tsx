import { Button } from '@components/button';
import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useModalContext } from 'src/contexts/modalContext/ModalProvider';

export const ConfirmModal = (message: string) => {
    const { setIsOpen } = useModalContext();
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Potwierdź Akcję</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.double_button_container}>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="cancel"
                        size="small"
                        onClick={() => setIsOpen(false)}
                        label="Anuluj"
                    />
                </View>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="checkbox"
                        size="small"
                        onClick={() => console.log(1)}
                        label="Dodaj"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 5,
    },
    label: {
        fontSize: 20,
    },
    message: { fontSize: 16, textAlign: 'center' },
    double_button_container: {
        marginBottom: 10,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: 5,
    },
});
