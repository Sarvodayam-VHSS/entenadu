import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Fetch a random quote from the Quotable API
    axios.get('https://api.quotable.io/random')
      .then((response) => {
        const { content, author } = response.data;
        const formattedQuote = `"${content}" - ${author}`;
        setQuote(formattedQuote);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
      })
      .finally(() => {
        setIsLoading(false);
        // Navigate to the 'Login' screen after loading.
        // Replace 'Login' with the name of your Login screen.
        navigation.navigate('Login');
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Image
          source={require('../assets/favicon.png')} // Replace with the path to your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.loadingContainer}>
          {isLoading ? (
            <>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Loading...</Text>
            </>
          ) : (
            <Text style={styles.quoteText}>{quote}</Text>
          )}
        </View>
        <Text style={styles.poweredByText}>Powered by Sarvodayam VHSS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    width: 200, // Adjust the width and height based on your logo dimensions
    height: 200,
    marginBottom: 10, // Decrease the marginBottom for less gap
  },
  loadingContainer: {
    marginTop: 10, // Adjust the marginTop to set the desired gap
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  quoteText: {
    marginTop: 20, // Add marginTop to create a gap
    fontSize: 18,
    textAlign: 'center',
  },
  poweredByText: {
    fontSize: 12,
    color: '#888', // Adjust the color to your preference
    marginTop: 20, // Add marginTop to create a gap
  },
});

export default LoadingScreen;
