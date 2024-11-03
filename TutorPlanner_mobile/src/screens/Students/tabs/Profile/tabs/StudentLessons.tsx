import { Text, View } from 'react-native';
import { StudentsLayout } from '../Layout';
import { StudentProfileTabParamList } from '../StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useStudentContext } from '../StudentContext';
import { LessonsList } from '@components/complex/lessonsList';
import { Tile } from '@components/tile';
import { mapHourValueToText } from '@utils/dateUtils';
import { LessonTile } from '@screens/Lessons/components/LessonTile';
import { WEEKSDAYS_FULLNAMES } from '@screens/Calendar/components/calendar';

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

    const renderHeader = (title: string) => (
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>
    );

    const renderWeeklyLessons = () => {
        return (
            <View>
                {weeklyLessons.map((lesson, i) => (
                    <Tile key={i} color="white">
                        <View
                            style={{
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                {lesson.name}
                            </Text>
                            <Text>
                                {`${lesson.daysOfWeek.map(
                                    day => WEEKSDAYS_FULLNAMES[day],
                                )} ${mapHourValueToText(lesson.startHour)} - ${mapHourValueToText(lesson.endHour)}`}
                            </Text>
                        </View>
                    </Tile>
                ))}
            </View>
        );
    };

    return (
        <StudentsLayout {...props} student={student}>
            {renderHeader('Zajęcia cotygodniowe')}
            <View
                style={{
                    paddingHorizontal: 15,
                }}
            >
                {renderWeeklyLessons()}
            </View>
            {renderHeader('Najbliższe zajęcia')}
            <View
                style={{
                    paddingHorizontal: 15,
                }}
            >
                {studentNextLesson ? (
                    <LessonTile lesson={studentNextLesson} />
                ) : (
                    <Text>Brak zaplanowanych lekcji</Text>
                )}
            </View>
            {renderHeader('Bieżący miesiąc')}

            <View
                style={{
                    paddingHorizontal: 15,
                }}
            >
                <LessonsList
                    lessons={currentMonth}
                    isLoading={false}
                    navigation={props.navigation.getParent()}
                />
            </View>
        </StudentsLayout>
    );
};
