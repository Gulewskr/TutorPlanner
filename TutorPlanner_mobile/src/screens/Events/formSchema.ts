import { FormField, FormRendererSchema } from "@components/complex/form-renderer/model";
import { formatToDayInCalendar } from "@utils/dateUtils";

export interface EventFormData {
    name: string;
    description: string;
    date: string;
    hour: {
        startHour: string;
        endHour: string;
    };
    isWeekly: boolean;
}

const defaultData: EventFormData = {
    name: '',
    description: '',
    date: formatToDayInCalendar(new Date()),
    hour: {
        startHour: '',
        endHour: '',
    },
    isWeekly: false,
};

const FIELDS_SCHEMA: { [name: string]: FormField } = {
    name: {
        component: 'input',
        componentProps: {
            label: 'Nazwa',
            placeholder: '--Nazwa wydarzenia--',
        },
    },
    description: {
        component: 'input',
        componentProps: {
            label: 'Opis',
            placeholder: '--Opis--',
        },
    },
    date: {
        component: 'datepicker',
        componentProps: {
            label: 'Data',
            icon: 'calendar',
            placeholder: '--Data--',
        },
    },
    hour: {
        component: 'hour-input',
        componentProps: {
            label: 'Godzina',
            placeholder: '--Godzina--',
        },
    }
}

export const FORM_SCHEMA: FormRendererSchema = {
    title: 'Dodaj wydarzenie',
    initValue: defaultData,
    fields: {
        ...FIELDS_SCHEMA,
        isWeekly: {
            component: 'checkbox-tile',
            componentProps: {
                label: 'Powtarzaj co tydzień',
            },
        },
    },
};


export const UPDATE_FORM_SCHEMA: FormRendererSchema = {
    title: 'Dodaj wydarzenie',
    initValue: defaultData,
    fields: FIELDS_SCHEMA,
};