import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList, MenuItem, Course } from './types';
import { useMenu } from './useMenu';
import { MenuItemCard } from './MenuItemCard';
import { courses } from './data';
import { styles, colors } from './style';

type ManageMenuNavigationProp = StackNavigationProp<RootStackParamList, 'ManageMenu'>;
type ManageMenuRouteProp = RouteProp<RootStackParamList, 'ManageMenu'>;

interface Props {
  navigation: ManageMenuNavigationProp;
  route: ManageMenuRouteProp;
}

export const ManageMenuScreen: React.FC<Props> = ({ navigation }) => {
  const { menuItems, addMenuItem, deleteMenuItem } = useMenu();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starters');

  const handleSaveItem = () => {
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

    const menuItem: Omit<MenuItem, 'id'> = {
      name: name.trim(),
      description: description.trim(),
      price: priceValue,
      course: selectedCourse
    };

    addMenuItem(menuItem);
    resetForm();
    setShowAddForm(false);
    Alert.alert('Success', 'Menu item added successfully!');
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteMenuItem(id);
            Alert.alert('Success', 'Menu item deleted successfully!');
          }
        }
      ]
    );
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('Starters');
    setEditingItem(null);
  };

  const handleCancel = () => {
    if (name.trim() || description.trim() || price.trim()) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to cancel?',
        [
          { text: 'Stay', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => {
              resetForm();
              setShowAddForm(false);
            }
          }
        ]
      );
    } else {
      setShowAddForm(false);
    }
  };

  const courseItems: Record<Course, MenuItem[]> = {
    'Starters': menuItems.filter(item => item.course === 'Starters'),
    'Main Courses': menuItems.filter(item => item.course === 'Main Courses'),
    'Desserts': menuItems.filter(item => item.course === 'Desserts'),
    'Drinks': menuItems.filter(item => item.course === 'Drinks'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Manage Menu</Text>
          <TouchableOpacity 
            style={[styles.button, styles.successButton]}
            onPress={() => setShowAddForm(true)}
          >
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {(Object.entries(courseItems) as [Course, MenuItem[]][]).map(([course, items]) => (
            <View key={course}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {course} ({items.length})
                </Text>
              </View>
              {items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  showDelete={true}
                  onDelete={handleDeleteItem}
                />
              ))}
            </View>
          ))}

          {menuItems.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No menu items yet.{'\n'}
                Tap "Add Item" to create your first dish!
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Add Item Modal */}
        <Modal
          visible={showAddForm}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={handleCancel}
        >
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Add Menu Item</Text>
                <TouchableOpacity 
                  style={[styles.button, styles.dangerButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <ScrollView 
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
                    autoFocus={true}
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
                  <TouchableOpacity 
                    style={[styles.button, styles.dangerButton, { flex: 1 }]} 
                    onPress={handleCancel}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.successButton, { flex: 2 }]} 
                    onPress={handleSaveItem}
                  >
                    <Text style={styles.buttonText}>Save Item</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};