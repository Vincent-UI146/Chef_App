import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Switch 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Slider from '@react-native-community/slider'; 
import { courses } from './mockData';
import { RootStackParamList, FilterState } from './navigation';
import { styles, colors } from './style';

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Filter'>;
type FilterScreenRouteProp = RouteProp<RootStackParamList, 'Filter'>;

interface FilterScreenProps {
  navigation: FilterScreenNavigationProp;
  route: FilterScreenRouteProp;
}

export const FilterScreen: React.FC<FilterScreenProps> = ({ navigation, route }) => {
  const { filters: initialFilters, onApplyFilters } = route.params;
  
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    initialFilters.courses
  );
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);

  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course)
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const handleReset = () => {
    setSelectedCourses(['Starters', 'Main Courses', 'Desserts', 'Drinks']);
    setPriceRange({ min: 0, max: 100 });
  };

  const handleApply = () => {
    const newFilters: FilterState = {
      courses: selectedCourses,
      priceRange
    };
    
    if (onApplyFilters) {
      onApplyFilters(newFilters);
    }
    
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const isCourseSelected = (course: string) => selectedCourses.includes(course);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filter Menu</Text>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.danger }]}
          onPress={handleClose}
        >
          <Text style={styles.filterButtonText}>Close</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Course Filter Section */}
        <View style={[styles.statsContainer, { marginBottom: 20 }]}>
          <Text style={[styles.label, { marginBottom: 15 }]}>COURSES</Text>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.value}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#f0f0f0'
              }}
              onPress={() => toggleCourse(course.value)}
            >
              <Text style={styles.body}>{course.label}</Text>
              <Switch
                value={isCourseSelected(course.value)}
                onValueChange={() => toggleCourse(course.value)}
                trackColor={{ false: '#767577', true: colors.success }}
                thumbColor={isCourseSelected(course.value) ? colors.white : '#f4f3f4'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Range Section */}
        <View style={[styles.statsContainer, { marginBottom: 20 }]}>
          <Text style={[styles.label, { marginBottom: 15 }]}>PRICE RANGE</Text>
          <Text style={[styles.body, { textAlign: 'center', marginBottom: 10 }]}>
            R{priceRange.min} - R{priceRange.max}
          </Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={600}
            minimumTrackTintColor={colors.success}
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor={colors.primary}
            value={priceRange.max}
            onValueChange={(value) => setPriceRange(prev => ({ ...prev, max: value }))}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.button, { 
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: colors.dark
            }]} 
            onPress={handleReset}
          >
            <Text style={[styles.buttonText, { color: colors.dark }]}>
              Reset
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={handleApply}
          >
            <Text style={styles.buttonText}>
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};