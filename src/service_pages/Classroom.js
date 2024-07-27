import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const data = [
  {
    image: require('./../../assets/graduation-cap-solid.png'),
    caption: 'Caption for image 1',
  },
  {
    image: require('./../../assets/ambulance.png'),
    caption: 'Caption for image 2',
  },
  {
    image: require('./../../assets/coconut.png'),
    caption: 'Caption for image 3',
  },
  {
    image: require('./../../assets/coconut.png'),
    caption: 'Caption for image 3',
  },
  {
    image: require('./../../assets/coconut.png'),
    caption: 'Caption for image 3',
  },
];

const GridItem = ({ item }) => {
  return (
    <View style={styles.gridItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.captionBox}>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  );
};

const ImageGrid = () => {
  return (
    <ScrollView>
      {data.map((item, index) => (
        <GridItem key={index} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8', // Light background for better contrast
  },
  gridItem: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2, // Maintain aspect ratio and adjust height based on screen width
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  captionBox: {
    padding: 10,
    backgroundColor: '#fff', // White background for the caption box
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Light border at the top of the caption box
  },
  caption: {
    color: '#333', // Dark text color for better readability
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImageGrid;
