import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
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
    landMark: 'Near Central Park',
  };

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
            source={{ uri: 'https://api.adorable.io/avatars/285/avatar.png' }}
            size={90}
            style={styles.avatar}
          />
          <Title style={styles.title}>{userInfo.name}</Title>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL(`tel:${userInfo.phone}`)}>
            <Icon name="phone" size={24} color="#FFFFFF" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <DetailIcon iconName="map-marker" label="Address" value={userInfo.address} />
          <DetailIcon iconName="calendar" label="Date of Birth" value={userInfo.dob} />
          <DetailIcon iconName="email" label="Email" value={userInfo.email} />
          <DetailIcon iconName="school" label="Education" value={userInfo.educationQualification} />
          <DetailIcon iconName="briefcase" label="Experience" value={userInfo.experience} />
            <DetailIcon iconName="blood-bag" label="Blood Group" value={userInfo.bloodGroup} />
            <DetailIcon iconName="account" label="Aadhaar No" value={userInfo.aadhaarNo} />
            <DetailIcon iconName="account" label="Skill Sector" value={userInfo.skillSector} />
            <DetailIcon iconName="account" label="Municipality/Panchayath" value={userInfo.municipalityPanchayath} />
            <DetailIcon iconName="account" label="Ward No" value={userInfo.wardNo} />
            <DetailIcon iconName="account" label="Place" value={userInfo.place} />
            <DetailIcon iconName="account" label="Landmark" value={userInfo.landMark} />

            
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4A6572',
  },
});

export default ProfileScreen;
