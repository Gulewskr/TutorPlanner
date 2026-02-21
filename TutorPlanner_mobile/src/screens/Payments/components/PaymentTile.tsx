import { Tile } from '@components/tile';
import { format } from 'date-fns';
import { Text, View } from 'react-native';
import { getFullName } from '@utils/utils';
import { Payment } from '@model';
import { STYLES } from '@styles/theme';

interface StudentTileProps {
    payment: Payment;
    onClick: () => void;
    severity?: 'error';
    customColor?: string;
}

export const PaymentTile: React.FC<StudentTileProps> = ({
    payment,
    onClick,
    customColor,
}) => {
    const { student } = payment;

    const handleAction = (num: number) => {
        //TODO
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <Tile color="white" customColor={customColor} onClick={onClick}>
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
                        <Text style={STYLES.h1}>{payment.price}zł</Text>
                    </Text>
                </View>
            </Tile>
        </View>
    );
};
