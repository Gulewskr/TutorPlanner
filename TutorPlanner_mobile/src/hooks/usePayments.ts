import { Payment } from '@model';
import { paymentsService } from '@services/payments.service';
import { useEffect, useState } from 'react';

interface PaymentsFilter {
    month: number;
    year: number;
}

export const usePayments = (filter?: PaymentsFilter) => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setDataLoaded] = useState(false);

    const loadData = async (props?: PaymentsFilter) => {
        const response = props
            ? await paymentsService.getList({
                  month: props.month,
                  year: props.year,
              })
            : await paymentsService.getAll();
        if (response) {
            setPayments(response);
            setDataLoaded(true);
        }
    };

    useEffect(() => {
        loadData(filter);
    }, []);

    const fetchPayments = (props?: PaymentsFilter) => {
        setDataLoaded(false);
        loadData(props);
    };

    return { payments, isLoading, fetchPayments };
};
