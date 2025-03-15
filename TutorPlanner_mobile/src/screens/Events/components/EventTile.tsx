import * as React from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { mapHourValueToText } from '@utils/dateUtils';
import { Tile } from '@components/tile';
import { EventDTO } from '@model';
import { Icon } from '@components/icon';

interface EventTileProps {
    event: EventDTO;
    onClick?: () => void;
}

const EventTile: React.FC<EventTileProps> = ({ event, onClick }) => {
    const subText = React.useMemo(() => {
        if (!event.startHour && !event.endHour) {
            return '';
        }
        if (!event.endHour) {
            return `Od: ${mapHourValueToText(event.startHour!)}`;
        }
        if (!event.startHour) {
            return `Do: ${mapHourValueToText(event.endHour!)}`;
        }
        {`(${mapHourValueToText(event.startHour)} - ${mapHourValueToText(event.endHour)})`}   
    }, [])

    return (
        <Tile onClick={onClick}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                    height: 'auto'
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10
                    }}
                >
                    <Icon icon={event.isCanceled ? 'cancelled' : 'event'} />
                </View>
                <View>
                    <Text
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Text style={{fontWeight: 'bold'}}>{event.name}</Text>{' '}
                        {subText}
                    </Text>
                    <Text>{format(event.date, 'yyyy-MM-dd')}</Text>
                </View>
            </View>
        </Tile>
    );
};

export { EventTile };
