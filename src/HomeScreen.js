import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const dropdownItems = [
    { label: 'To do list', value: 'option1' },
    { label: 'Reminders', value: 'option2' },
    { label: 'Family Budget', value: 'option3' },
    { label: 'About Us', value: 'option4' },
    { label: 'Contact', value: 'option5' },
    { label: 'Signout', value: 'option6' }
  ];

  const gridItems = [
    { label: 'Home', icon: 'home', value: 'HomeServ' }, // Changed icon to 'home'
    { label: 'Knowledge', icon: 'book', value: 'Knowledge' }, // Changed icon to 'book'
    { label: 'Professional', icon: 'briefcase', value: 'Professional' }, // Changed icon to 'briefcase'
    { label: 'Aware', icon: 'info', value: 'Aware' }, // Changed icon to 'info'
    { label: 'Counselling', icon: 'phone-square', value: 'Counselling' }, // Changed icon to 'phone-square'
    { label: 'Vehicle', icon: 'car', value: 'Vehicle' }, // Changed icon to 'car'
    { label: 'Agri/Vet', icon: 'leaf', value: 'Agric' }, // Changed icon to 'leaf'
    { label: 'Shopping', icon: 'shopping-cart', value: 'Shopping' }, // Changed icon to 'shopping-cart'
    { label: 'Others', icon: 'commenting', value: 'Others' }, // Changed icon to 'commenting'
  ];

  const handleIconPress = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item) => {
    setSelectedOption(item.label);
    setDropdownVisible(false);

    // Perform navigation based on the selected option
    switch (item.value) {
      case 'option1':
        navigation.navigate('ToDoList');
        break;
      case 'option2':
        navigation.navigate('Reminders');
        break;
      case 'option6':
        // Sign out logic
        // For simplicity, you can navigate back to the login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        break;
      default:
        navigation.navigate(item.value);
        break;
    }
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
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
    <TouchableOpacity style={styles.gridItem} onPress={() => handleSelect(item)}>
      <Icon name={item.icon} size={30} color="#000" style={styles.gridIcon} />
      <Text style={styles.gridLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleIconPress}>
            <Icon name="caret-down" size={30} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.userName}>John Doe</Text>
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
    </TouchableWithoutFeedback>
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