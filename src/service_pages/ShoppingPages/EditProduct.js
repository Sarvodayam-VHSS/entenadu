import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import { dataRef, storage } from "../../../Firebase";

const EditProduct = ({ route }) => {
  const { productId, userDetails } = route.params;
  const navigation = useNavigation();
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [availability, setAvailability] = useState("Available");
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);

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

  const showToast = (msgType, message) => {
    Toast.show({
      type: msgType,
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const getFileSize = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const fileSize = fileInfo.size / (1024 * 1024);
    return fileSize;
  };

  const openImagePickerOptions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!",
        [{ text: "OK" }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const fileSize = await getFileSize(result.assets[0].uri);
      if (fileSize > 2) {
        showToast(
          "error",
          "File size exceeds 2MB. Please choose a smaller image."
        );
      } else {
        setNewImage(result.assets[0].uri);
      }
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    setDeleteConfirmationVisible(false);
    const productPath = `market/${productId}`;
    const imageRef = storage.child(productPath);

    try {
      setLoading(true);
      await dataRef.ref(productPath).remove();

      if (editedProduct?.image) {
        await imageRef.delete();
      }

      showToast("success", "Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.message);
      showToast("error", "Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
      navigation.replace("MyProduct", { userDetails: userDetails });
    }
  };

  const handleSave = () => {
    setProduct(editedProduct);
    handleAddProduct();
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    if (field === "availability") {
      setAvailability(value);
      setEditedProduct({ ...editedProduct, [field]: value });
    } else {
      setEditedProduct({ ...editedProduct, [field]: value });
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    const productPath = `market/${productId}`;
    const imageRef = storage.child(productPath);

    try {
      setLoading(true);
      if (newImage) {
        const response = await fetch(newImage);
        const blob = await response.blob();
        await imageRef.put(blob);
        const imageUrl = await imageRef.getDownloadURL();
        setEditedProduct({ ...editedProduct, image: imageUrl });
      }

      await dataRef.ref(productPath).set(editedProduct);
      showToast("success", "Product edited successfully!");
    } catch (error) {
      console.error("Error editing product:", error.message);
      showToast("error", "Failed to edit product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {editMode ? (
          <TouchableOpacity onPress={openImagePickerOptions}>
            <View style={styles.imageGallery}>
              <Image
                source={{ uri: newImage || editedProduct?.image }}
                style={styles.galleryImage}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.imageGallery}>
            <Image
              source={{ uri: newImage || editedProduct?.image }}
              style={styles.galleryImage}
            />
          </View>
        )}
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
            <Text style={styles.productAmount}>₹{product?.amount}</Text>
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
              onValueChange={(itemValue) =>
                handleChange("availability", itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item
                label="Available"
                value="Available"
                color="#22C55E"
              />
              <Picker.Item label="Limited" value="Limited" color="#D28A31" />
              <Picker.Item
                label="Unavailable"
                value="Unavailable"
                color="red"
              />
            </Picker>
          ) : (
            <Text
              style={[
                styles.availabilityText,
                { color: getColorByAvailability(availability) },
              ]}
            >
              {availability}
            </Text>
          )}
          {!editMode && (
            <Text style={styles.productSeller}>Seller: {product?.seller}</Text>
          )}
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498DB" />
          </View>
        )}
      </ScrollView>
      {editMode ? (
        <>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setDeleteConfirmationVisible(true)}
          >
            <Text style={styles.buttonText}>Delete Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteConfirmationVisible}
        onRequestClose={() => setDeleteConfirmationVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this product?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setDeleteConfirmationVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    height: 300,
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
    marginTop: 10,
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
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4444",
    paddingVertical: 16,
    marginBottom: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "40%",
  },
  buttonCancel: {
    backgroundColor: "#999",
  },
  buttonConfirm: {
    backgroundColor: "#5682a3",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default EditProduct;
