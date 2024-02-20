import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_QUOTE } from "@env";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    axios.get(API_QUOTE)
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
          source={require('../assets/favicon.png')}
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
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  loadingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  quoteText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  poweredByText: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
  },
});

export default LoadingScreen;
