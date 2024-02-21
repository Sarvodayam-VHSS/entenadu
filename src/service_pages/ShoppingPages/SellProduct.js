import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import { dataRef, storage } from "../../../Firebase";

const SellProduct = ({ route }) => {
  const { userDetails } = route.params;
  const [product, setProduct] = useState({
    name: "",
    description: "",
    amount: "",
    availability: "Available",
    image: null,
  });

  const [cameraPermission, setCameraPermission] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const showToast = (msgType, message) => {
    Toast.show({
      type: msgType,
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleInputChange = (key, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [key]: value,
    }));
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
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: result.assets[0].uri,
        }));
      }
    }
  };

  const handleCameraCapture = async () => {
    if (cameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
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
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: result.assets[0].uri,
          }));
        }
      }
    } else {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera permissions to make this work!",
        [{ text: "OK" }]
      );
    }
  };

  const generateUniqueId = (name) => {
    return `${userDetails.userId}_${name.toLowerCase().replace(/\s+/g, "_")}`;
  };

  const handleAddProduct = async () => {
    if (
      !product.name ||
      !product.amount ||
      !product.description ||
      !product.image
    ) {
      showToast(
        "error",
        "Please fill in all fields before adding the product."
      );
      return;
    }

    const uniqueId = generateUniqueId(product.name);
    const productPath = `market/${uniqueId}`;
    const imageRef = storage.child(productPath);

    try {
      setLoading(true);
      const response = await fetch(product.image);
      const blob = await response.blob();
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();

      await dataRef.ref(productPath).set({
        ...product,
        image: imageUrl,
        seller: userDetails.name,
        phone: userDetails.phone,
        userId: userDetails.userId,
      });

      setProduct({
        name: "",
        description: "",
        amount: "",
        availability: "Available",
        image: null,
      });
      showToast("success", "Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.message);
      showToast("error", "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Sell Your Item</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product Name (max 50 characters)"
          maxLength={50}
          value={product.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (in Rupees)"
          keyboardType="numeric"
          value={product.amount}
          onChangeText={(text) => handleInputChange("amount", text)}
        />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Product Description (max 125 characters)"
          maxLength={125}
          multiline
          value={product.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={openImagePickerOptions}
        >
          <View style={styles.imagePreviewContainer}>
            {product.image ? (
              <Image
                source={{ uri: product.image }}
                style={styles.imagePreview}
              />
            ) : (
              <Text style={styles.imageContainerText}>
                Click to Upload Image
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCameraCapture}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498DB" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 20,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    height: 100,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    textAlignVertical: "top",
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreviewContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainerText: {
    color: "#757575",
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  cameraButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
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

export default SellProduct;
