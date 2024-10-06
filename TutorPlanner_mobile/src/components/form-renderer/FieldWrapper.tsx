import React from 'react';
import { HourInput, Input } from '@components/input';
import { FormRendererComponents } from './model';
import { Checkbox, CheckboxTile } from '@components/checkbox';

interface FieldWrapperProps {
    component: FormRendererComponents;
    componentProps: any;
    onFieldChange: (value: any) => void;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
    component,
    componentProps,
    onFieldChange,
}) => {
    switch (component) {
        case 'input':
            return <Input {...componentProps} onChange={onFieldChange} />;
        case 'checkbox':
            return <Checkbox {...componentProps} onChange={onFieldChange} />;
        case 'checkbox-tile':
            return (
                <CheckboxTile {...componentProps} onChange={onFieldChange} />
            );
        case 'hour-input':
            return <HourInput {...componentProps} onChange={onFieldChange} />;
    }
    throw new Error('Not supported component!');
};
