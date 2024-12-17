import * as React from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { mapHourValueToText } from '@utils/dateUtils';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';
import { Icon, ICON_NAME } from '@components/icon';

interface LessonTileProps {
    lesson: LessonDTO;
    onClick?: () => void;
}

const LessonTile: React.FC<LessonTileProps> = ({ lesson, onClick }) => {
    const iconName: ICON_NAME = React.useMemo(() => {
        if (lesson.isCanceled) {
            return 'cancelled';
        }
        return lesson.isPaid ? 'payments-done' : 'payments-missing';
    }, [lesson]);

    return (
        <Tile onClick={onClick}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text>
                        <Icon icon={iconName} />{' '}
                    </Text>
                </View>
                <View style={{}}>
                    <Text
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        {lesson.name}{' '}
                        {`(${mapHourValueToText(lesson.startHour)} - ${mapHourValueToText(lesson.endHour)})`}
                    </Text>
                    <Text>{format(lesson.date, 'yyyy-MM-dd')}</Text>
                </View>
            </View>
        </Tile>
    );
};

export { LessonTile };
