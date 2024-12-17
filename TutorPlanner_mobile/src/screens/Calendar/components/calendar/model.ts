export interface DayEventsData {
    amount: number;
    canceledEvents: number;
    numOfLessons: number;
    numOfUnpaidedLessons: number;
    numOfPaidedLessons: number;
    important?: boolean;
}
