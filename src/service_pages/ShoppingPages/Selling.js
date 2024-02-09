import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, Alert, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Selling = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    amount: '',
    image: null,
  });

  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleImageUpload = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProduct({ ...product, image: response.uri });
        setShowUploadOptions(true);
        Alert.alert('Success', 'Image uploaded successfully!', [{ text: 'OK' }]);
      }
    });
  };

  const handleImageCapture = () => {
    Alert.alert('Success', 'Image uploaded successfully!', [{ text: 'OK' }]);
    // Logic for capturing a photo from the camera
    // This part needs to be implemented based on your requirements
    // After capturing, set the image URI and show the upload options
    // Example:
    // setProduct({ ...product, image: capturedImageUri });
    // setShowUploadOptions(true);
  };

  const handleAddProduct = () => {
    console.log('Adding product...');
    const isProductAdded = true;

    if (isProductAdded) {
      Alert.alert('Success', 'Product added successfully!', [{ text: 'OK' }]);
      setProduct({
        name: '',
        description: '',
        amount: '',
        image: null,
      });
      setShowUploadOptions(false);
    } else {
      Alert.alert('Error', 'Failed to add product. Please try again.', [{ text: 'OK' }]);
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
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (in Rupees)"
          keyboardType="numeric"
          value={product.amount}
          onChangeText={(text) => handleInputChange('amount', text)}
        />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Product Description (max 125 characters)"
          maxLength={125}
          multiline
          value={product.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        <Button title="Upload Image" onPress={handleImageUpload} />
        {showUploadOptions && (
          <View style={styles.uploadOptions}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
              <Text style={styles.buttonText}>Upload from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImageCapture}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}
        {product.image && <Image source={{ uri: product.image }} style={styles.imagePreview} />}
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    height: 100,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    textAlignVertical: 'top',
    borderRadius: 5,
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default Selling;
