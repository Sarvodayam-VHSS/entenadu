import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Budget = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.comingSoonText}>Coming Soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Budget;
