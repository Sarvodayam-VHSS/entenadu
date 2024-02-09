import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ route }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] =
    useState(false);
  const navigation = useNavigation();
  const { userDetails, userId } = route.params;

  const dropdownItems = [
    { label: "To-Do List", value: "ToDoList" },
    { label: "Reminders", value: "Reminders" },
    { label: "Family Budget", value: "Budget" },
    { label: "About Us", value: "Aboutus" },
    { label: "Contact", value: "Contact" },
    { label: "Signout", value: "Signout" },
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

  const handleIconPress = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item) => {
    setSelectedOption(item.label);
    setDropdownVisible(false);

    if (item.value === "Signout") {
      setLogoutConfirmationVisible(true);
    } else {
      console.log("Home screen: " + userId);
      navigation.navigate(item.value, { userId: userId });
    }
  };

  const renderDropdown = () => (
    <View style={styles.dropdown}>
      {dropdownItems.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={styles.dropdownItem}
          onPress={() => handleSelect(item)}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.gridItem,
        item.label !== "Home" &&
          item.label !== "Electronics" &&
          item.label !== "Vehicle" &&
          item.label !== "Shopping" &&
          styles.generalGridItem,
        item.label === "Professional" && styles.professionalGridItem,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Image source={item.image} style={styles.gridImage} />
      <Text style={styles.gridLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon
            name={isDropdownVisible ? "times" : "bars"}
            size={30}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyProfile", { userId })}
        >
          <Text style={styles.userName}>{userDetails.name}</Text>
        </TouchableOpacity>
      </View>

      {isDropdownVisible && renderDropdown()}

      <FlatList
        data={gridItems}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        style={styles.grid}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutConfirmationVisible}
        onRequestClose={() => {
          setLogoutConfirmationVisible(false);
        }}
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
                onPress={() => {
                  handleLogout(); // Move handleLogout here
                  setLogoutConfirmationVisible(false);
                }}
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
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 15,
  },
  icon: {
    marginRight: 10,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  dropdown: {
    position: "absolute",
    top: 90,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    minWidth: 120,
  },
  buttonCancel: {
    backgroundColor: "#ddd",
  },
  buttonConfirm: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
