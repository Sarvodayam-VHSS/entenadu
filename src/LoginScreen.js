import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Keyboard } from 'react-native'; // Import Keyboard from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const passwordInputRef = useRef(null);
  const emailInputRef = useRef(null); // Create a ref for the email input
  const navigation = useNavigation();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'poppins-medium': require('./Poppins-Medium.ttf'),
      });
    };

    loadFonts();

    // Use a timeout to ensure that the email input is focused after the render
    const timeoutId = setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, []);

  const handleLogin = () => {
    if (username && password) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      setError('Invalid username or password');
    }
  };

  const handleNavigateToRegistration = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={[styles.title, { fontFamily: 'poppins-medium' }]}>Login</Text>
          <Icon name="user" size={40} color="black" style={styles.profileIcon} />
          <TextInput
            ref={emailInputRef} // Assign the ref to the email input
            style={styles.input}
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
          <TextInput
            ref={passwordInputRef}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            returnKeyType="go"
            onSubmitEditing={handleLogin}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'blue' }]}
              onPress={handleLogin}
            >
              <Text style={[styles.buttonText, { color: 'white' }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.registerButton, { backgroundColor: 'blue' }]}
              onPress={handleNavigateToRegistration}
            >
              <Text style={[styles.buttonText, { color: 'white' }]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: '80%',
    height: 400,
    padding: 40,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'blue',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'poppins-medium',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    width: '48%',
  },
  registerButton: {},
  buttonText: {
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  profileIcon: {
    marginBottom: 20,
  },
});

export default LoginScreen;
