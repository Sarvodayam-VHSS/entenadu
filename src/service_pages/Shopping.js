import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const products = [
  {
    id: '1',
    name: 'Classic Watch',
    seller: 'Timeless Pieces',
    price: '$120',
    imageUrl: 'path-to-watch-image',
  },
  {
    id: '2',
    name: 'Bluetooth Headphones',
    seller: 'Tech Gear',
    price: '$59',
    imageUrl: 'path-to-headphones-image',
  },
  // ... more products
];

const handleCallSeller = (sellerName) => {
  // Placeholder for call action
  console.log(`Contacting ${sellerName}...`);
};

const ProductItem = ({ name, seller, price, imageUrl }) => (
  <View style={styles.card}>
    <Image source={{ uri: imageUrl }} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.seller}>{seller}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
    <TouchableOpacity
      style={styles.callButton}
      onPress={() => handleCallSeller(seller)}
    >
      <Ionicons name="call-outline" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const ProductList = () => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          name={item.name}
          seller={item.seller}
          price={item.price}
          imageUrl={item.imageUrl}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  seller: {
    color: '#555',
    fontSize: 14,
  },
  price: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: '#22C55E', // A green shade for call-to-action
    padding: 10,
    borderRadius: 50,
    marginRight: 16,
  },
});

export default ProductList;
