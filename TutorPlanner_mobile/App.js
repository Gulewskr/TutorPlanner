import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './src/App.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
    return <Main />;
}
