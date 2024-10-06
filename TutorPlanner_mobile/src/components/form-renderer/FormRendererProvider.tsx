import React, { createContext, useContext, useMemo, useState } from 'react';
import { FieldWrapper } from './FieldWrapper';
import { FormRendererSchema } from './model';

interface FormContextProps {
    formData: any; //Init form data
    handleDataChange: (name: string, value: any) => void;
}

interface FormContextHookProps {
    formData: any; //Init form data
    FormBody: React.ReactNode;
}

const defaultFormContext: FormContextProps = {
    formData: undefined,
    handleDataChange: (name: string, value: any) => {},
};

// Create a context for the form
const FormContext: React.Context<FormContextProps> =
    createContext(defaultFormContext);

// Custom hook to use the form context
export const useFormContext = (
    schema: FormRendererSchema,
): FormContextHookProps => {
    const { formData, handleDataChange } = useContext(FormContext);
    const [formBody] = useMemo(() => {
        if (!handleDataChange) {
            throw new Error('useForm must be used within a FormProvider');
        }

        const formBody = (
            <>
                {Object.entries(schema.fields).map(
                    ([fieldName, field], index) => {
                        return (
                            <FieldWrapper
                                key={`${fieldName}-${index}`}
                                component={field.component}
                                componentProps={field.componentProps}
                                onFieldChange={(v: string) => {
                                    handleDataChange(fieldName, v);
                                }}
                            />
                        );
                    },
                )}
            </>
        );
        return [formBody];
    }, [schema]);

    return {
        formData: formData,
        FormBody: formBody,
    };
};

// FormProvider component to wrap around the form
export const FormProvider = ({ children }: React.PropsWithChildren) => {
    const [formData, setFormData] = useState({});

    const handleDataChange = (name: string, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = (data: any, schema: FormRendererSchema) => {
        //TODO
    };

    return (
        <FormContext.Provider
            value={{
                formData,
                handleDataChange,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
