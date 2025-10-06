import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuItemCard } from './MenuItemCard';
import { MenuItem } from './MenuItemCard';
import { initialMenuItems } from './mockData';
import { RootStackParamList } from './navigation';
import { styles, colors } from './style';
import { Course } from './Index';

// Define navigation props type
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [filters, setFilters] = useState({
    courses: ['Starters', 'Main Courses', 'Desserts', 'Drinks'],
    priceRange: { min: 0, max: 100 }
  });

  // Handle adding new item
  const handleAddItem = () => {
    navigation.navigate('AddEditItem', {
      onSave: (newItem: MenuItem) => {
        setMenuItems(prev => [...prev, newItem]);
        Alert.alert('Success', 'Menu item added successfully!');
      }
    });
  };

  // Handle editing existing item
  const handleEditItem = (item: MenuItem) => {
    navigation.navigate('AddEditItem', {
      item,
      onSave: (updatedItem: MenuItem) => {
        setMenuItems(prev => 
          prev.map(menuItem => 
            menuItem.id === updatedItem.id ? updatedItem : menuItem
          )
        );
        Alert.alert('Success', 'Menu item updated successfully!');
      },
      onDelete: (id: string) => {
        setMenuItems(prev => prev.filter(item => item.id !== id));
        Alert.alert('Success', 'Menu item deleted successfully!');
      }
    });
  };

  // Handle filter application
  const handleOpenFilter = () => {
    navigation.navigate('Filter', {
      filters,
      onApplyFilters: (newFilters) => {
        setFilters(newFilters);
        // In final PoE, we'll implement actual filtering logic
        Alert.alert('Filters Applied', 'Menu items filtered successfully!');
      }
    });
  };

  const getItemsByCourse = (course: Course) => {
    return menuItems.filter(item => item.course === course);
  };

  const getTotalItems = () => menuItems.length;

  const getAveragePrice = () => {
    if (menuItems.length === 0) return 0;
    const total = menuItems.reduce((sum, item) => sum + item.price, 0);
    return (total / menuItems.length).toFixed(2);
  };

  const renderCourseSection = (course: Course) => {
    const courseItems = getItemsByCourse(course);
    if (courseItems.length === 0) return null;

    return (
      <View key={course}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {course} ({courseItems.length})
          </Text>
        </View>
        {courseItems.map(item => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            onPress={() => handleEditItem(item)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chef's Menu</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={handleOpenFilter}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total Menu Items: {getTotalItems()}
        </Text>
        <Text style={styles.statsText}>
          Average Price: ${getAveragePrice()}
        </Text>
        <Text style={styles.statsText}>
          Courses: Starters, Main Courses, Desserts, Drinks
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {renderCourseSection('Starters')}
        {renderCourseSection('Main Courses')}
        {renderCourseSection('Desserts')}
        {renderCourseSection('Drinks')}

        {menuItems.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={[styles.body, { color: '#666', textAlign: 'center' }]}>
              No menu items yet.{'\n'}
              Tap the button below to add your first dish!
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddItem}
      >
        <Text style={styles.addButtonText}>+ Add New Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
};