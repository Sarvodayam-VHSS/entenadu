import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import LoadingScreen from "./src/LoadingScreen";
import LoginScreen from "./src/LoginScreen";
import HomeScreen from "./src/HomeScreen";
import HomeServ from "./src/service_pages/HomeServ";

import Agric from "./src/service_pages/Agric";
import Aware from "./src/service_pages/Aware";
import Counselling from "./src/service_pages/Counselling";
import Electronics from "./src/service_pages/Electronics";
import Others from "./src/service_pages/Others";
import Professional from "./src/service_pages/Professional";
import Vehicle from "./src/service_pages/Vehicle";

import Aboutus from "./src/features/Aboutus";
import Budget from "./src/features/Budget";
import Contact from "./src/features/Contact";
import Reminders from "./src/features/Reminders";
import ToDoList from "./src/features/ToDoList";
import edit from "./src/profile/edit";
import MyProfile from "./src/profile/MyProfile";
import UsersProfile from "./src/profile/UsersProfile";
import UsersList from "./src/functions/UsersList";
import ShopProduct from "./src/service_pages/ShoppingPages/ShopProduct";
import Shopping from "./src/service_pages/ShoppingPages/Shopping";
import ShoppingList from "./src/service_pages/ShoppingPages/ShoppingList";
import SellProduct from "./src/service_pages/ShoppingPages/SellProduct";

const Stack = createStackNavigator();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);

    return () => {
      // Cleanup logic here
    };
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {isAppReady ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="homeServ" component={HomeServ} />
              <Stack.Screen name="agric" component={Agric} />
              <Stack.Screen name="aware" component={Aware} />
              <Stack.Screen name="counselling" component={Counselling} />
              <Stack.Screen name="electronics" component={Electronics} />
              <Stack.Screen name="others" component={Others} />
              <Stack.Screen name="professional" component={Professional} />
              <Stack.Screen name="vehicle" component={Vehicle} />
              <Stack.Screen name="aboutus" component={Aboutus} />
              <Stack.Screen name="budget" component={Budget} />
              <Stack.Screen name="contact" component={Contact} />
              <Stack.Screen name="reminders" component={Reminders} />
              <Stack.Screen name="toDoList" component={ToDoList} />
              <Stack.Screen name="edit" component={edit} />
              <Stack.Screen name="MyProfile" component={MyProfile} />
              <Stack.Screen name="UsersProfile" component={UsersProfile} />
              <Stack.Screen name="shopping" component={Shopping} />
              <Stack.Screen name="ShoppingList" component={ShoppingList} />
              <Stack.Screen name="ShopProduct" component={ShopProduct} />
              <Stack.Screen name="SellProduct" component={SellProduct} />

              <Stack.Screen
                name="UsersList"
                component={UsersList}
                options={({ route }) => ({
                  title:
                    route.params && route.params.skillSector
                      ? `${capitalizeFirstLetter(route.params.skillSector)}`
                      : "Users List",
                  headerShown: true,
                })}
              />
            </>
          ) : (
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
