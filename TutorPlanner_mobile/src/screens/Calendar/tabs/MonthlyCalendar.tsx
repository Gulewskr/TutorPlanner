import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View, ViewStyle } from 'react-native';
import { CalendarLayout } from '../CalendarLayout';
import { CalendarTabParamList } from '../calendarTabs';
import { format } from 'date-fns';
import { useCalendarContext } from '../CalendarContext';
import { setLoadingPage } from '@contexts/NavbarReducer';
import { useFocusEffect } from '@react-navigation/native';
import { useDayEvents } from '../hooks/useDayEvents';
import { EventsList } from '@components-new/complex/eventslist';
import { EventModal } from '@components-new/modals/EventModal';
import { LessonModal } from '@components-new/modals';
import { EventDTO, LessonDTO } from '@model';
import { useModalContext } from '@contexts/modalContext';
import { STYLES } from '@styles/theme';
import { Calendar } from '../components/Calendar';

const CALENDAR_HEIGHT = 380;
//TODO - should depends on screen size
const MAX_LIST_HEIGHT = 800;
const MIN_LIST_HEIGHT = 200;

export const MonthlyCalendar: React.FC<
    BottomTabScreenProps<CalendarTabParamList, 'MonthlyCalendar'>
> = props => {
    const { navigation, route } = props;
    const [controlDate, setControlDate] = useState(new Date());

    const { fetchMonthlyCalendarData } = useCalendarContext();

    useFocusEffect(
        React.useCallback(() => {
            fetchMonthlyCalendarData(controlDate);
            return () => {};
        }, []),
    );

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchMonthlyCalendarData(controlDate);
    }, [controlDate]);

    const refresh = () => fetchMonthlyCalendarData(controlDate);
    const { setIsOpen, setModalBody } = useModalContext();

    const { events } = useDayEvents(controlDate);
    const handleShowLessonModal = (lesson: LessonDTO) => {
        setModalBody(
            <LessonModal
                lesson={lesson}
                goToStudentProfile={() => {
                    navigation.getParent()?.navigate('Students', {
                        screen: 'Profile',
                        params: {
                            studentId: lesson.studentId,
                        },
                    });
                }}
                goToEditForm={() => {
                    navigation.getParent()?.navigate('Lessons', {
                        screen: 'Edit',
                        params: {
                            lessonId: lesson.id,
                        },
                    });
                }}
                onChange={refresh}
            />,
        );
        setIsOpen(true);
    };

    const handleShowEventModal = (event: EventDTO) => {
        setModalBody(
            <EventModal
                event={event}
                goToEditForm={() => {
                    navigation.getParent()?.navigate('Events', {
                        screen: 'Edit',
                        params: {
                            event: event,
                        },
                    });
                }}
            />,
        );
        setIsOpen(true);
    };

    const scrollY = useRef(new Animated.Value(0)).current;
    const listHeight = useRef(new Animated.Value(MIN_LIST_HEIGHT)).current;

    /*
    const showCalendar = () => {
        Animated.timing(calendarHeight, {
            toValue: CALENDAR_HEIGHT,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(listHeight, {
            toValue: MIN_LIST_HEIGHT,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };
    const hideCalendar = () => {
        Animated.timing(calendarHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(listHeight, {
            toValue: MAX_LIST_HEIGHT,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };
    */
    const listScale = listHeight.interpolate({
        inputRange: [MIN_LIST_HEIGHT, MAX_LIST_HEIGHT],
        outputRange: [1, MAX_LIST_HEIGHT / MIN_LIST_HEIGHT],
        extrapolate: 'clamp',
    });

    const calendarScale = scrollY.interpolate({
        inputRange: [0, CALENDAR_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const calendarHeight = scrollY.interpolate({
        inputRange: [0, CALENDAR_HEIGHT],
        outputRange: [CALENDAR_HEIGHT, 0],
        extrapolate: 'clamp',
    });
    let ScreenHeight = Dimensions.get('window').height + CALENDAR_HEIGHT;
    const scrollRef = useRef<ScrollView>(null);

    return (
        <CalendarLayout {...props}>
            <ScrollView
                ref={scrollRef}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: false,
                    listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                        const y = event.nativeEvent.contentOffset.y;

                        if (y > (CALENDAR_HEIGHT + 50)) {
                            scrollRef.current?.scrollTo({
                            y: CALENDAR_HEIGHT + 50,
                            animated: false,
                            });
                        }
                    }
                })}
            >
                <View style={{ paddingTop: 10 }}>
                    <Animated.View
                        style={{
                            paddingTop: scrollY,
                            padding: 15,
                            gap: 15,
                            alignItems: 'center',
                            width: '100%',
                            height: ScreenHeight,
                            marginBottom: CALENDAR_HEIGHT,
                        }}
                    >
                    {/*
                    <Button
                        onClick={() => navigation.jumpTo('DailyCalendar')}
                        hasShadow
                        icon="calendar"
                        label="Przełącz na widok dzienny"
                    />
                    */}
                        <Animated.View
                            style={{
                                height: calendarHeight,
                                overflow: 'hidden',
                                width: '100%',
                            }}
                        >
                            <Calendar controlDate={controlDate} setControlDate={setControlDate} />
                        </Animated.View>
                        <Text
                            style={[
                                STYLES.h3,
                                {
                                    alignSelf: 'flex-start',
                                },
                            ]}
                        >
                            {format(controlDate, 'dd MM yyyy')}
                        </Text>
                        <Animated.View
                            style={{
                                alignItems: 'center',
                                flex: 1,
                            }}
                        >
                            <EventsList
                                events={events}
                                onChange={refresh}
                                onEventClick={handleShowEventModal}
                                onLessonClick={handleShowLessonModal}
                            />
                        </Animated.View>
                    </Animated.View>
                </View>
            </ScrollView>
        </CalendarLayout>
    );
};
