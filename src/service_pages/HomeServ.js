import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
