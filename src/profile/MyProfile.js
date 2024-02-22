import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Avatar, Title, Card, Paragraph } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import { dataRef, storage } from "../../Firebase";

const MyProfile = ({ route }) => {
  const { userDetails } = route.params;
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
        handleUpdateUser(result.assets[0].uri);
      }
    }
  };

  const handleUpdateUser = async (selectedImage) => {
    setLoading(true);
    const userPath = `app_users/${userDetails.userId}`;
    const userImagePath = `app_profile_images/${userDetails.userId}`;
    const imageRef = storage.child(userImagePath);

    try {
      setLoading(true);
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();

      await dataRef.ref(userPath).update({ profileImageUrl: imageUrl });
      showToast("success", "Profile image updated successfully!");
    } catch (error) {
      console.error("Error editing profile:", error.message);
      showToast("error", "Failed to update profile image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.userInfoSection}>
        <TouchableOpacity onPress={openImagePickerOptions}>
          <Avatar.Image
            source={{
              uri:
                newImage ||
                userDetails.profileImageUrl ||
                "./../../assets/nouser.png",
            }}
            size={100}
            style={{ backgroundColor: "#f4f4f4" }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 20 }}>
          <Title style={styles.title}>{userDetails.name}</Title>
        </View>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph style={styles.detailLabel}>Name:</Paragraph>
          <Paragraph style={styles.detailValue}>{userDetails.name}</Paragraph>

          <Paragraph style={styles.detailLabel}>Email:</Paragraph>
          <Paragraph style={styles.detailValue}>{userDetails.email}</Paragraph>

          <Paragraph style={styles.detailLabel}>Phone:</Paragraph>
          <Paragraph style={styles.detailValue}>{userDetails.phone}</Paragraph>
        </Card.Content>
      </Card>
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
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 10,
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

export default MyProfile;