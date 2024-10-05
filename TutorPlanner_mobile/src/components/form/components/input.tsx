import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Input, InputProps } from '@components/input';
import EStyleSheet from 'react-native-extended-stylesheet';

interface FormInputProps {
    label?: string;
    componentProps: InputProps;
}

const FormInput: React.FC<FormInputProps> = ({ label, componentProps }) => {
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <Input {...componentProps} />
        </View>
    );
};

export default FormInput;

const styles = EStyleSheet.create({
    label: {},
});
