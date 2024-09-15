import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./screens/Home/Home";
import { Profile } from "./screens/Profile/Profile";
import Navbar from "./components/navbar/Navbar";
import { Calendar } from "./screens/Calendar/Calendar";
import { Student } from "./screens/Student/Student";
import { Payments } from "./screens/Payments/Payments";
import { Notes } from "./screens/Notes/Notes";

const Stack = createNativeStackNavigator();

const App: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerTitleAlign: "center",
            title: "Welcome",
          }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Students" component={Student} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Notes" component={Notes} />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
};

export default App;
