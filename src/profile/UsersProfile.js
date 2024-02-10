import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { get } from "@react-native-firebase/database";
import { dataRef } from "../../Firebase";

const UsersProfile = ({ route }) => {
  const { userId } = route.params;
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userRef = dataRef.ref(`registrations/${userId}`);

    const fetchData = async () => {
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          // Convert dob to age
          const dobDate = new Date(userData.dob);
          const today = new Date();
          const age = Math.floor(
            (today - dobDate) / (365.25 * 24 * 60 * 60 * 1000)
          );
          userData.age = age;
          setUserInfo(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066ff" />
      </View>
    );
  }

  const DetailIcon = ({ iconName, label, value }) => (
    <View style={styles.detailRow}>
      <Icon name={iconName} size={20} color="#4A6572" />
      <Text style={styles.detailText}>{`${label}: ${value}`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Avatar.Image
            source={{
              uri:
                userInfo.profileImageUrl ||
                "https://api.adorable.io/avatars/285/avatar.png",
            }}
            size={90}
            style={styles.avatar}
          />
          <Title style={styles.title}>{userInfo.name}</Title>
          <Title style={styles.title}>{userInfo.skillSector}</Title>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL(`tel:${userInfo.phone}`)}
          >
            <Icon name="phone" size={24} color="#FFFFFF" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <DetailIcon label="Name" value={userInfo.name} icon="account" />
          <DetailIcon
            label="Address"
            value={userInfo.address}
            icon="map-marker"
          />
          <DetailIcon label="Pincode" value={userInfo.pincode} icon="pin" />
          <DetailIcon
            label="Date of Birth"
            value={userInfo.dob}
            icon="calendar"
          />
          <DetailIcon label="Phone" value={userInfo.phone} icon="phone" />
          <DetailIcon label="Email" value={userInfo.email} icon="email" />
          <DetailIcon
            label="Aadhaar No"
            value={userInfo.aadhaarNo}
            icon="card-account-details"
          />
          <DetailIcon
            label="Education"
            value={userInfo.educationQualification}
            icon="school"
          />
          <DetailIcon
            label="Skill Sector"
            value={userInfo.skillSector}
            icon="briefcase"
          />
          <DetailIcon
            label="Blood Group"
            value={userInfo.bloodGroup}
            icon="water"
          />
          <DetailIcon
            label="Experience"
            value={userInfo.experience}
            icon="history"
          />
          <DetailIcon
            label="Municipality/Panchayath"
            value={userInfo.municipality_panchayath}
            icon="office-building"
          />
          <DetailIcon label="Ward No" value={userInfo.wardNo} icon="numeric" />
          <DetailIcon
            label="Place"
            value={userInfo.place}
            icon="home-map-marker"
          />
          <DetailIcon
            label="Land Mark"
            value={userInfo.landMark}
            icon="map-marker-radius"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  callButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  callButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4A6572",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UsersProfile;
