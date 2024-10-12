import { StudentDTO } from '@model';

type PaymentDTO = {
    id: number;
    price: number;
    date: Date;
    student: StudentDTO;
};

export type { PaymentDTO };
