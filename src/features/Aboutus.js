import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./../../assets/sarvodayam.jpeg')} // replace with the path to your image
        style={styles.image}
      />
      <Text style={styles.description}>
      Sarvodayam Vocational Higher Secondary School, Aryampadam was established in 1955 by Peeyar Mundathicode, 
      a poet. Although Sarvodayam was initially a UP School, it was upgraded to a High School in 1983 and a Vocational 
      Higher Secondary School in 2000. Along with a good pass percentage, Sarvodayam also excels in extra-curricular 
      activities. Also, units like ATL (Atal Tinkering Lab), JRC (Junior Red Cross), NSS (National Service Scheme), 
      SPC (Student Police Cadet), Little Kites, Scouts & Guides add to the education.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 400,
    height: 300,
  },
  description: {
    width: '100%',
    marginTop: 10,
  },
});

export default AboutUs;
