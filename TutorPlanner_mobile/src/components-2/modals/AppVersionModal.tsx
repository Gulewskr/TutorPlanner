import React from 'react';
import { useModalContext } from '@contexts/modalContext';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface AppVersionModalProps {
    //Probably to remove
    message: string;
    version: string;
}

export const AppVersionModal: React.FC<AppVersionModalProps> = ({
    message,
    version,
}) => {
    const { setIsOpen } = useModalContext();

    return (
        <View style={styles.container}>
            <Text>{message}</Text>
            <Text>Aktualna wersja {version}</Text>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 15,
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
