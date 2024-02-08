import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const { userDetails, userId } = route.params;

  const dropdownItems = [
    { label: 'To-Do List', value: 'ToDoList' },
    { label: 'Reminders', value: 'Reminders' },
    { label: 'Family Budget', value: 'Budget' },
    { label: 'About Us', value: 'Aboutus' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Signout', value: 'Signout' }
  ];

  const gridItems = [
    { label: 'Home', icon: 'home', value: 'homeServ' },
    { label: 'Electronics', icon: 'bolt', value: 'electronics' },
    { label: 'Vehicle', icon: 'car', value: 'vehicle' },
    { label: 'Shopping', icon: 'shopping-cart', value: 'shopping' },
    { label: 'Professional', icon: 'briefcase', value: 'professional' },
    { label: 'Aware', icon: 'info', value: 'aware' },
    { label: 'Counselling', icon: 'phone-square', value: 'counselling' },
    { label: 'Agri/Vet', icon: 'leaf', value: 'agric' },
    { label: 'Others', icon: 'commenting', value: 'others' },
  ];

  const handleLogout = async () => {
    console.log("signout");
    try {
      await AsyncStorage.removeItem('userId');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const handleIconPress = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item) => {
    setSelectedOption(item.label);
    setDropdownVisible(false);

    if (item.value === 'Signout') {
      handleLogout();
    } else if (item.value === 'Shopping') {
      navigation.navigate('Shopping');
    } else {
      navigation.navigate(item.value);
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
        (item.label !== 'Home' && item.label !== 'Electronics' && item.label !== 'Vehicle' && item.label !== 'Shopping') && styles.generalGridItem,
        item.label === 'Professional' && styles.professionalGridItem,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Icon name={item.icon} size={30} color="#000" style={styles.gridIcon} />
      <Text style={styles.gridLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon
            name={isDropdownVisible ? 'caret-up' : 'caret-down'}
            size={30}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile', { userId })}>
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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  icon: {
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  generalGridItem: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  grid: {
    marginTop: 10,
  },
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  gridIcon: {
    marginBottom: 5,
  },
  gridLabel: {
    fontSize: 12,
  },
});

export default HomeScreen;
