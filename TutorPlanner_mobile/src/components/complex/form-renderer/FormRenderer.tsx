import { Button } from '@components/button';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFormContext } from './FormRendererProvider';
import { FormRendererSchema } from './model';

interface FormRendererProps {
    schema: FormRendererSchema;
    onSubmit: (data: any) => void | Promise<void>;
    onCancel: () => void;
    cancelLabel?: string;
    confirmLabel?: string;
}

export const FormRenderer: React.FunctionComponent<FormRendererProps> = ({
    schema,
    onCancel,
    onSubmit,
    cancelLabel = 'Anuluj',
    confirmLabel = 'Dodaj',
}) => {
    const { formData, FormBody } = useFormContext(schema);
    const [sendingData, setSendingData] = useState(false);

    const handleSubmit = async () => {
        setSendingData(true);
        await onSubmit(formData);
        setSendingData(false);
    };

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
            }}
        >
            {FormBody}
            <View style={styles.double_button_container}>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="cancel"
                        onClick={onCancel}
                        label={cancelLabel}
                    />
                </View>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="checkbox"
                        onClick={handleSubmit}
                        label={confirmLabel}
                        disabled={sendingData}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    double_button_container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: 5,
    },
});
