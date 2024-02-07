import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  query,
  orderByChild,
  startAt,
  endAt,
  onValue,
} from "@firebase/database";
import { getDownloadURL } from "@firebase/storage";
import { dataRef, storage } from "../../Firebase";

const UsersList = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);
  const { skillSector } = route.params;

  useEffect(() => {
    const usersRef = dataRef.ref("registrations/");

    const usersQuery = query(
      usersRef,
      orderByChild("skillSector"),
      startAt(skillSector),
      endAt(`${skillSector}\uf8ff`)
    );

    const handleData = async (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersArray = Object.values(usersData);

        for (const user of usersArray) {
          user.userID = user.email.split("@")[0] + user.phone;
          const imagePath = `profile_images/${user.userID}`;
          const imageRef = storage.child(imagePath);

          try {
            const imageUrl = await getDownloadURL(imageRef);
            user.imageUrl = imageUrl;

            // Convert dob to age
            const dobDate = new Date(user.dob);
            const today = new Date();
            const age = Math.floor(
              (today - dobDate) / (365.25 * 24 * 60 * 60 * 1000)
            );
            user.age = age;
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        }

        setUsers(usersArray);
      }
    };

    const usersRefListener = onValue(usersQuery, handleData);

    return () => {
      usersRefListener();
    };
  }, [skillSector]);

  const handleCardPress = (userId) => {
    navigation.navigate('UsersProfile', { userId });
  };

  const renderUserCard = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item.userID)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.boldText}>Name: {item.name}</Text>
        <Text style={styles.boldText}>Age: {item.age}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUserCard}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default UsersList;
