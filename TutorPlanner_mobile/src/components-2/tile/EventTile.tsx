import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { mapHourValueToText } from '@utils/dateUtils';
import { EventDTO } from '@model';
import { Icon } from '@components/icon';
import { tile_bg } from '@styles/colors';
import { DEFAULT, STYLES } from '@styles/theme';
import { Tag } from '@components-new/tag/tag';

interface EventTileProps {
    event: EventDTO;
    onClick?: () => void;
    onChange?: () => void;
}

const EventTile: React.FC<EventTileProps> = ({ event, onClick }) => {
    return (
        <Pressable
            onPress={onClick}
            style={[
                {
                    flexDirection: 'row',
                    minHeight: 50,
                    boxShadow: DEFAULT.boxShadow.tile.pressed,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: tile_bg,
                },
                STYLES.border,
            ]}
        >
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: 50,
                    borderRadius: '10 10 0 0',
                    borderRightWidth: DEFAULT.border.width.m,
                    borderColor: DEFAULT.border.color,
                    boxShadow: DEFAULT.boxShadow.tile.pressed,
                }}
            >
                {event.startHour && (
                    <Text
                        style={[
                            STYLES.text_styles.boldbody,
                            {
                                marginLeft: -DEFAULT.SPACING.S,
                            },
                        ]}
                    >
                        {mapHourValueToText(event.startHour)}
                    </Text>
                )}
                {event.endHour && (
                    <Text
                        style={[
                            STYLES.text_styles.boldbody,
                            {
                                marginLeft: DEFAULT.SPACING.S,
                            },
                        ]}
                    >
                        {mapHourValueToText(event.endHour)}
                    </Text>
                )}
                {!event.startHour && !event.endHour && (
                    <Icon icon="event" />
                )}
            </View>
            <View
                style={{
                    padding: DEFAULT.SPACING.XS,
                    flex: 1,
                }}
            >
                <Text style={STYLES.text_styles.boldbody}>{event.name}</Text>
                <Text style={STYLES.text}>{event.description}</Text>
                {event.isCanceled && <Tag severity="disabled" text="anulowano" />}
            </View>
        </Pressable>
    );
};

export { EventTile };
