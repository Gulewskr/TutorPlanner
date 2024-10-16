import { Button } from '@components/button';
import { Icon } from '@components/icon';
import { LessonDTO } from '@model';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useConfirmModal } from './ConfirmModalProvider';

interface ConfirmModalProps {
    onConfirm: (props?: any) => void;
    onCancel: (props?: any) => void;
    color?: string;
    message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    message,
    onConfirm,
    color = '#F16DDC',
    onCancel,
}) => {
    const navigation = useNavigation();
    const { setConfirmIsOpen } = useConfirmModal();

    const handleConfirm = () => {
        onConfirm();

        // TO-DO - needs to be verified later
        // const state = navigation.getState();
        // const currentRouteName = state?.routes[state.index].name;

        // currentRouteName &&
        //     navigation.dispatch(
        //         CommonActions.reset({
        //             index: state.index,
        //             routes: [
        //                 { name: currentRouteName },
        //             ],
        //         }),
        //     );

        setConfirmIsOpen(false);
    };

    return (
        <Modal transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: color }]}>
                    <View style={styles.container}>
                        <Text style={styles.label}>Potwierdź Akcję</Text>
                        <Text style={styles.message}>{message}</Text>
                        <View style={styles.double_button_container}>
                            <View style={{ width: '50%' }}>
                                <Button
                                    icon="cancel"
                                    size="small"
                                    onClick={onCancel}
                                    label="Anuluj"
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Button
                                    icon="checkbox"
                                    size="small"
                                    onClick={handleConfirm}
                                    label="Akceptuj"
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={onCancel}
                        style={styles.closeButton}
                    >
                        <Icon icon="cancel" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        gap: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        padding: 15,
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: 5,
    },
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

// const styles = EStyleSheet.create({
//
// });
