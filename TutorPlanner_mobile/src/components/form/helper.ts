import React from 'react';
import FormInput from './components/input';
import { View } from 'react-native';

type FormRendererComponents = 'checkbox' | 'input' | 'hour-input';

interface Props {
    component: FormRendererComponents;
    componentProps: any;
}

export const getFormComponent = ({ component, componentProps }: Props): any => {
    switch (component) {
        case 'input':
            return FormInput;
        case 'checkbox':
            break;
        case 'hour-input':
            break;
        default:
            throw new Error('Not supported component!');
    }
    return View;
};
