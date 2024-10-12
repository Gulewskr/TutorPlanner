import { WEEKDAYS_JS } from '@components/complex/calendar';
import { Icon } from '@components/icon';
import { Tile } from '@components/tile';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface DayTileProps {
    day: Date;
    isSelected: boolean;
    onClick: () => void;
}

export const DayTile: React.FC<DayTileProps> = ({
    day,
    isSelected,
    onClick,
}) => {
    return (
        <View
            style={{
                width: 60,
            }}
        >
            <Tile
                color={isSelected ? 'brightPink' : 'white'}
                onClick={onClick}
                centered
                height={75}
            >
                <View
                    style={[
                        styles.dayTile,
                        isSelected && styles.dayTile_active,
                    ]}
                >
                    <Text
                        style={[
                            styles.dayTile_text,
                            isSelected && styles.dayTile_active_text,
                        ]}
                    >
                        {WEEKDAYS_JS[day.getDay()]}
                    </Text>
                    <Text
                        style={[
                            styles.dayTile_text,
                            isSelected && styles.dayTile_active_text,
                        ]}
                    >
                        {day.getDate()}
                    </Text>
                    <Icon icon="calendar" size="sm" />
                </View>
            </Tile>
        </View>
    );
};

const styles = EStyleSheet.create({
    dayTile: {
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
    },

    dayTile_text: {
        fontWeight: '400',
    },

    dayTile_active: {
        backgroundColor: '#FFA9F1',
    },

    dayTile_active_text: {
        fontWeight: 'bold',
    },
});
