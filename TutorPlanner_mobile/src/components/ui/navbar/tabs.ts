import { PaymentDTO, StudentDTO } from '@model';

export type RootStackParamList = {
    Home: undefined;
    Calendar: undefined;
    Students: { screen: keyof StudentsTabParamList; initial?: boolean };
    Payments: {
        screen: keyof PaymentsTabParamList;
        initial?: boolean;
    };
    CreatePayment: undefined;
    Notes: undefined;
    Settings: undefined;
    Lessons: { screen: keyof LessonsTabParamList; initial?: boolean };
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
