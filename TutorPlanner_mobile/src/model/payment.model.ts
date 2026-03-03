import { StudentDTO } from '@model';

type PaymentType = 'DIGITAL' | 'CASH';

const PAYMENTS_TYPES: PaymentType[] = ['DIGITAL', 'CASH'];

type Payment = {
    id: number;
    value: number;
    date: Date;
    student: StudentDTO;
    type: PaymentType;
    accountId: number;
};

export { PAYMENTS_TYPES };
export type { Payment, PaymentType };
