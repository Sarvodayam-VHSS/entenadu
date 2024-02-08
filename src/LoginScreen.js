import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
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
          .ref(`registrations/${userId}`)
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
          .ref(`registrations/${userId}`)
          .once("value");

        const userDetails = userDetailsSnapshot.val();
        console.log(userDetails);

        if (userDetails && userDetails.password === password) {
          // Save userId in AsyncStorage -token
          await AsyncStorage.setItem("userId", userId);

          navigation.replace("Home", { userDetails });
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
    Linking.openURL("https://sarvodayam.in/entenadu/registration");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.container}>
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
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={handleNavigateToRegistration}>
              <Text style={styles.newUserButton}>New User? Register Here</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  newUserButton: {
    color: "blue",
    marginTop: 10,
  },
});

export default LoginScreen;
