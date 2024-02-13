import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    axios.get('http://api.quotable.io/random')
      .then((response) => {
        const { content, author } = response.data;
        const formattedQuote = `"${content}" - ${author}`;
        setQuote(formattedQuote);
        setIsLoading(false);
        
        setTimeout(() => {
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Image
          source={require('../assets/favicon.png')} // Replace with the path to your logo
          style={styles.logo}
          resizeMode="contain"
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text style={styles.quoteText}>{quote}</Text>
        )}
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
  quoteText: {
    marginTop: 20, // Add marginTop to create a gap
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  poweredByText: {
    fontSize: 12,
    color: '#888', // Adjust the color to your preference
    marginTop: 20, // Add marginTop to create a gap
  },
});

export default LoadingScreen;
