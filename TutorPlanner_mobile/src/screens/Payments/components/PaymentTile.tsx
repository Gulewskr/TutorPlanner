import { Tile } from '@components/tile';
import { PaymentDTO } from '@model';
import { format } from 'date-fns';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getFullName } from '@utils/utils';

interface StudentTileProps {
    payment: PaymentDTO;
    onClick: () => void;
    severity?: 'error';
}

export const PaymentTile: React.FC<StudentTileProps> = ({
    payment,
    onClick,
}) => {
    const { student } = payment;

    const handleAction = (num: number) => {
        console.log(num);
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <Tile color="white" onClick={onClick}>
                <View
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        gap: 5,
                    }}
                >
                    <Text style={styles.headerText}>
                        {getFullName(student)} {payment.price}zł
                    </Text>
                    <Text style={styles.text}>
                        {format(payment.date, 'yyyy-MM-dd')}
                    </Text>
                </View>
            </Tile>
        </View>
    );
};

const styles = EStyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
