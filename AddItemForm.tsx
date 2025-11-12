import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './types';
import { courses, APP_CONSTANTS } from './data';
import { validateMenuItem, formatPrice } from './utils';
import { styles, colors } from './style';

interface Props {
  visible: boolean;
  item?: MenuItem;
  onSave: (item: Omit<MenuItem, 'id' | 'createdAt' | 'isFeatured'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

export const AddItemForm: React.FC<Props> = ({ 
  visible, 
  item, 
  onSave, 
  onCancel, 
  onDelete 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<MenuItem['course']>('Starters');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price.toString());
      setSelectedCourse(item.course);
    } else {
      resetForm();
    }
    setErrors({});
  }, [item, visible]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('Starters');
    setErrors({});
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Dish name is required';
        } else if (value.length > APP_CONSTANTS.MAX_NAME_LENGTH) {
          newErrors.name = `Dish name cannot exceed ${APP_CONSTANTS.MAX_NAME_LENGTH} characters`;
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'description':
        if (!value.trim()) {
          newErrors.description = 'Description is required';
        } else if (value.length > APP_CONSTANTS.MAX_DESCRIPTION_LENGTH) {
          newErrors.description = `Description cannot exceed ${APP_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`;
        } else {
          delete newErrors.description;
        }
        break;
        
      case 'price':
        const priceValue = parseFloat(value);
        if (!value.trim()) {
          newErrors.price = 'Price is required';
        } else if (isNaN(priceValue)) {
          newErrors.price = 'Price must be a valid number';
        } else if (priceValue <= 0) {
          newErrors.price = 'Price must be greater than 0';
        } else if (priceValue > APP_CONSTANTS.MAX_PRICE) {
          newErrors.price = `Price cannot exceed ${formatPrice(APP_CONSTANTS.MAX_PRICE)}`;
        } else {
          delete newErrors.price;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSave = async () => {
    // Validate all fields
    validateField('name', name);
    validateField('description', description);
    validateField('price', price);

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      Alert.alert('Validation Error', 'Please fix all errors before saving.');
      return;
    }

    const priceValue = parseFloat(price);
    
    // Final validation using utility function
    const validationErrors = validateMenuItem({
      name,
      description,
      price: priceValue,
      course: selectedCourse
    });

    if (validationErrors.length > 0) {
      Alert.alert('Validation Error', validationErrors.join('\n'));
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
        price: priceValue,
        course: selectedCourse
      });

      resetForm();
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!item || !onDelete) return;

    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      [
        { 
          text: 'Cancel', 
          style: 'cancel'
        },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            try {
              onDelete(item.id);
              resetForm();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete menu item');
            }
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    if (name.trim() || description.trim() || price.trim()) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to cancel?',
        [
          { 
            text: 'Keep Editing', 
            style: 'cancel'
          },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => {
              resetForm();
              onCancel();
            }
          }
        ]
      );
    } else {
      resetForm();
      onCancel();
    }
  };

  const getCharacterCountText = (current: number, max: number) => {
    return `${current}/${max}`;
  };

  const isFormValid = () => {
    return name.trim() && 
           description.trim() && 
           price.trim() && 
           parseFloat(price) > 0 && 
           Object.keys(errors).length === 0;
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
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
            <Text style={styles.headerTitle}>
              {item ? 'Edit Menu Item' : 'Add Menu Item'}
            </Text>
            <TouchableOpacity 
              style={[styles.button, styles.dangerButton]}
              onPress={handleCancel}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Dish Name Field */}
            <View style={styles.inputGroup}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.label}>Dish Name *</Text>
                <Text style={[styles.caption, { color: name.length > APP_CONSTANTS.MAX_NAME_LENGTH ? colors.danger : '#666' }]}>
                  {getCharacterCountText(name.length, APP_CONSTANTS.MAX_NAME_LENGTH)}
                </Text>
              </View>
              <TextInput
                style={[
                  styles.textInput,
                  errors.name ? { borderColor: colors.danger, borderWidth: 1 } : null
                ]}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  validateField('name', text);
                }}
                placeholder="Enter dish name"
                placeholderTextColor="#999"
                autoFocus={!item}
                editable={!isSubmitting}
                maxLength={APP_CONSTANTS.MAX_NAME_LENGTH}
              />
              {errors.name && (
                <Text style={{ color: colors.danger, marginTop: 4 }}>
                  {errors.name}
                </Text>
              )}
            </View>

            {/* Description Field */}
            <View style={styles.inputGroup}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.label}>Description *</Text>
                <Text style={[styles.caption, { color: description.length > APP_CONSTANTS.MAX_DESCRIPTION_LENGTH ? colors.danger : '#666' }]}>
                  {getCharacterCountText(description.length, APP_CONSTANTS.MAX_DESCRIPTION_LENGTH)}
                </Text>
              </View>
              <TextInput
                style={[
                  styles.textInput,
                  styles.textArea,
                  errors.description ? { borderColor: colors.danger, borderWidth: 1 } : null
                ]}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  validateField('description', text);
                }}
                placeholder="Describe the dish, ingredients, preparation style..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!isSubmitting}
                maxLength={APP_CONSTANTS.MAX_DESCRIPTION_LENGTH}
              />
              {errors.description && (
                <Text style={{ color: colors.danger, marginTop: 4 }}>
                  {errors.description}
                </Text>
              )}
            </View>

            {/* Price Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price (R) *</Text>
              <TextInput
                style={[
                  styles.textInput,
                  errors.price ? { borderColor: colors.danger, borderWidth: 1 } : null
                ]}
                value={price}
                onChangeText={(text) => {
                  // Allow only numbers and decimal point
                  const cleanedText = text.replace(/[^0-9.]/g, '');
                  // Ensure only one decimal point
                  const parts = cleanedText.split('.');
                  const formattedText = parts.length > 2 
                    ? parts[0] + '.' + parts.slice(1).join('')
                    : cleanedText;
                  
                  setPrice(formattedText);
                  validateField('price', formattedText);
                }}
                placeholder="0.00"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                editable={!isSubmitting}
              />
              {errors.price && (
                <Text style={{ color: colors.danger, marginTop: 4 }}>
                  {errors.price}
                </Text>
              )}
              <Text style={[styles.caption, { marginTop: 4 }]}>
                Maximum price: {formatPrice(APP_CONSTANTS.MAX_PRICE)}
              </Text>
            </View>

            {/* Course Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Course *</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedCourse}
                  onValueChange={(value) => setSelectedCourse(value as MenuItem['course'])}
                  enabled={!isSubmitting}
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

            {/* Action Buttons */}
            <View style={styles.buttonGroup}>
              {item && (
                <TouchableOpacity 
                  style={[styles.button, styles.dangerButton, { flex: 1 }]} 
                  onPress={handleDelete}
                  disabled={isSubmitting}
                >
                  <Text style={styles.buttonText}>
                    {isSubmitting ? '...' : 'Delete'}
                  </Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[
                  styles.button, 
                  styles.successButton, 
                  { flex: item ? 2 : 1, marginLeft: item ? 10 : 0 },
                  (!isFormValid() || isSubmitting) && { backgroundColor: '#95a5a6' }
                ]} 
                onPress={handleSave}
                disabled={!isFormValid() || isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? 'Saving...' : item ? 'Update Item' : 'Save Item'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Status */}
            {isSubmitting && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                  Saving menu item...
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};