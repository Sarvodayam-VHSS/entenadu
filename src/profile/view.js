import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption, Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Example user data
  const userInfo = {
    name: 'John Doe',
    address: '123 Main St, Anytown, State',
    pincode: '123456',
    dob: '01/01/1990',
    phone: '+91-900000009',
    email: 'john_doe@email.com',
    aadhaarNo: '1234-5678-9123',
    educationQualification: 'Bachelor of Science',
    skillSector: 'Information Technology',
    bloodGroup: 'O+',
    experience: '5 Years',
    municipalityPanchayath: 'Anytown Municipality',
    wardNo: '12',
    place: 'Anytown',
    landMark: 'Near Central Park'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <Avatar.Image 
            source={{ uri: 'https://api.adorable.io/avatars/80/abott@adorable.png' }}
            size={100}
            style={{ backgroundColor: '#f4f4f4' }}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={styles.title}>John Doe</Title>
            <Caption style={styles.caption}>@j_doe</Caption>
          </View>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <ProfileItem label="Name" value={userInfo.name} icon="account" />
            <ProfileItem label="Address" value={userInfo.address} icon="map-marker" />
            <ProfileItem label="Pincode" value={userInfo.pincode} icon="pin" />
            <ProfileItem label="Date of Birth" value={userInfo.dob} icon="calendar" />
            <ProfileItem label="Phone" value={userInfo.phone} icon="phone" />
            <ProfileItem label="Email" value={userInfo.email} icon="email" />
            <ProfileItem label="Aadhaar No" value={userInfo.aadhaarNo} icon="card-account-details" />
            <ProfileItem label="Education" value={userInfo.educationQualification} icon="school" />
            <ProfileItem label="Skill Sector" value={userInfo.skillSector} icon="briefcase" />
            <ProfileItem label="Blood Group" value={userInfo.bloodGroup} icon="water" />
            <ProfileItem label="Experience" value={userInfo.experience} icon="history" />
            <ProfileItem label="Municipality/Panchayath" value={userInfo.municipalityPanchayath} icon="office-building" />
            <ProfileItem label="Ward No" value={userInfo.wardNo} icon="numeric" />
            <ProfileItem label="Place" value={userInfo.place} icon="home-map-marker" />
            <ProfileItem label="Land Mark" value={userInfo.landMark} icon="map-marker-radius" />
          </Card.Content>
        </Card>

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('edit')}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileItem = ({ label, value, icon }) => (
  <View style={styles.row}>
    <Icon name={icon} size={20} color="#777" />
    <Text style={styles.label}>{label}: </Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    color: "#777",
    marginLeft: 10,
    fontWeight: 'bold',
  },
  value: {
    color: "#777",
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editButton: {
    backgroundColor: '#0066ff',
    borderRadius: 25,
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ProfileScreen;
