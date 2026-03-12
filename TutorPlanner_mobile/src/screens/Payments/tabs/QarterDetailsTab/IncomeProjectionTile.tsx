import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text, View } from 'react-native';
import { STYLES } from '@styles/theme';
import { LoadingIcon } from '@components-new/loader';

interface IncomeProjectionTileProps {
    income: number;
    expectedIncome: number;
    isLoading: boolean;
}

export const IncomeProjectionTile: React.FC<IncomeProjectionTileProps> = ({
    income,
    expectedIncome,
    isLoading,
}) => {
    return (
        <View style={[
            STYLES.tile,
            {
                width: '100%',
                height: 70
            }
        ]}>
            <View style={{ padding: 5 }}>
                <View style={styles.fullWidthRow}>
                    <Text style={styles.headText}>Zarobki</Text>
                    {isLoading ? <LoadingIcon size='small' /> : <Text>{`${income}zł`}</Text>}
                </View>
                <View style={styles.fullWidthRow}>
                    <Text style={styles.headText}>Przewidywania</Text>
                    {isLoading ? (
                        <LoadingIcon size='small' />
                    ) : (
                        <Text>{`${expectedIncome}zł`}</Text>
                    )}
                </View>
            </View>
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
    fullWidthRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
});
