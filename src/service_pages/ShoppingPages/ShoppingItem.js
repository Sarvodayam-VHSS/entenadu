import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32) / 2; 

const products = [
  {
    id: '1',
    name: 'Classic Watch with a Very Long Name',
    seller: 'Timeless Pieces',
    price: '$120',
    imageUrl: 'assets/smartphone.png',
  },
  {
    id: '2',
    name: 'Bluetooth Headphones',
    seller: 'Tech Gear',
    price: '$59',
    imageUrl: 'path-to-headphones-image',
  },
  {
    id: '3',
    name: 'Short Name',
    seller: 'Timeless Pieces',
    price: '$120',
    imageUrl: 'assets/smartphone.png',
  },
  {
    id: '2',
    name: 'Bluetooth Headphones',
    seller: 'Tech Gear',
    price: '$59',
    imageUrl: 'path-to-headphones-image',
  },
  {
    id: '2',
    name: 'Bluetooth Headphones',
    seller: 'Tech Gear',
    price: '$59',
    imageUrl: 'path-to-headphones-image',
  },
  
];


  
const ShoppingTile = ({ name, amount, imageUrl }) => (
    <View style={styles.tile}>
      <Image source={{ uri: imageUrl || 'path-to-placeholder-image' }} style={styles.tileImage} />
      <View style={styles.tileContent}>
        <Text style={styles.tileName}>{truncateProductName(name, 40)}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.tileAmount}>{amount}</Text>
        </View>
      </View>
    </View>
  );
  
  const truncateProductName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };
  const handleSelect = (item) => {
    if (item.value===""){
      navigation.navigate('ShopEach');
    }
  };
  
  const ShoppingPage = () => {
    return (
      <FlatList
        data={products}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ShoppingTile
            name={item.name}
            amount={item.price}
            imageUrl={item.imageUrl}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };
  
  const styles = StyleSheet.create({
    tile: {
      width: cardWidth,
      height: 220,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      margin: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    tileImage: {
      width: '100%',
      height: 130,
      borderRadius: 8,
      marginBottom: 8,
    },
    tileContent: {
      flex: 1,
    },
    tileName: {
      fontWeight: 'bold',
      fontSize: 12,
      marginBottom: 15
    },
    amountContainer: {
      position: 'absolute',
      bottom: 1,
      left: 0.5,

    },
    tileAmount: {
      color: '#009933',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default ShoppingPage;