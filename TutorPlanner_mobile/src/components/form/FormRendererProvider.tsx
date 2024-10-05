import { createContext, useContext, useMemo, useState } from 'react';
import { getFormComponent } from './helper';

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
export const useFormContext = (schema: any): FormContextHookProps => {
    const context = useContext(FormContext);
    const [formBody] = useMemo(() => {
        if (!context) {
            throw new Error('useForm must be used within a FormProvider');
        }
        const formBody = (
            <>
                {getFormComponent({
                    component: 'input',
                    componentProps: {},
                })}
                {getFormComponent({
                    component: 'checkbox',
                    componentProps: {},
                })}
            </>
        );
        return [formBody];
    }, [schema]);

    return {
        formData: context.formData,
        FormBody: formBody,
    };
};

// FormProvider component to wrap around the form
export const FormProvider = ({ children }: React.PropsWithChildren) => {
    // Initialize form state
    const [formData, setFormData] = useState({});

    // Handle input changes
    const handleDataChange = (name: string, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
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
