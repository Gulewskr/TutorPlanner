import React, { useEffect, useMemo, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { PaymentsLayout } from '../../PaymentsLayout';
import { ScrollView } from '@components/ui/scrool-view';
import { Header } from '@components/header';
import { PaymentsTabParamList } from '@components/ui/navbar';
import { compareDesc } from 'date-fns';
import { setLoadingPage } from '@contexts/NavbarReducer';
import { IncomeProjectionTile } from './IncomeProjectionTile';
import { IncomePerAccountTile } from './IncomePerAccountTile';
import { Account, ACCOUNTS } from './account';
import { LoadWrapper } from '@components/loader';
import { PaymentTile } from '@screens/Payments/components/PaymentTile';
import { PageNavigation } from '@screens/Payments/components/PageNavigation';
import { View } from 'react-native';
import { getQuarterDetails } from '@services/payments/get-quarter-details-view';
import { useAlert } from '@contexts/AlertContext';
import { useQuery } from '@tanstack/react-query';

const CASH_ACCOUNT: Account = {
    id: -1,
    name: 'Gotówka',
    color: '#75f16a',
};

export const PaymentsQuarterDetailsTab: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'QuarterDetails'>
> = props => {
    const [selectedAccounts, setSelectedAccounts] = useState<Set<number>>(
        new Set(),
    );
    const { showAlert } = useAlert();
    const [queryParam, setQueryParam] = useState<{
        quarter: number;
        year: number;
    }>({
        quarter: Math.floor(new Date().getMonth() / 3) + 1,
        year: new Date().getFullYear(),
    });
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['quarter-details', queryParam],
        queryFn: () => getQuarterDetails(queryParam),
    });
    useEffect(() => {
        if (isError) {
            showAlert({
                message: 'Błąd ładowania widoku kwartalnego',
                severity: 'danger',
            });
        }
    }, [isError]);

    const isFocused = useIsFocused();

    if (isFocused && !isLoading) {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1000);
    }

    const accountsData = useMemo(
        () =>
            data?.accounts.map(a => ({
                account: {
                    id: a.id,
                    name: a.name,
                    color: a.color,
                },
                isSelected: selectedAccounts.has(a.id),
                income: a.income,
            })) || [],
        [data],
    );

    useEffect(() => {
        if (selectedAccounts.size === 0 && accountsData.length) {
            setSelectedAccounts(
                new Set(accountsData.map(({ account }) => account.id)),
            );
        }
    }, [selectedAccounts]);

    return (
        <PaymentsLayout {...props}>
            <View style={{ paddingHorizontal: 10 }}>
                <PageNavigation
                    onPrev={() => {
                        setQueryParam(prev =>
                            prev.quarter > 1
                                ? {
                                      ...prev,
                                      quarter: prev.quarter - 1,
                                  }
                                : {
                                      quarter: 3,
                                      year: prev.year - 1,
                                  },
                        );
                    }}
                    onNext={() => {
                        setQueryParam(prev =>
                            prev.quarter < 4
                                ? {
                                      ...prev,
                                      quarter: prev.quarter + 1,
                                  }
                                : {
                                      quarter: 1,
                                      year: prev.year + 1,
                                  },
                        );
                    }}
                    title={`Q${queryParam.quarter} ${queryParam.year}`}
                />
            </View>
            <ScrollView
                styles={{
                    paddingHorizontal: 10,
                    marginBottom: 100,
                }}
            >
                <IncomeProjectionTile
                    income={0}
                    expectedIncome={0}
                    isLoading={isLoading}
                />
                <Header
                    title="Szczegóły"
                    isCentered
                    styles={{ height: 30, marginTop: 10, marginBottom: 10 }}
                />
                <LoadWrapper loading={isLoading} error={isError} size="large">
                    <IncomePerAccountTile
                        accounts={accountsData}
                        onSelect={id => {
                            setSelectedAccounts(prev => {
                                if (prev.size === accountsData.length) {
                                    return new Set([id]);
                                }

                                const next = new Set(prev);
                                next.has(id) ? next.delete(id) : next.add(id);
                                return next;
                            });
                        }}
                    />
                </LoadWrapper>
                <Header
                    title="Płatności"
                    isCentered
                    styles={{ height: 30, marginTop: 10, marginBottom: 10 }}
                />
                <LoadWrapper loading={isLoading} error={isError} size="large">
                    {data?.payments
                        .sort((a, b) => compareDesc(a.date, b.date))
                        .map(p => (
                            <PaymentTile
                                key={p.id + 1}
                                payment={p}
                                onClick={() => {
                                    //TODO
                                }}
                                customColor={
                                    p.type === 'CASH'
                                        ? CASH_ACCOUNT.color
                                        : ACCOUNTS.find(a => a.id === p.id)
                                              ?.color
                                }
                            />
                        ))}
                </LoadWrapper>
            </ScrollView>
        </PaymentsLayout>
    );
};
