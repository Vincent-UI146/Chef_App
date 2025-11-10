import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, MenuItem, FilterState } from './types';
import { useMenu } from './useMenu';
import { StatsCard } from './StatsCard';
import { CourseSection } from './CourseSection';
import { styles, colors } from './style';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { 
    menuItems, 
    getItemsByCourse, 
    getCourseStats,
    getFilteredItems 
  } = useMenu();
  
  const [filters, setFilters] = useState<FilterState>({
    courses: ['Starters', 'Main Courses', 'Desserts', 'Drinks'],
    priceRange: { min: 0, max: 100 }
  });

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);

  const handleOpenFilter = () => {
    navigation.navigate('Filter', {
      filters,
      onApplyFilters: (newFilters: FilterState) => {
        setFilters(newFilters);
        const filtered = getFilteredItems(newFilters);
        setFilteredItems(filtered);
        setIsFiltered(true);
      }
    });
  };

  const handleClearFilters = () => {
    setFilters({
      courses: ['Starters', 'Main Courses', 'Desserts', 'Drinks'],
      priceRange: { min: 0, max: 100 }
    });
    setFilteredItems(menuItems);
    setIsFiltered(false);
  };

  const handleManageMenu = () => {
    navigation.navigate('ManageMenu');
  };

  const displayItems = isFiltered ? filteredItems : menuItems;
  const stats = getCourseStats();

  const courses = ['Starters', 'Main Courses', 'Desserts', 'Drinks'] as const;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chef's Menu</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={handleOpenFilter}
            >
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={handleManageMenu}
            >
              <Text style={styles.buttonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatsCard stats={stats} />

        {isFiltered && (
          <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.statsText}>
              Showing {filteredItems.length} of {menuItems.length} items
            </Text>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: 'transparent', paddingHorizontal: 12 }]}
              onPress={handleClearFilters}
            >
              <Text style={[styles.buttonText, { color: colors.danger }]}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {courses.map(course => (
            <CourseSection
              key={course}
              course={course}
              items={displayItems.filter(item => item.course === course)}
              onItemPress={() => {}} // Read-only on home screen
            />
          ))}

          {displayItems.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {isFiltered 
                  ? 'No items match your filters.\nTry adjusting your filter settings.'
                  : 'No menu items available.\nTap "Manage" to add some dishes!'
                }
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};