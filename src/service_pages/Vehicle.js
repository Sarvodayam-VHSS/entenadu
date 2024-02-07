import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Vehicle = () => {
  const navigation = useNavigation();

  const gridItems = [
    { label: 'Three Wheeler', image: require('./../../assets/tuk-tuk.png'), value: 'motorcycle' },
    { label: 'Car', image: require('./../../assets/3d-car.png'), value: 'car' },
  ];

  const handleSelect = (item) => {
    // Add navigation logic for each item
    // For now, let's navigate to a placeholder screen with the item value
    navigation.navigate(item.value);
  };

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleSelect(item)}
    >
      <Image source={item.image} style={styles.gridImage} />
      <Text style={styles.gridLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gridItems}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Set numColumns to 2 for 2 grids in a row
        style={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  grid: {
    marginTop: 10,
  },
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  gridImage: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    marginBottom: 10,
  },
  gridLabel: {
    fontSize: 14,
  },
});

export default Vehicle;
