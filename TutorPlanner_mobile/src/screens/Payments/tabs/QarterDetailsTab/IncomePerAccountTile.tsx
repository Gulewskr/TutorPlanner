import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Pressable, Text, View } from 'react-native';
import { Account } from './account';
import { STYLES } from '@styles/theme';

interface IncomePerAccountTileProps {
    accounts: {
        account: Account;
        isSelected: boolean;
        income: {
            total: number;
            digital: number;
            cash: number;
        };
    }[];
    onSelect: (accountId: number) => void;
}

export const IncomePerAccountTile: React.FC<IncomePerAccountTileProps> = ({
    accounts,
    onSelect,
}) => {
    return (
        <View style={{ gap: 10 }}>
            {accounts.map(({ account, isSelected, income }) => (
                <Pressable
                    key={account.id}
                    style={[
                        STYLES.tile,
                        {
                            width: '100%',
                            height: 70,
                            backgroundColor: isSelected ? account.color : '#b6b6b6'
                        }
                    ]}
                    onPress={() => onSelect(account.id)}
                >
                    <View style={{ padding: 5 }}>
                        <View style={STYLES.fullWidthRow}>
                            <Text style={styles.headText}>{account.name}</Text>
                            <Text>{`${income.total}zł`}</Text>
                        </View>
                        {!!income.cash && (
                            <View style={[STYLES.fullWidthRow, { justifyContent: 'center' }]}>
                                <Text>{`gotówka: ${income.cash}zł`}</Text>
                                <Text>{`przelew: ${income.digital}zł`}</Text>
                            </View>
                        )}
                    </View>
                </Pressable>
            ))}
        </View>
    );
};

const styles = EStyleSheet.create({
    headText: {
        ...STYLES.h3,
        width: '50%',
        textAlign: 'right',
        paddingRight: 10,
    },
});
