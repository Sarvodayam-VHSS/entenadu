import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Avatar, Title, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ProfileItem from './ProfileItem'; 
import { get } from '@react-native-firebase/database';
import { dataRef } from '../../Firebase';

const MyProfile = ({ route }) => {
  const { userId } = route.params;
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userRef = dataRef.ref(`app_users/${userId}`);

    const fetchData = async () => {
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const dobDate = new Date(userData.dob);
          const today = new Date();
          const age = Math.floor((today - dobDate) / (365.25 * 24 * 60 * 60 * 1000));
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

  const handleChooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setUserInfo({ ...userInfo, profileImageUrl: result.uri });
      }
    } catch (error) {
      console.error('Error choosing image:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
        <TouchableOpacity onPress={handleChooseImage}>
            <Avatar.Image 
              source={{ uri: userInfo?.profileImageUrl || './../../assets/nouser.png' }}
              size={100}
              style={{ backgroundColor: '#f4f4f4' }}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            <Title style={styles.title}>{userInfo?.name}</Title>
          </View>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <ProfileItem label="Name" value={userInfo?.name} icon="account" userId={userId} />
            <ProfileItem label="Phone" value={userInfo?.phone} icon="phone" userId={userId} />
            <ProfileItem label="Email" value={userInfo?.email} icon="email" userId={userId} />
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