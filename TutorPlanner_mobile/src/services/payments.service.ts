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
        if (!body.studentId || !body.price) {
            throw new Error(`Missing data`);
        }
        const response = await axios.post(PAYMENTS_URL, body);
        return response.data;
    };
    update = async (
        paymentId: number,
        body: PaymentCreateRequestBody,
    ): Promise<PaymentDTO | undefined> => {
        if (!body.studentId || !body.price) {
            throw new Error(`Missing data`);
        }
        const response = await axios.put(`${PAYMENTS_URL}/${paymentId}`, body);
        return response.data;
    };
    delete = async (paymentId: number): Promise<void> => {
        const response = await axios.delete(`${PAYMENTS_URL}/${paymentId}`);
        return response.data;
    };
    getAll = async () => await this.getList({});
    getList = async ({
        month,
        year,
    }: {
        month?: number;
        year?: number;
    }): Promise<PaymentDTO[]> => {
        if (!month && !year) {
            const response = await axios.get(PAYMENTS_URL);
            return response.data;
        } else {
            const response = await axios.get(
                `${PAYMENTS_URL}?month=${month}&year=${year}`,
            );
            return response.data;
        }
    };
}

export const paymentsService = new PaymentsService();
