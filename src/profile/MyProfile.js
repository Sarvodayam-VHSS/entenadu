import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Title, Card } from 'react-native-paper';
import ProfileItem from './ProfileItem'; 
import { get } from '@react-native-firebase/database';
import { dataRef } from '../../Firebase';
import Address from './AProfileItem'

const MyProfile = ({ route }) => {
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
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <Avatar.Image 
            source={{ uri: userInfo?.profileImageUrl || 'https://api.adorable.io/avatars/80/abott@adorable.png' }}
            size={100}
            style={{ backgroundColor: '#f4f4f4' }}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={styles.title}>{userInfo?.name}</Title>
          </View>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <ProfileItem label="Name" value={userInfo?.name} icon="account" userId={userId} />
            <Address label="Address" numberOfLines={4} value={userInfo?.address} icon="map-marker" userId={userId} />
            <ProfileItem label="Pincode" value={userInfo?.pincode} icon="pin" userId={userId} />
            <ProfileItem label="Date of Birth" value={userInfo?.dob} icon="calendar" userId={userId} />
            <ProfileItem label="Phone" value={userInfo?.phone} icon="phone" userId={userId} />
            <ProfileItem label="Email" value={userInfo?.email} icon="email" userId={userId} />
            <ProfileItem label="Aadhaar No" value={userInfo?.aadhaarNo} icon="card-account-details" userId={userId} />
            <ProfileItem label="Education" value={userInfo?.educationQualification} icon="school" userId={userId} />
            <ProfileItem label="Skill Sector" value={userInfo?.skillSector} icon="briefcase" userId={userId} />
            <ProfileItem label="Blood Group" value={userInfo?.bloodGroup} icon="water" userId={userId} />
            <ProfileItem label="Experience" value={userInfo?.experience} icon="history" userId={userId} />
            <ProfileItem label="Municipality/Panchayath" value={userInfo?.municipality_panchayath} icon="office-building" userId={userId} />
            <ProfileItem label="Ward No" value={userInfo?.wardNo} icon="numeric" userId={userId} />
            <ProfileItem label="Place" value={userInfo?.place} icon="home-map-marker" userId={userId} />
            <ProfileItem label="Land Mark" value={userInfo?.landMark} icon="map-marker-radius" userId={userId} />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  
});

export default MyProfile;
