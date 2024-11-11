import * as React from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { mapHourValueToText } from '@utils/dateUtils';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';

interface LessonTileProps {
    lesson: LessonDTO;
    onClick?: () => void;
}

const LessonTile: React.FC<LessonTileProps> = ({ lesson, onClick }) => (
    <Tile onClick={onClick}>
        <View
            style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
            }}
        >
            <Text>
                {lesson.name}{' '}
                {`(${mapHourValueToText(lesson.startHour)} - ${mapHourValueToText(lesson.endHour)})`}
            </Text>
            <Text>{format(lesson.date, 'yyyy-MM-dd')}</Text>
        </View>
    </Tile>
);

export { LessonTile };
