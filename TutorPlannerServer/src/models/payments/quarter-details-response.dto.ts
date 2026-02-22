import { AccountDTO } from '../accounts/account.dto';
import { PaymentDTO } from './payment-response.dto';

export interface AccountData {
    id: number;
    name: string;
    color: string;
    income: {
        total: number;
        digital: number;
        cash: number;
    };
}

export interface QuarterDetailsView {
    income: number;
    expectedIncome: number;
    accounts: AccountData[];
    payments: PaymentDTO[];
}

export const toQuarterDetailsView = (
    accounts: AccountDTO[],
    payments: PaymentDTO[],
    expectedIncome: number,
): QuarterDetailsView => {
    let income = 0;
    const accountsData: { [accountId: string]: AccountData } = {};
    accounts.forEach(
        a =>
            (accountsData[a.id] = {
                id: a.id,
                name: a.name,
                color: a.color,
                income: {
                    total: 0,
                    digital: 0,
                    cash: 0,
                },
            }),
    );

    payments.forEach(p => {
        income += p.value;
        if (accountsData[p.accountId]) {
            accountsData[p.accountId].income.total += p.value;
            if (p.type === 'CASH') {
                accountsData[p.accountId].income.cash += p.value;
            } else {
                accountsData[p.accountId].income.digital += p.value;
            }
        }
    });

    return {
        income,
        expectedIncome,
        accounts: Object.values(accountsData),
        payments,
    };
};
