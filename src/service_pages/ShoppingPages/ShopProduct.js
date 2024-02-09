import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { dataRef } from "../../../Firebase";

const ShopProduct = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState({
    name: "",
    amount: "",
    description: "",
    imageUrl: "",
    availability: "",
    phone: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productSnapshot = await dataRef
          .ref(`market/${productId}`)
          .once("value");
        const productData = productSnapshot.val();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleBuyNow = () => {
    const phoneNumber = product.phone;

    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.warn("Phone number not available.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageGallery}>
          <Image
            source={{ uri: product.image }}
            style={styles.galleryImage}
          />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productAmount}>₹{product.amount}</Text>
          <Text style={styles.productSeller}>Seller: {product.seller}</Text>
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
    backgroundColor: "#F5F5F5",
  },
  imageGallery: {
    height: 400,
    marginBottom: 16,
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  productDetails: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  productAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#009933",
    marginBottom: 12,
  },
  productSeller: {
    fontSize: 20,
    color: "#555",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  availabilityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22C55E",
  },
  buyNowButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4444",
    paddingVertical: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShopProduct;
