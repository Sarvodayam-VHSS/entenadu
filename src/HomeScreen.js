import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Title, Card } from "react-native-paper";

const HomeScreen = ({ route }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] =
    useState(false);
  const menuAnimation = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();
  const { userDetails, userId } = route.params;

  const closeMenu = () => {
    slideMenuOut();
  };

  const menuItem = [
    { label: "To-Do List", value: "ToDoList" },
    { label: "Reminders", value: "Reminders" },
    { label: "Family Budget", value: "Budget" },
    { label: "About Us", value: "Aboutus" },
    { label: "Contact", value: "Contact" },
    { label: "Signout", value: "handleLogout" },
  ];

  const gridItems = [
    {
      label: "Home",
      image: require("./../assets/house.png"),
      value: "homeServ",
    },
    {
      label: "Electronics",
      image: require("./../assets/responsive.png"),
      value: "electronics",
    },
    {
      label: "Vehicle",
      image: require("./../assets/vehicles.png"),
      value: "vehicle",
    },
    {
      label: "Shopping",
      image: require("./../assets/shopping-cart.png"),
      value: "shopping",
    },
    {
      label: "Professional",
      image: require("./../assets/professionals.png"),
      value: "professional",
    },
    {
      label: "Aware",
      image: require("./../assets/public-relation.png"),
      value: "aware",
    },
    {
      label: "Counselling",
      image: require("./../assets/conversation.png"),
      value: "counselling",
    },
    {
      label: "Agri/Vet",
      image: require("./../assets/vetagri1.png"),
      value: "agric",
    },
    {
      label: "Others",
      image: require("./../assets/more.png"),
      value: "others",
    },
  ];
  
  const slideMenuIn = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const slideMenuOut = () => {
    Animated.timing(menuAnimation, {
      toValue: -300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsMenuVisible(false));
  };

  const animateMenu = (toValue) => {
    Animated.timing(menuAnimation, {
      toValue: toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    animateMenu(isMenuVisible ? -300 : 0);
  };

  const handleSelectMenuItem = (value) => {
    if (value === "handleLogout") {
      setLogoutConfirmationVisible(true);
    } else {
      console.log("details: " + userDetails);
      navigation.navigate(value, { userId : userId });
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}
      >
        <View style={styles.user}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MyProfile", { userId })
            }
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Avatar.Image
              source={{
                uri:
                  userDetails.profileImageUrl ||
                  "https://api.adorable.io/avatars/80/abott@adorable.png",
              }}
              size={80}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{userDetails.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={closeMenu} style={styles.closeMenu}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {menuItem.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => handleSelectMenuItem(item.value)}
          >
            <Text style={styles.menuItem}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.userName}>{userDetails.name}</Text>
        <TouchableOpacity onPress={() => setLogoutConfirmationVisible(true)}>
          <Icon name="sign-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={gridItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate(item.value)}
          >
            <Image source={item.image} style={styles.gridImage} />
            <Text style={styles.gridLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
        numColumns={3}
        style={styles.grid}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutConfirmationVisible}
        onRequestClose={() => setLogoutConfirmationVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to sign out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setLogoutConfirmationVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleLogout}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#5682a3",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  user: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexDirection: "row",
    paddingTop: 20,
  },
  avatar: {
    backgroundColor: "#f4f4f4",
    marginRight: 12,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  menu: {
    position: "absolute",
    width: 300,
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    left: 0,
    top: 0,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  generalGridItem: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  grid: {
    marginTop: 20,
  },
  gridItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    margin: 10,
    backgroundColor: "#fff",
  },
  gridImage: {
    marginBottom: 10,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  gridLabel: {
    fontSize: 11,
    color: "#333",
    textAlign: "center",
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
