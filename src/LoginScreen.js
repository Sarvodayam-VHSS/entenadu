import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { dataRef } from "../Firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const userDetailsSnapshot = await dataRef
          .ref(`user/${userId}`)
          .once("value");
        const userDetails = userDetailsSnapshot.val();

        if (userDetails) {
          navigation.replace("Home", { userDetails, userId });
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const forgotPass = () => {
    Linking.openURL("https://sarvodayam.in/entenadu/reset-pass");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (email && mobile && password) {
        const formattedPhone = mobile.replace(/^0+|^\+91/g, "");
        console.log("Formated Phone: " + formattedPhone);

        const userId = email.split("@")[0] + formattedPhone;
        console.log("userID: " + userId);

        // Check if the userID exists
        const userDetailsSnapshot = await dataRef
          .ref(`user/${userId}`)
          .once("value");

        const userDetails = userDetailsSnapshot.val();
        console.log(userDetails);

        if (userDetails && userDetails.password === password) {
          // Save userId in AsyncStorage -token
          await AsyncStorage.setItem("userId", userId);

          navigation.replace("Home", { userDetails, userId });
        } else {
          setError("Invalid email, mobile, or password");
        }
      } else {
        setError("Please enter email, mobile, and password");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email, mobile, or password");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegistration = () => {
    navigation.navigate("Register"); 
  };
  

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <CustomButton title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={forgotPass}>
              <Text style={styles.newUserButton}>
                Forgot Password? Reset Here
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateToRegistration}>
              <Text style={styles.newUserButton}>New User? Register Here</Text>
            </TouchableOpacity>
            <Text style={styles.redtext}>Note: Default Password is 'password'</Text>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "#007BFF",
      width: "90%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      marginTop: 10,
    }}
  >
    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  redtext:{
    color:  'red',
    padding: 20,
    fontSize: 16,
    
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 40,
  },
  input: {
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "#D8000C",
    marginBottom: 20,
    width: "90%",
    textAlign: "center",
  },
  newUserButton: {
    color: "#007BFF",
    marginTop: 20,
    fontSize: 16,
  },
});

export default LoginScreen;
