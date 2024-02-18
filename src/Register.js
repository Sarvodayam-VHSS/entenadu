import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataRef } from "../Firebase";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (name && email && mobile && password && confirmPassword) {
        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          setError("Invalid email format");
          return;
        }

        // Validate phone number format
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(mobile)) {
          setError("Invalid phone number format");
          return;
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const formattedPhone = mobile.replace(/^0+|^\+91/g, "");
        const userId = email.split("@")[0] + formattedPhone;

        // Check if the userID already exists
        const userExistsSnapshot = await dataRef
          .ref(`user/${userId}`)
          .once("value");

        if (userExistsSnapshot.val()) {
          setError("User with this email and mobile already exists");
          return;
        }

        // Save user details in Firebase
        await dataRef.ref(`user/${userId}`).set({
          name,
          email,
          mobile,
          password,
        });

        // Save userId in AsyncStorage
        await AsyncStorage.setItem("userId", userId);

        navigation.replace("Home", { userDetails: { name, email, mobile }, userId });
      } else {
        setError("Please fill in all fields");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      setError("Error during registration");
    }
  };

  const handleNavigateToLogin = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <CustomButton title="Register" onPress={handleRegister} />
        <TouchableOpacity onPress={handleNavigateToLogin}>
          <Text style={styles.newUserButton}>Already have an account? Login Here</Text>
        </TouchableOpacity>
      </ScrollView>
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

export default Register;
