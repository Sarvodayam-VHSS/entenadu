import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://your-image-url.com' }} style={styles.profileImage} />
      <Text style={styles.text}>Name: John Doe</Text>
      <Text style={styles.text}>Address: 1234 Street, City</Text>
      <Text style={styles.text}>Pincode: 000000</Text>
      <Text style={styles.text}>Date of Birth: YYYY-MM-DD</Text>
      <Text style={styles.text}>Phone: 123-456-7890</Text>
      <Text style={styles.text}>Email: email@example.com</Text>
      <Text style={styles.text}>Aadhaar No: 1234-5678-9101</Text>
      <Text style={styles.text}>Education Qualification: Bachelor's Degree</Text>
      <Text style={styles.text}>Skill Sector: Information Technology</Text>
      <Text style={styles.text}>Blood Group: O+</Text>
      <Text style={styles.text}>Experience: 5 years</Text>
      <Text style={styles.text}>Municipality/Panchayath: Local Municipality</Text>
      <Text style={styles.text}>Ward No: 12</Text>
      <Text style={styles.text}>Place: Your Place</Text>
      <Text style={styles.text}>Land Mark: Near the big mall</Text>
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
