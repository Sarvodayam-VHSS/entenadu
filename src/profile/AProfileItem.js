import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Address = ({ label, value, onEdit, userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsEditing(false);
    });
  };

  useEffect(() => {
    if (isEditing) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isEditing]);

  const handleTap = () => {
    setIsEditing(true);
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
    setIsEditing(false);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.label}>{label}</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={onEdit || handleTap}>
            <Text numberOfLines={4} style={styles.value}>
              {value}
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <Animated.View style={{ opacity: fadeAnim }}>
              <TextInput
                style={styles.editableText}
                value={editedValue}
                onChangeText={setEditedValue}
                multiline
              />
            </Animated.View>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContent: {
    flexDirection: 'column',
  },
  label: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
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
  saveButton: {
    backgroundColor: '#0066ff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  saveButtonText: {
    color: '#fff',
  },
  
});

export default Address;
