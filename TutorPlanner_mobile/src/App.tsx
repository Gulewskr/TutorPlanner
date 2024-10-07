import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './screens/Home/Home';
import { Calendar } from './screens/Calendar/Calendar';
import { Students, StudentsTabParamList } from './screens/Students/Students';
import { Payments, PaymentsTabParamList } from './screens/Payments/Payments';
import { Notes } from './screens/Notes/Notes';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Settings } from './screens/Settings/Settings';
import { Lessons, LessonsTabParamList } from './screens/Lessons/Lessons';
import { CreatePayment } from './screens/CreatePayment/CreatePayment';
import { CreateStudent } from './screens/CreateStudent/CreateStudent';

EStyleSheet.build({
    $color_primary: '#FFA9F1',
    $color_secondary: '#B0CFFF',
    $color_func: '#FFF59C',
    $color_black: '#070707',
    $color_white: '#F5F5F5',
    $color_disabled: '#6F6F6F',
    $color_disabled_primary: '#B08DA9',
    $bgColor_white: '#FFFCE3',
    $bgColor_primary: '#FFC3FF',
    $bgColor_secondary: '#D3E4FF',
    $color_primary_hover: '#F5D4F5',
    $color_secondary_hover: '#EFF5FF',
    $shadow_color_primary: '#9E0042',
    $shadow_color_secondary: '#002C9E',
    //Probably should be local variable
    $tile_bgColor: '#F4DDFF',
});

export type RootStackParamList = {
    Home: undefined;
    Calendar: undefined;
    Students: { screen: keyof StudentsTabParamList; initial: boolean };
    Payments: {
        screen: keyof PaymentsTabParamList;
        initial: boolean;
    };
    CreatePayment: undefined;
    CreateStudent: undefined;
    Notes: undefined;
    Settings: undefined;
    Lessons: { screen: keyof LessonsTabParamList; initial: boolean };
};

export type NavbarNavigationScreens = keyof RootStackParamList;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC<{}> = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    animation: 'none',
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        headerTitleAlign: 'center',
                        title: 'Welcome',
                    }}
                />
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="Lessons" component={Lessons} />
                <Stack.Screen name="Notes" component={Notes} />
                <Stack.Screen name="Payments" component={Payments} />
                <Stack.Screen name="Students" component={Students} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="CreatePayment" component={CreatePayment} />
                <Stack.Screen name="CreateStudent" component={CreateStudent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
