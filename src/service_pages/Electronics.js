import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Electronics = () => {
  const navigation = useNavigation();

  const gridItems = [
    { label: 'TV', image: require('./../../assets/television.png'), value: 'Tv And Electronics' },
    { label: 'CCTV', image: require('./../../assets/cctv-camera.png'), value: 'CCTV' },
    { label: 'Computer', image: require('./../../assets/computer.png'), value: 'Computer' },
    { label: 'Mobile', image: require('./../../assets/smartphone.png'), value: 'Mobile' },
    { label: 'Ac/Fridge', image: require('./../../assets/acfridge-removebg-preview.png'), value: 'Ac / Fridge' },
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
        numColumns={2}
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
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  acFridgeImage: {
    width: 60,
    height: 60,
  },
  gridLabel: {
    fontSize: 14,
  },
});

export default Electronics;
