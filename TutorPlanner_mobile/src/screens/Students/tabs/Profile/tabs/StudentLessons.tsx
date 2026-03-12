import { ScrollView, Text, View } from 'react-native';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useStudentContext } from '../StudentContext';
import { LessonsList } from '@components-new/complex/lessonsList';
import { Tile } from '@components/tile';
import { mapHourValueToText } from '@utils/dateUtils';
import { DEFAULT, STYLES } from '@styles/theme';
import { WEEKSDAYS_FULLNAMES } from '@screens/Calendar/components/calendar/utils';
import { LessonTile } from '@components-new/tile';
import { tile_bg, white } from '@styles/colors';

export const StudentLessons: React.FC<
    BottomTabScreenProps<StudentProfileTabParamList, 'Lessons'>
> = props => {
    const { navigation, route } = props;
    const {
        data: { student, studentLessons },
        loading,
    } = useStudentContext();

    const { weeklyLessons, studentNextLesson, currentMonth } = studentLessons;

    /*
    response.sort((a, b) => {
                const start = a.startHour - b.startHour;
                if (start === 0) {
                    return a.endHour - b.endHour;
                }
                return start;
            }),
    */

    const renderHeader = (title: string) => <Text style={STYLES.h4}>{title}</Text>;

    const renderWeeklyLessons = () => {
        return (
            <View
                style={{
                    width: '100%',
                }}
            >
                {weeklyLessons.map((lesson, i) => (
                    <View
                        style={[
                            {
                                boxShadow: DEFAULT.boxShadow.tile.default,
                                width: '100%',
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: DEFAULT.border.radius.m,
                                backgroundColor: white,
                            },
                            STYLES.border,
                        ]}
                    >
                        <Text style={{ fontWeight: 'bold' }}>{lesson.name}</Text>
                        <Text>
                            {`${lesson.daysOfWeek.map(
                                day => WEEKSDAYS_FULLNAMES[day],
                            )} ${mapHourValueToText(lesson.startHour)} - ${mapHourValueToText(lesson.endHour)}`}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <StudentsLayout {...props} student={student}>
            <View style={{ alignItems: 'center', gap: 20, width: '100%', paddingHorizontal: 15 }}>
                {renderHeader('Zajęcia cotygodniowe')}
                {renderWeeklyLessons()}
                {renderHeader('Najbliższe zajęcia')}
                <View
                    style={{
                        width: '100%',
                        height: 40,
                    }}
                >
                    {studentNextLesson ? (
                        <LessonTile lesson={studentNextLesson} hideTags showDate />
                    ) : (
                        <Text>Brak zaplanowanych lekcji</Text>
                    )}
                </View>
                {renderHeader('Bieżący miesiąc')}
                <View
                    style={{
                        width: '100%',
                    }}
                >
                    <LessonsList
                        lessons={currentMonth}
                        isLoading={false}
                        navigation={props.navigation.getParent()}
                    />
                </View>
            </View>
        </StudentsLayout>
    );
};
