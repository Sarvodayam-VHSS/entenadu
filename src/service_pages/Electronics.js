import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Electronics = () => {
  const navigation = useNavigation();

  const gridItems = [
    { label: 'TV', image: require('./../../assets/television.png'), value: 'tv' },
    { label: 'CCTV', image: require('./../../assets/cctv-camera.png'), value: 'cctv' },
    { label: 'Computer', image: require('./../../assets/computer.png'), value: 'computer' },
    { label: 'Mobile', image: require('./../../assets/smartphone.png'), value: 'mobile' },
    { label: 'Ac/Fridge', image: require('./../../assets/acfridge-removebg-preview.png'), value: 'acFridge' },
  ];

  const handleSelect = (item) => {
    navigation.navigate('UsersList', { skillSector: item.value });
  };

  const renderGridItem = ({ item }) => {
    const isAcFridge = item.value === 'acFridge';

    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => handleSelect(item)}
      >
        <Image
          source={item.image}
          style={[styles.gridImage, isAcFridge && styles.acFridgeImage]}
        />
        <Text style={styles.gridLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

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
    width: 40, // Default width for other items
    height: 40, // Default height for other items
    marginBottom: 10,
  },
  acFridgeImage: {
    width: 60, // Adjusted width for Ac/Fridge
    height: 60, // Adjusted height for Ac/Fridge
  },
  gridLabel: {
    fontSize: 14,
  },
});

export default Electronics;
