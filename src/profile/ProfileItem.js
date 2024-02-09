import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { update } from '@react-native-firebase/database';

const ProfileItem = ({ label, value, icon, userId }) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleTap = () => {
    setEditing(true);
    setEditedValue(value);
  };

  const handleSave = async () => {
    try {
      // Update the value in Firebase
      await update(`registrations/${userId}`, { [label]: editedValue });
      console.log(`Updated ${label} to ${editedValue} in Firebase`);
    } catch (error) {
      console.error('Error updating data in Firebase:', error);
    }
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelValueContainer}>
        <Text style={styles.label}>{label}:</Text>
        {!editing ? (
          <TouchableOpacity onPress={handleTap}>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            style={styles.editableText}
            value={editedValue}
            onChangeText={setEditedValue}
          />
        )}
      </View>
      {editing && (
        <TouchableOpacity onPress={handleSave} style={styles.editIcon}>
          <Icon name="check" size={20} color="#0066ff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#333',
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    color: '#777',
  },
  editableText: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0066ff',
    color: '#333',
  },
  editIcon: {
    marginLeft: 10,
  },
});

export default ProfileItem;
