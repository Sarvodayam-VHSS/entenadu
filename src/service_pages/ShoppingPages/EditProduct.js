import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import { dataRef } from "../../../Firebase";

const EditProduct = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productSnapshot = await dataRef
          .ref(`market/${productId}`)
          .once("value");
        const productData = productSnapshot.val();
        setProduct(productData);
        setEditedProduct(productData);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleBuyNow = () => {
    const phoneNumber = product?.phone;

    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.warn("Phone number not available.");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Save the edited product to the database
    // For simplicity, I'm not implementing database save logic here
    setProduct(editedProduct);
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageGallery}>
          <Image
            source={{ uri: product?.imageUrl }}
            style={styles.galleryImage}
          />
        </View>
        <View style={styles.productDetails}>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedProduct?.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          ) : (
            <Text style={styles.productName}>{product?.name}</Text>
          )}
          <Text style={styles.productAmount}>
            ₹{editMode ? editedProduct?.amount : product?.amount}
          </Text>
          <Text style={styles.productSeller}>
            Seller: {product?.seller}
          </Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedProduct?.description}
              onChangeText={(text) => handleChange("description", text)}
            />
          ) : (
            <Text style={styles.productDescription}>
              {product?.description}
            </Text>
          )}
          <Text style={styles.availabilityText}>
            {product?.availability}
          </Text>
        </View>
      </ScrollView>
      {editMode ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
        <Text style={styles.buttonText}>Contact Now</Text>
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  buyNowButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4444",
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProduct;
