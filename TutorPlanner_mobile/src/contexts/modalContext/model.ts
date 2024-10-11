export interface ModalComponentProps<T> {
    label?: string;
    componentProps: T;
}

export type ModalRendererComponents = 'tile' | 'button' | 'checkbox-tile';

export interface ModalRendererSchema {
    title?: string;
    fields: { [name: string]: ModalField };
}

export interface ModalField {
    component: ModalRendererComponents;
    componentProps: any;
    fields?: { [name: string]: ModalField };
    required?: boolean;
}
