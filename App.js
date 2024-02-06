import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/LoadingScreen';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import HomeServ from './src/service_pages/HomeServ';

import Agric from './src/service_pages/Agric';
import Aware from './src/service_pages/Aware';
import Counselling from './src/service_pages/Counselling';
import Knowledge from './src/service_pages/Knowledge';
import Others from './src/service_pages/Others';
import Professional from './src/service_pages/Professional';
import Shopping from './src/service_pages/Shopping';
import Vehicle from './src/service_pages/Vehicle';

import Aboutus from './src/features/Aboutus';
import Budget from './src/features/Budget';
import Contact from './src/features/Contact';
import Reminders from './src/features/Reminders';
import ToDoList from './src/features/ToDoList';




const Stack = createStackNavigator();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization or any other necessary tasks
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000); // Simulating a 3-second initialization time, replace with your actual logic

    // Clean up any resources if needed
    return () => {
      // Cleanup logic here
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAppReady ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="HomeServ" component={HomeServ} />
            <Stack.Screen name="Agric" component={Agric} />
            <Stack.Screen name="Aware" component={Aware} />
            <Stack.Screen name="Counselling" component={Counselling} />
            <Stack.Screen name="Knowledge" component={Knowledge} />
            <Stack.Screen name="Others" component={Others} />
            <Stack.Screen name="Professional" component={Professional} />
            <Stack.Screen name="Shopping" component={Shopping} />
            <Stack.Screen name="Vehicle" component={Vehicle} />
            <Stack.Screen name="Aboutus" component={Aboutus} />
            <Stack.Screen name="Budget" component={Budget} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Reminders" component={Reminders} />
            <Stack.Screen name="ToDoList" component={ToDoList} />
            

          </>
        ) : (
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }} // Hide the header during loading
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
