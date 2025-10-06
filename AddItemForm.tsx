import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { MenuItemCard } from './MenuItemCard';
import { courses } from './mockData';
import { RootStackParamList } from './navigation';
import { styles, colors } from './style';
import { Course, MenuItem } from './Index';

type AddEditItemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddEditItem'>;
type AddEditItemScreenRouteProp = RouteProp<RootStackParamList, 'AddEditItem'>;

interface AddEditItemScreenProps {
  navigation: AddEditItemScreenNavigationProp;
  route: AddEditItemScreenRouteProp;
}

export const AddEditItemScreen: React.FC<AddEditItemScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { item, onSave, onDelete } = route.params || {};
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starters');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (item) {
      setIsEditing(true);
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price.toString());
      setSelectedCourse(item.course);
    }
  }, [item]);

  const handleSave = () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a dish name');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    const menuItem: MenuItem = {
      id: item?.id || Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      price: priceValue,
      course: selectedCourse
    };

    // Call the save callback if provided
    if (onSave) {
      onSave(menuItem);
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (!item || !onDelete) return;

    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            onDelete(item.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    if (name.trim() || description.trim() || price.trim()) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          { text: 'Stay', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dish Name *</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter dish name"
            placeholderTextColor="#999"
            autoFocus={!isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the dish, ingredients, preparation style..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price ($) *</Text>
          <TextInput
            style={styles.textInput}
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Course *</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedCourse}
              onValueChange={(value) => setSelectedCourse(value as Course)}
            >
              {courses.map((courseOption) => (
                <Picker.Item 
                  key={courseOption.value} 
                  label={courseOption.label} 
                  value={courseOption.value} 
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          {isEditing && (
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.button, styles.saveButton, 
              { flex: isEditing ? 1 : 0, marginLeft: isEditing ? 10 : 0 }]} 
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>
              {isEditing ? 'Update' : 'Save'} Item
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.button, { 
            backgroundColor: 'transparent', 
            borderWidth: 1, 
            borderColor: colors.danger,
            marginTop: 10 
          }]} 
          onPress={handleCancel}
        >
          <Text style={[styles.buttonText, { color: colors.danger }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};