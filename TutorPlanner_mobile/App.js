import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './src/screens/Home/Home';
import { Profile } from './src/screens/Profile/Profile';
import Main from './src/App.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
    return <Main />;
}
