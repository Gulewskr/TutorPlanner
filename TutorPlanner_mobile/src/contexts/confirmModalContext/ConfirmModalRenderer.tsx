import { Button } from '@components/button';
import { DarkTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

export interface ConfirmModalProps {
    onConfirm: (props?: any) => void;
    onCancel: (props?: any) => void;
    hideModal: () => void;
    color?: string;
    message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    message,
    onConfirm,
    hideModal,
    color = '#F16DDC',
    onCancel,
}) => {
    const navigation = useNavigation();

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

        hideModal();
    };

    return (
        <Modal
            transparent={true}
            statusBarTranslucent
            onRequestClose={onCancel}
            presentationStyle="overFullScreen"
            hardwareAccelerated
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: color }]}>
                    <Text style={styles.label}>{message}</Text>
                    {/*<Text style={styles.message}>{message}</Text>*/}
                    <View style={{ flex: 1 }} />
                    <View style={styles.double_button_container}>
                        <View style={{ width: '50%' }}>
                            <Button
                                icon="cancel"
                                size="small"
                                onClick={onCancel}
                                label="Anuluj"
                            />
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ width: '50%' }}>
                            <Button
                                icon="checkbox"
                                size="small"
                                onClick={() => handleConfirm()}
                                label="Potwierdź"
                            />
                        </View>
                    </View>
                    {/*
                    <TouchableOpacity
                        onPress={onCancel}
                        style={styles.closeButton}
                    >
                        <Icon icon="cancel" />
                    </TouchableOpacity>
                    */}
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
        padding: 15,
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        gap: 10,
        minHeight: 200,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        position: 'relative',
        width: '95%',
    },
    closeButton: {
        padding: 15,
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: 5,
    },
    label: {
        width: '100%',
        fontSize: 20,
    },
    message: { fontSize: 16, textAlign: 'center' },
    double_button_container: {
        width: '100%',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
});
