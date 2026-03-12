import { Tile } from '@components/tile';
import { format } from 'date-fns';
import { Pressable, Text, View } from 'react-native';
import { getFullName } from '@utils/utils';
import { Payment } from '@model';
import { DEFAULT, STYLES } from '@styles/theme';
import { tile_bg, white_bg } from '@styles/colors';

interface PaymentTileProps {
    payment: Payment;
    onClick: () => void;
    severity?: 'error';
    customColor?: string;
}

export const PaymentTile: React.FC<PaymentTileProps> = ({
    payment,
    onClick,
    customColor,
}) => {
    const { student } = payment;

    const handleAction = (num: number) => {
        //TODO
    };

    return (
        <Pressable
            onPress={onClick}
            style={[
                {
                    flexDirection: 'row',
                    minHeight: 50,
                    boxShadow: DEFAULT.boxShadow.tile.default,
                    borderRadius: 5,
                    overflow: 'hidden',
                    backgroundColor: white_bg,
                    width: '100%'
                },
                STYLES.border,
            ]}
        >
            <View style={STYLES.list}>
                <Text>
                    <Text style={STYLES.h1}>
                        {getFullName(student)}
                    </Text>
                    {' - '}
                    <Text style={STYLES.text}>
                        {format(payment.date, 'yyyy-MM-dd')}
                    </Text>
                    {' - '}
                    <Text style={STYLES.h1}>{payment.value}zł</Text>
                </Text>
            </View>
        </Pressable>
    );
};
