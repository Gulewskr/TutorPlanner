import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './screens/Home/Home';
import { Profile } from './screens/Profile/Profile';
import { Calendar } from './screens/Calendar/Calendar';
import { Students } from './screens/Students/Students';
import { Payments } from './screens/Payments/Payments';
import { Notes } from './screens/Notes/Notes';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
    $colorBlack: '#070707',
    $colorWhite: '#F5F5F5',
    $backgroundColorWhite: '#FFFCE3',
    $backgroundColorPrimary: '#FFC3FF',
    $colorPrimary: '#FFA9F1',
    $colorSecondary: '#B0CFFF',
    $colorFunctional: '#FFF59C',
    $colorPrimary_hover: '#F5D4F5',
    $colorSecondary_hover: '#EFF5FF',
    $shadowColorPrimary: '#9E0042',
    $shadowColorSecondary: '#002C9E',
});

export type RootStackParamList = {
    Home: undefined;
    Profile: { name: string } | undefined;
    Calendar: undefined;
    Students: undefined;
    Payments: undefined;
    Notes: undefined;
};

export type NavbarNavigationScreens =
    | 'Home'
    | 'Profile'
    | 'Calendar'
    | 'Students'
    | 'Payments'
    | 'Notes';

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
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="Students" component={Students} />
                <Stack.Screen name="Payments" component={Payments} />
                <Stack.Screen name="Notes" component={Notes} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
