import { Button } from '@components/button';
import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFormContext } from './FormRendererProvider';
import { FormRendererSchema } from './model';

interface FormRendererProps {
    schema: FormRendererSchema;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export const FormRenderer: React.FunctionComponent<FormRendererProps> = ({
    schema,
    onCancel,
    onSubmit,
}) => {
    const { formData, FormBody } = useFormContext(schema);

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
                    <Button icon="cancel" onClick={onCancel} label="Anuluj" />
                </View>
                <View style={{ width: '50%' }}>
                    <Button
                        icon="checkbox"
                        onClick={() => onSubmit(formData)}
                        label="Dodaj"
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
