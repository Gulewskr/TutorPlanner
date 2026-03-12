import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { formatToDayInCalendar, mapHourValueToText } from '@utils/dateUtils';
import { LessonDTO } from '@model';
import { Icon, ICON_NAME } from '@components/icon';
import { DEFAULT, STYLES } from '@styles/theme';
import { tile_bg, white } from '@styles/colors';
import { Tag } from '@components-new/tag/tag';

interface LessonTileProps {
    lesson: LessonDTO;
    onClick?: () => void;
    onChange?: () => void;
    showDate?: boolean;
    hideTags?: boolean;
}

const LessonTile: React.FC<LessonTileProps> = ({ lesson, onClick, showDate, hideTags = false }) => {
    const iconName: ICON_NAME = React.useMemo(() => {
        if (lesson.isCanceled) {
            return 'cancelled';
        }
        return lesson.isPaid ? 'payments-done' : 'payments-missing';
    }, [lesson]);

    return (
        <Pressable
            onPress={onClick}
            style={[
                {
                    display: 'flex',
                    flexDirection: 'row',
                    minHeight: 50,
                    boxShadow: DEFAULT.boxShadow.tile.pressed,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: tile_bg,
                    flex: 1
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
                <Text
                    style={[
                        STYLES.text_styles.boldbody,
                        {
                            marginLeft: -DEFAULT.SPACING.S,
                        },
                    ]}
                >
                    {mapHourValueToText(lesson.startHour)}
                </Text>
                <Text
                    style={[
                        STYLES.text_styles.boldbody,
                        {
                            marginLeft: DEFAULT.SPACING.S,
                        },
                    ]}
                >
                    {mapHourValueToText(lesson.endHour)}
                </Text>
            </View>
            <View
                style={{
                    padding: DEFAULT.SPACING.XS,
                    flex: 1,
                    gap: DEFAULT.SPACING.XXS,
                }}
            >
                <Text style={STYLES.text_styles.boldbody}>{lesson.name}</Text>
                {showDate && <Text style={STYLES.text}>{formatToDayInCalendar(lesson.date)}</Text>}
                {hideTags ||
                    (lesson.isCanceled ? (
                        <Tag severity="disabled" text="anulowana" />
                    ) : lesson.isPaid ? (
                        <Tag severity="success" text="opłacona" />
                    ) : (
                        <Tag severity="error" text="nieopłacona" />
                    ))}
            </View>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={[
                        {
                            backgroundColor: white,
                            borderRadius: 10,
                            padding: DEFAULT.SPACING.XXS,
                            margin: DEFAULT.SPACING.XS,
                        },
                        STYLES.border,
                    ]}
                >
                    <Icon icon={iconName} />
                </View>
            </View>
        </Pressable>
    );
};

export { LessonTile };
