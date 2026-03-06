export interface FormComponentProps<T> {
    label?: string;
    componentProps: T;
}

export type FormRendererComponents =
    | 'checkbox'
    | 'checkbox-tile'
    | 'dropdown'
    | 'input'
    | 'hour-input'
    | 'datepicker';

export interface FormRendererSchema {
    title?: string;
    initValue: { [name: string]: any };
    fields: { [name: string]: FormField };
}

export interface FormField {
    component: FormRendererComponents;
    componentProps: any;
    fields?: { [name: string]: FormField };
    required?: boolean;
}
