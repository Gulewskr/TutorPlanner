import { PaymentDTO, StudentDTO } from '@model';

export type BaseStackParam = {
}

export type RootStackParamList = {
    Home: BaseStackParam;
    Calendar: BaseStackParam;
    Students: { screen: keyof StudentsTabParamList; initial?: boolean } & BaseStackParam;
    Payments: {
        screen: keyof PaymentsTabParamList;
        initial?: boolean;
    } & BaseStackParam;
    CreatePayment: BaseStackParam;
    Notes: BaseStackParam;
    Settings: BaseStackParam;
    Lessons: { screen: keyof LessonsTabParamList; initial?: boolean } & BaseStackParam;
};

export type NavbarNavigationScreens = keyof RootStackParamList;

export type StudentsTabParamList = {
    List: undefined;
    Create: undefined;
    Profile: {
        screen: keyof StudentProfileTabParamList;
        initial?: boolean;
        studentId: number;
    };
};

export type StudentProfileTabParamList = {
    Info: undefined;
    Lessons: undefined;
    Analise: undefined;
    Edit: {
        student: StudentDTO;
        inProfile?: boolean;
        onCancel?: () => void;
    };
    CreateLessons: undefined;
    CreatePayment: undefined;
};

export type LessonsTabParamList = {
    List: undefined;
    Create: undefined;
    Edit: {
        lessonId: number;
    };
};

export type PaymentsTabParamList = {
    List: undefined;
    Summary: undefined;
    History: undefined;
    Create: undefined;
    Edit: {
        payment: PaymentDTO;
    };
};
