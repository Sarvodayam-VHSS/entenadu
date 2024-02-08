import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ProductDescription = () => {
  const product = {
    name: 'Classic Watch',
    amount: '$120',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: './../../assets/water-well.png', // Update the path to your image
    availability: 'Available at Timeless Pieces',
  };

  const handleBuyNow = () => {
    // Placeholder for Buy Now action
    console.log('Buy Now clicked!');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageGallery}>
          <Image source={{ uri: product.imageUrl }} style={styles.galleryImage} />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productAmount}>{product.amount}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.availabilityText}>{product.availability}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
        <Text style={styles.buttonText}>Contact Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  imageGallery: {
    height: 400,
    marginBottom: 16,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  productDetails: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  productAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  availabilityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  buyNowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDescription;
