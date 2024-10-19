import { StudentDTO } from '@model';

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
        student: StudentDTO;
        initial?: boolean;
    };
};

export type StudentProfileTabParamList = {
    Info: {
        student: StudentDTO;
    };
    Lessons: {
        student: StudentDTO;
    };
    Analise: {
        student: StudentDTO;
    };
    Edit: {
        student: StudentDTO;
        inProfile?: boolean;
    };
};

export type LessonsTabParamList = {
    List: undefined;
    Create: undefined;
};

export type PaymentsTabParamList = {
    List: undefined;
    Summary: undefined;
    History: undefined;
    Create: undefined;
};
