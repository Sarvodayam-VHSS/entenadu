import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar } from 'react-native';
import Toast from "react-native-toast-message";

import LoadingScreen from "./src/LoadingScreen";
import UsersList from "./src/functions/UsersList";

import LoginScreen from "./src/LoginScreen";
import Register from "./src/Register";
import HomeScreen from "./src/HomeScreen";

import Home from "./src/service_pages/Home";
import Agriculture from "./src/service_pages/Agriculture";
import Aware from "./src/service_pages/Aware";
import Counselling from "./src/service_pages/Counselling";
import Electronics from "./src/service_pages/Electronics";
import Others from "./src/service_pages/Others";
import Professional from "./src/service_pages/Professional";
import Vehicle from "./src/service_pages/Vehicle";

import AboutUs from "./src/features/Aboutus";
import Budget from "./src/features/Budget";
import Contact from "./src/features/Contact";
import Reminders from "./src/features/Reminders";
import ToDoList from "./src/features/ToDoList";

import MyProfile from "./src/profile/MyProfile";
import UsersProfile from "./src/profile/UsersProfile";

import ShopProduct from "./src/service_pages/ShoppingPages/ShopProduct";
import EditProduct from "./src/service_pages/ShoppingPages/EditProduct";
import Shopping from "./src/service_pages/ShoppingPages/Shopping";
import ShoppingList from "./src/service_pages/ShoppingPages/ShoppingList";
import SellProduct from "./src/service_pages/ShoppingPages/SellProduct";
import MyProduct from "./src/service_pages/ShoppingPages/MyProduct";

const Stack = createStackNavigator();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);

    return () => {
    };
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <StatusBar
      backgroundColor="white"
      barStyle="dark-content"
    />
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {isAppReady ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Register" component={Register} />

              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Agriculture" component={Agriculture} />
              <Stack.Screen name="Aware" component={Aware} />
              <Stack.Screen name="Counselling" component={Counselling} />
              <Stack.Screen name="Electronics" component={Electronics} />
              <Stack.Screen name="Others" component={Others} />
              <Stack.Screen name="Professional" component={Professional} />
              <Stack.Screen name="Vehicle" component={Vehicle} />

              <Stack.Screen name="AboutUs" component={AboutUs} />
              <Stack.Screen name="Budget" component={Budget} />
              <Stack.Screen name="Contact" component={Contact} />
              <Stack.Screen name="Reminders" component={Reminders} />
              <Stack.Screen name="ToDoList" component={ToDoList} />

              <Stack.Screen name="MyProfile" component={MyProfile} />
              <Stack.Screen name="UsersProfile" component={UsersProfile} />

              <Stack.Screen name="Shopping" component={Shopping} />
              <Stack.Screen name="ShoppingList" component={ShoppingList} />
              <Stack.Screen name="ShopProduct" component={ShopProduct} />
              <Stack.Screen name="EditProduct" component={EditProduct} />
              <Stack.Screen name="SellProduct" component={SellProduct} />
              <Stack.Screen name="MyProduct" component={MyProduct} />

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
    </SafeAreaView>
  );
};

export default App;
