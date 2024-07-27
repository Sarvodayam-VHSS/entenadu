import React, { useState, useRef, useEffect } from "react";
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
import { Avatar } from "react-native-paper";
import { dataRef } from "../Firebase";

const HomeScreen = ({ route }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();
  const { userId } = route.params;

  const [userDetails, setUserDetails] = useState(route.params.userDetails);
  const [reminders, setReminders] = useState([]);
  const [currentReminderIndex, setCurrentReminderIndex] = useState(0);
  const reminderTextAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const userRef = dataRef.ref(`app_users/${userId}`);

    const listener = userRef.on("value", (snapshot) => {
      const updatedUserDetails = snapshot.val();
      setUserDetails(updatedUserDetails);
    });

    // Fetch reminders when component mounts
    fetchReminders();

    return () => {
      userRef.off("value", listener);
    };
  }, [userId]);

  useEffect(() => {
    // Start cycling through reminders automatically if there are multiple reminders
    if (reminders.length > 1) {
      const intervalId = setInterval(animateReminderText, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  
    // Reset the reminder animation state if there's only one reminder or no reminders
    setCurrentReminderIndex(0);
    reminderTextAnim.setValue(0);
  }, [reminders]);
  
  const renderReminderText = () => {
    if (reminders.length === 0) {
      return "No reminders";
    } else if (reminders.length === 1) {
      return reminders[0].text; // Display the single reminder without animation
    } else {
      return getCurrentReminder(); // Use the animated reminder text for cycling
    }
  };

  // Function to fetch reminders from Firebase
  const fetchReminders = async () => {
    try {
      const remindersSnapshot = await dataRef.ref(`reminders`).once("value");
      if (remindersSnapshot.exists()) {
        const remindersData = remindersSnapshot.val();
        const remindersArray = Object.values(remindersData);
        setReminders(remindersArray);
        setCurrentReminderIndex(0);
      } else {
        setReminders([]);
        setCurrentReminderIndex(0);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const closeMenu = () => {
    slideMenuOut();
  };

  const menuItem = [
    { label: "To-Do List", value: "ToDoList" },
    { label: "Reminders", value: "Reminders" },
    { label: "Family Budget", value: "Budget" },
    { label: "About Us", value: "AboutUs" },
    { label: "Contact", value: "Contact" },
    { label: "Signout", value: "handleLogout" },
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
      navigation.navigate(value, {
        userId: userId,
        userDetails: userDetails,
      });
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

  const animateReminderText = () => {
    Animated.timing(reminderTextAnim, {
      toValue: 1,
      duration: 4900,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        // Move to the next reminder when animation completes
        setCurrentReminderIndex((prevIndex) => (prevIndex + 1) % reminders.length);
        reminderTextAnim.setValue(0);
      }
    });
  };

  const getCurrentReminder = () => {
    if (reminders.length === 0) {
      return "";
    }
    return reminders[currentReminderIndex].text;
  };

  const gridItems = [
    { label: "Home", image: require("./../assets/house.png"), value: "Home" },
    { label: "Electronics", image: require("./../assets/responsive.png"), value: "Electronics" },
    { label: "Vehicle", image: require("./../assets/vehicles.png"), value: "Vehicle" },
    { label: "Shopping", image: require("./../assets/shopping-cart.png"), value: "Shopping" },
    { label: "Professional", image: require("./../assets/professionals.png"), value: "Professional" },
    { label: "Aware", image: require("./../assets/public-relation.png"), value: "Aware" },
    { label: "Classroom", image: require("./../assets/person-chalkboard-solid.png"), value: "Classroom" },
    { label: "Agri/Vet", image: require("./../assets/vetagri1.png"), value: "Agriculture" },
    { label: "Others", image: require("./../assets/more.png"), value: "Others" },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
        <View style={styles.user}>
          <TouchableOpacity onPress={() => navigation.navigate("MyProfile", { userDetails })} style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image source={{ uri: userDetails.profileImageUrl || "./../assets/nouser.png" }} size={80} style={styles.avatar} />
            <Text style={styles.userName}>{userDetails.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeMenu} style={styles.closeMenu}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {menuItem.map((item) => (
          <TouchableOpacity key={item.value} onPress={() => handleSelectMenuItem(item.value)}>
            <Text style={styles.menuItem}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      <View style={styles.header}>
        <View style={styles.menuIcon}>
          <TouchableOpacity onPress={toggleMenu}>
            <Icon name="bars" size={24} color="#5A5A5A" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require("./../assets/logo.png")} style={styles.logoImage} />
        </View>
      </View>

      <FlatList
        data={gridItems}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.gridItem, item.label !== "Home" && item.label !== "Electronics" && item.label !== "Vehicle" && item.label !== "Shopping" && item.label !== "Professional" && styles.generalGridItem]} onPress={() => navigation.navigate(item.value, { userId: userId, userDetails: userDetails })}>
            <Image source={item.image} style={styles.gridImage} />
            <Text style={styles.gridLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
        numColumns={3}
        style={styles.grid}
      />
<View style={styles.reminders}>
<Text style={styles.sectionHeading}>Reminders</Text>
    <TouchableOpacity style={styles.reminderItem} onPress={animateReminderText}>
      <Animated.Text
        style={[
          styles.reminderText,
          {
            opacity: reminders.length > 1 ? reminderTextAnim : 1,
            transform: [
              {
                translateY: reminders.length > 1
                  ? reminderTextAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    })
                  : 0,
              },
            ],
          },
        ]}
      >
        {renderReminderText()}
      </Animated.Text>
    </TouchableOpacity>
    </View>

      <Modal animationType="slide" transparent={true} visible={logoutConfirmationVisible} onRequestClose={() => setLogoutConfirmationVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setLogoutConfirmationVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={handleLogout}>
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
  reminders:{
    marginBottom: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuIcon: {
    marginLeft: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logoImage: {
    width: 150,
    height: 55,
  },
  user: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexDirection: "row",
    paddingTop: 20,
  },
  closeMenu: {
    marginLeft: 40,
  },
  avatar: {
    backgroundColor: "#f4f4f4",
    top: 10,
    marginRight: 15,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
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
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  reminderItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  reminderText: {
    fontSize: 16,
    textAlign: "center",
    color:"red",
  },
});

export default HomeScreen;
