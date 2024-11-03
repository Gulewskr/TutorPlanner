import { Button } from '@components/button';
import { Tile } from '@components/tile';
import { useModalContext } from '@contexts/modalContext';
import { PaymentDTO } from '@model';
import { getFullName } from '@utils/utils';
import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface PaymentModalProps {
    payment: PaymentDTO;
    goToEditForm: () => void;
    goToStudentProfile?: () => void;
    onDelete: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
    payment,
    goToEditForm,
    goToStudentProfile,
    onDelete,
}) => {
    const { setIsOpen } = useModalContext();

    return (
        <View style={styles.container}>
            <View style={{ bottom: 5 }}>
                <Text style={styles.label}>{getFullName(payment.student)}</Text>
            </View>
            <View style={{ width: '100%' }}>
                <Tile color="white" centered>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{`Kwota: `}</Text>
                        <Text
                            style={{ fontWeight: 'bold' }}
                        >{`${payment.price}zł`}</Text>
                    </View>
                </Tile>
            </View>
            <View style={{ width: '100%' }}>
                <Tile color="white" centered>
                    <Text>{format(payment.date, 'yyyy-MM-dd')}</Text>
                </Tile>
            </View>
            {goToStudentProfile && (
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        goToStudentProfile();
                    }}
                    icon="students"
                    size="small"
                    label="Profil ucznia"
                    secondary
                />
            )}
            <View
                style={{
                    marginTop: 30,
                    width: '100%',
                    flexDirection: 'row',
                    gap: 5,
                }}
            >
                <View style={{ width: '48%' }}>
                    <Button
                        icon="pencil"
                        size="small"
                        onClick={() => {
                            setIsOpen(false);
                            goToEditForm();
                        }}
                        label="Edytuj"
                        severity="warning"
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Button
                        icon="trash"
                        size="small"
                        onClick={() => {
                            onDelete();
                        }}
                        label="Usuń"
                        severity="error"
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
        fontSize: 22,
        fontWeight: 'bold',
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
});
