import React from 'react';
import { PaymentTile } from '../components/PaymentTile';
import {
    compareDesc
} from 'date-fns';
import { Payment } from '@model';
import { LoadWrapper } from '@components/loader';


interface Props {
    isLoading: boolean;
    payments: Payment[];
    onSelect: (p: Payment) => void;
}

export const PaymentsList: React.FC<Props> = ({isLoading, payments, onSelect}) => {
    return (
        <LoadWrapper loading={isLoading} size="large">
            {payments.sort((a, b) => compareDesc(a.date, b.date))
                    .map(p => (
                        <PaymentTile
                            key={p.id + 1}
                            payment={p}
                            onClick={() =>
                                onSelect(p)
                            }
                        />
                    ))}
        </LoadWrapper>
    );
};
