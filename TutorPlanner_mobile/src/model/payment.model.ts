import { StudentDTO } from '@model';

type PaymentType = 'DIGITAL' | 'CASH';

const PAYMENTS_TYPES: PaymentType[] = ['DIGITAL', 'CASH'];

type Payment = {
    id: number;
    price: number;
    date: Date;
    student: StudentDTO;
    type: PaymentType;
    account: number;
};

export { PAYMENTS_TYPES };
export type { Payment, PaymentType };
