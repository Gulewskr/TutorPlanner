import React from 'react';
import { HourInput, Input } from '@components/input';
import { FormRendererComponents } from './model';
import { Checkbox, CheckboxTile } from '@components/checkbox';
import { Dropdown } from '@components/dropdown';
import { Datepicker } from '@components/datepicker';

interface FieldWrapperProps {
    component: FormRendererComponents;
    componentProps: any;
    onFieldChange: (value: any) => void;
    initialValue: any;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
    component,
    componentProps,
    onFieldChange,
    initialValue,
}) => {
    switch (component) {
        case 'input':
            return (
                <Input
                    defaultValue={initialValue}
                    {...componentProps}
                    onChange={onFieldChange}
                />
            );
        case 'checkbox':
            return (
                <Checkbox
                    defaultValue={initialValue}
                    {...componentProps}
                    onChange={onFieldChange}
                />
            );
        case 'checkbox-tile':
            return (
                <CheckboxTile
                    defaultValue={initialValue}
                    {...componentProps}
                    onChange={onFieldChange}
                />
            );
        case 'dropdown':
            return (
                <Dropdown
                    defaultValue={initialValue}
                    {...componentProps}
                    onChange={onFieldChange}
                />
            );
        case 'datepicker':
            return (
                <Datepicker
                    defaultValue={initialValue}
                    {...componentProps}
                    onChange={onFieldChange}
                />
            );
        case 'hour-input':
            return (
                <HourInput
                    defaultValue={initialValue}
                    {...componentProps}
                    onChange={onFieldChange}
                />
            );
        default:
            throw new Error('Not supported component!');
    }
};
