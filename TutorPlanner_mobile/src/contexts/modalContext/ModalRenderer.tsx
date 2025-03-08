import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@components/icon';
import {
    $bgColor_primary,
    $color_black,
    $color_primary
} from '@styles/colors';
import { $border_width } from '@styles/global';

interface ModalRendererProps {
    modalBody: React.ReactNode;
    onCancel: () => void;
}

export const ModalRenderer: React.FunctionComponent<ModalRendererProps> = ({
    modalBody,
    onCancel,
}) => {
    return (
        <Modal transparent={true} animationType="fade">
            <View style={styles.modalOverlay}>
                <View
                    style={
                        styles.modalContent
                    }
                >
                    {modalBody}
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
        borderWidth: $border_width,
        borderColor: $color_black,
        backgroundColor: $bgColor_primary,
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
});
