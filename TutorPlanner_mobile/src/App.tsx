import * as React from 'react';
import { StatusBar, Text, useColorScheme, View } from 'react-native';
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabHeaderProps, BottomTabBarProps } from '@react-navigation/bottom-tabs';
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
import { Navbar, RootStackParamList } from '@components/ui/navbar';
//contexts
import { ModalProvider } from '@contexts/modalContext';
import { AlertProvider } from '@contexts/AlertContext';
import { ConfirmModalProvider } from '@contexts/confirmModalContext';
import { StudentsProvider } from '@contexts/StudentsContext';
import { StudentProvider } from '@contexts/StudentContext';
import { $bgColor_primary } from '@styles/colors';
import { GlobalContextProvider } from '@contexts/GlobalContext';
import { Header } from '@components/header';
//import { title } from 'process';

EStyleSheet.build({
    $color_primary: '#FFA9F1',
    $color_secondary: '#B0CFFF',
    $color_func: '#FFF59C',
    $color_black: '#070707',
    $color_white: '#F5F5F5',
    $color_disabled: '#6F6F6F',
    $color_danger: '#FF6B6B',
    $color_success: '#BAFCA2',
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

const Tab = createBottomTabNavigator<RootStackParamList>();

const App: React.FC<{}> = () => {
    let scheme = useColorScheme();

    return (
        <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor={$bgColor_primary}
            />
            <GlobalContextProvider>
                <ConfirmModalProvider>
                    <ModalProvider>
                        <AlertProvider>
                            <StudentsProvider>
                                <StudentProvider>
                                    <Tab.Navigator
                                        screenOptions={{
                                            animation: 'none',
                                            headerShown: false,
                                            tabBarBackground: () => (<View style={{backgroundColor: 'red', width: '100%', height: '100%'}} />),
                                            tabBar: (
                                                props: BottomTabBarProps
                                                //@ts-ignore
                                            ) => (<Navbar navigation={props.navigation} route={props.route.name}/>)
                                        }}
                                        initialRouteName="Home"
                                    >
                                        <Tab.Screen
                                            name="Home"
                                            component={Home}
                                            options={{
                                                headerTitleAlign: 'center',
                                                title: 'Welcome',
                                            }}
                                        />
                                        <Tab.Screen
                                            name="Calendar"
                                            component={Calendar}
                                        />
                                        <Tab.Screen
                                            name="Lessons"
                                            component={Lessons}
                                        />
                                        <Tab.Screen
                                            name="Notes"
                                            component={Notes}
                                        />
                                        <Tab.Screen
                                            name="Payments"
                                            component={Payments}
                                        />
                                        <Tab.Screen
                                            name="Students"
                                            component={Students}
                                        />
                                        <Tab.Screen
                                            name="Settings"
                                            component={Settings}
                                        />
                                        <Tab.Screen
                                            name="CreatePayment"
                                            component={CreatePayment}
                                        />
                                    </Tab.Navigator>
                                </StudentProvider>
                            </StudentsProvider>
                        </AlertProvider>
                    </ModalProvider>
                </ConfirmModalProvider>
            </GlobalContextProvider>
        </NavigationContainer>
    );
};

export default App;
