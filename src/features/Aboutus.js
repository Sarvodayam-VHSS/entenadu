import React from "react";
import { Text, Image, ScrollView, StyleSheet } from "react-native";

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("./../../assets/sarvodayam.jpeg")}
        style={styles.image}
      />
      <Text style={styles.heading}>Welcome to Sarvodayam School</Text>
      <Text style={styles.description}>
        Sarvodayam Vocational Higher Secondary School, Aryampadam was
        established in 1955 by Peeyar Mundathicode, a poet. Although Sarvodayam
        was initially a UP School, it was upgraded to a High School in 1983 and
        a Vocational Higher Secondary School in 2000. Along with a good pass
        percentage, Sarvodayam also excels in extra-curricular activities. Units
        like ATL (Atal Tinkering Lab), JRC (Junior Red Cross), NSS (National
        Service Scheme), SPC (Student Police Cadet), Little Kites, Scouts &
        Guides add to the holistic education.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 400,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    width: "100%",
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});

export default AboutUs;
