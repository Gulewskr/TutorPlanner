import { PAYMENTS_URL } from './config';
import { axios } from './baseService';
import { PaymentDTO } from '@model';

interface PaymentCreateRequestBody {
    studentId: number;
    price: number;
    date?: string;
}

class PaymentsService {
    create = async (
        body: PaymentCreateRequestBody,
    ): Promise<PaymentDTO | undefined> => {
        try {
            if (!body.studentId || !body.price) {
                throw new Error(`Missing data`);
            }
            const response = await axios.post(PAYMENTS_URL, body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    getAll = async (): Promise<PaymentDTO[] | undefined> => {
        try {
            const response = await axios.get(PAYMENTS_URL);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
}

export const paymentsService = new PaymentsService();
