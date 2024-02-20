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
  Picker,
} from "react-native";
import { dataRef } from "../../../Firebase";

const EditProduct = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [availability, setAvailability] = useState("Available");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productSnapshot = await dataRef
          .ref(`market/${productId}`)
          .once("value");
        const productData = productSnapshot.val();
        setProduct(productData);
        setEditedProduct(productData);
        setAvailability(productData?.availability || "Available");
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
    setProduct(editedProduct);
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    if (field === "availability") {
      setAvailability(value);
    } else {
      setEditedProduct({ ...editedProduct, [field]: value });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageGallery}>
          <Image
            source={{ uri: product?.image }}
            style={styles.galleryImage}
          />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.fieldLabel}>Name:</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedProduct?.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          ) : (
            <Text style={styles.productName}>{product?.name}</Text>
          )}
          <Text style={styles.fieldLabel}>Amount:</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedProduct?.amount}
              onChangeText={(text) => handleChange("amount", text)}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.productAmount}>
              ₹{product?.amount}
            </Text>
          )}
          <Text style={styles.fieldLabel}>Description:</Text>
          {editMode ? (
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={editedProduct?.description}
              onChangeText={(text) => handleChange("description", text)}
              multiline={true}
            />
          ) : (
            <Text style={styles.productDescription}>
              {product?.description}
            </Text>
          )}
          <Text style={styles.fieldLabel}>Availability:</Text>
          {editMode ? (
            <Picker
              selectedValue={availability}
              onValueChange={(itemValue) => handleChange("availability", itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Available" value="Available" color="#22C55E" />
              <Picker.Item label="Limited" value="Limited" color="#D28A31" />
              <Picker.Item label="Unavailable" value="Unavailable" color="red" />
            </Picker>
          ) : (
            <Text style={[styles.availabilityText, { color: getColorByAvailability(availability) }]}>
              {availability}
            </Text>
          )}
          {!editMode && (
            <Text style={styles.productSeller}>
              Seller: {product?.seller}
            </Text>
          )}
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

    </View>
  );
};

const getColorByAvailability = (availability) => {
  switch (availability) {
    case "Available":
      return "#22C55E";
    case "Limited":
      return "#D28A31";
    case "Unavailable":
      return "red";
    default:
      return "#000000";
  }
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
    marginTop:10,
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
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#555",
  },
  picker: {
    height: 40,
    marginBottom: 10,
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
