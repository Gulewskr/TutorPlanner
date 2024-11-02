import * as React from 'react';
import { useColorScheme } from 'react-native';
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
//screens
import { Home } from './screens/Home/Home';
import { Calendar } from './screens/Calendar/Calendar';
import { Students } from './screens/Students/Students';
import { Payments } from './screens/Payments/Payments';
import { Notes } from './screens/Notes/Notes';
import { Settings } from './screens/Settings/Settings';
import { Lessons } from './screens/Lessons/Lessons';
import { CreatePayment } from './screens/CreatePayment/CreatePayment';
//components
import { RootStackParamList } from '@components/ui/navbar';
//contexts
import { ModalProvider } from '@contexts/modalContext';
import { AlertProvider } from '@contexts/AlertContext';
import { ConfirmModalProvider } from '@contexts/confirmModalContext';
import { StudentsProvider } from '@contexts/StudentsContext';
import { StudentProvider } from '@contexts/StudentContext';

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
    $tile_bgColor: '#F4DDFF',
});

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC<{}> = () => {
    let scheme = useColorScheme();

    return (
        <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <ConfirmModalProvider>
                <ModalProvider>
                    <AlertProvider>
                        <StudentsProvider>
                            <StudentProvider>
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
                                    <Stack.Screen
                                        name="Calendar"
                                        component={Calendar}
                                    />
                                    <Stack.Screen
                                        name="Lessons"
                                        component={Lessons}
                                    />
                                    <Stack.Screen
                                        name="Notes"
                                        component={Notes}
                                    />
                                    <Stack.Screen
                                        name="Payments"
                                        component={Payments}
                                    />
                                    <Stack.Screen
                                        name="Students"
                                        component={Students}
                                    />
                                    <Stack.Screen
                                        name="Settings"
                                        component={Settings}
                                    />
                                    <Stack.Screen
                                        name="CreatePayment"
                                        component={CreatePayment}
                                    />
                                </Stack.Navigator>
                            </StudentProvider>
                        </StudentsProvider>
                    </AlertProvider>
                </ModalProvider>
            </ConfirmModalProvider>
        </NavigationContainer>
    );
};

export default App;
