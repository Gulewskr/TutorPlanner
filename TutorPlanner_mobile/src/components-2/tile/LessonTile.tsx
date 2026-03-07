import * as React from 'react';
import { Text, View } from 'react-native';
import { mapHourValueToText } from '@utils/dateUtils';
import { LessonDTO } from '@model';
import { Icon, ICON_NAME } from '@components/icon';
import { DEFAULT, STYLES } from '@styles/theme';
import { tile_bg, white } from '@styles/colors';
import { Tag } from '@components-new/tag/tag';

interface LessonTileProps {
    lesson: LessonDTO;
    onClick?: () => void;
    onChange?: () => void;
}

const LessonTile: React.FC<LessonTileProps> = ({ lesson, onClick }) => {
    const iconName: ICON_NAME = React.useMemo(() => {
        if (lesson.isCanceled) {
            return 'cancelled';
        }
        return lesson.isPaid ? 'payments-done' : 'payments-missing';
    }, [lesson]);

    return (
        <View
            style={[
                {
                    flex: 1,
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
                    height: '100%',
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
                }}
            >
                <Text style={STYLES.text_styles.boldbody}>{lesson.name}</Text>
                {lesson.isPaid ? (
                    <Tag severity="success" text="opłacona" />
                ) : (
                    <Tag severity="error" text="nieopłacona" />
                )}
                {lesson.isCanceled && <Tag severity="warning" text="anulowana" />}
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
        </View>
    );
};

export { LessonTile };
