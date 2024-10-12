import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { PropsWithChildren } from 'react';
import { Layout } from '../Layout';
import { CalendarTabParamList } from './calendarTabs';

export const CalendarLayout: React.FC<
    PropsWithChildren<
        BottomTabScreenProps<CalendarTabParamList, keyof CalendarTabParamList>
    >
> = ({ navigation, route, children }) => {
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Calendar'}
            title="Kalendarz"
            hasHeader
        >
            {children}
        </Layout>
    );
};
