import { Payment } from "@model";
import { axios } from "@services/baseService";
import { PAYMENTS_URL } from "@services/config";

export interface QuarterDetailsView {
    income: number,
    expectedIncome: number,
    accounts: {
        id: number,
        name: string,
        color: string,
        income: {
            total: number,
            digital: number,
            cash: number
        }
    }[],
    payments: Payment[]
}

export const getQuarterDetails = async ({
    quarter,
    year,
}: {
    quarter: number;
    year: number;
}): Promise<QuarterDetailsView> => {
    const response = await axios.get(
        `${PAYMENTS_URL}/quarterDetails?quarter=${quarter}&year=${year}`,
    );
    return response.data;
};