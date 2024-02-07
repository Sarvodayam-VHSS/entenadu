import React, { useState } from 'react';
import {
  View, ScrollView, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Text, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Defines an EditProfileScreen component tailored for agricultural professionals
const AgriProfileEditScreen = ({ navigation }) => {
  // State for managing the profile details of an agricultural professional
  const [profileDetails, setProfileDetails] = useState({
    fullName: '',
    farmAddress: '',
    zipCode: '',
    dateOfBirth: new Date(),
    phoneNumber: '',
    emailId: '',
    identificationNumber: '',
    educationalBackground: '',
    areaOfExpertise: '',
    bloodType: '',
    yearsOfExperience: '',
    localAuthority: '',
    wardNumber: '',
    villageName: '',
    nearestLandmark: '',
  });

  // State to manage the visibility of the date picker
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Handles changes to any input field
  const handleChange = (fieldName, value) => {
    setProfileDetails(prevState => ({ ...prevState, [fieldName]: value }));
  };

  // Handles date selection for the date of birth field
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || profileDetails.dateOfBirth;
    setDatePickerVisible(Platform.OS === 'ios');
    handleChange('dateOfBirth', currentDate);
  };

  // Function to execute upon form submission
  const handleSubmit = () => {
    console.log('Profile Updated:', profileDetails);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.formContainer}>
        {/* Section for uploading a profile photo */}
        <TouchableOpacity style={styles.imagePicker}>
          {/* Placeholder for image picker logic */}
          <Text style={styles.imagePickerText}>Tap to upload a profile picture</Text>
        </TouchableOpacity>

        {/* Dynamically renders input fields based on the profileDetails state */}
        {Object.entries(profileDetails).map(([key, value]) => {
          if (key === 'dateOfBirth') {
            // Renders a date picker for the Date of Birth field
            return (
              <View key={key} style={styles.datePickerContainer}>
                <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.datePicker}>
                  <Text style={styles.datePickerText}>{value.toDateString()}</Text>
                </TouchableOpacity>
                {datePickerVisible && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
            );
          }
          // Renders text inputs for all other fields
          return (
            <TextInput
              key={key}
              style={styles.input}
              onChangeText={(text) => handleChange(key, text)}
              value={typeof value === 'string' ? value : value.toString()}
              placeholder={key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())} // Beautifies the placeholder text
              autoCapitalize="none"
            />
          );
        })}
        <Button title="Save Changes" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: { // Style for the profile image (if implemented)
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e1e1', // Placeholder color
  },
  imagePickerText: {
    color: '#000',
    marginTop: 8,
    fontSize: 12,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  datePickerContainer: {
    marginBottom: 12,
  },
  datePicker: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  datePickerText: {
    fontSize: 16,
  },
});

export default AgriProfileEditScreen;
