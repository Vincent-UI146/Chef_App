import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { RootStackParamList, FilterState } from './types';
import { courses } from './data';
import { styles, colors } from './style';

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Filter'>;
type FilterScreenRouteProp = RouteProp<RootStackParamList, 'Filter'>;

interface Props {
  navigation: FilterScreenNavigationProp;
  route: FilterScreenRouteProp;
}

export const FilterScreen: React.FC<Props> = ({ navigation, route }) => {
  const { filters: initialFilters, onApplyFilters } = route.params;
  
  const [selectedCourses, setSelectedCourses] = useState<string[]>(initialFilters.courses);
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);

  useEffect(() => {
    setSelectedCourses(initialFilters.courses);
    setPriceRange(initialFilters.priceRange);
  }, [initialFilters]);

  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course)
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const handleReset = () => {
    setSelectedCourses(['Starters', 'Main Courses', 'Desserts', 'Drinks']);
    setPriceRange({ min: 0, max: 1000 });
  };

  const handleApply = () => {
    const newFilters: FilterState = {
      courses: selectedCourses,
      priceRange
    };
    
    onApplyFilters(newFilters);
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const isCourseSelected = (course: string) => selectedCourses.includes(course);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filter Menu</Text>
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]}
            onPress={handleClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={[styles.card, { marginBottom: 20 }]}>
            <Text style={[styles.label, { marginBottom: 15 }]}>COURSES</Text>
            {courses.map((course) => (
              <TouchableOpacity
                key={course.value}
                style={styles.filterOption}
                onPress={() => toggleCourse(course.value)}
              >
                <Text style={styles.statsText}>{course.label}</Text>
                <Switch
                  value={isCourseSelected(course.value)}
                  onValueChange={() => toggleCourse(course.value)}
                  trackColor={{ false: '#767577', true: colors.success }}
                  thumbColor={isCourseSelected(course.value) ? colors.white : '#f4f3f4'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.card, { marginBottom: 20 }]}>
            <Text style={[styles.label, { marginBottom: 15 }]}>PRICE RANGE</Text>
            <Text style={[styles.statsText, { textAlign: 'center', marginBottom: 10 }]}>
              R{priceRange.min} - R{priceRange.max}
            </Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={colors.success}
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor={colors.primary}
              value={priceRange.max}
              onValueChange={(value) => setPriceRange(prev => ({ ...prev, max: value }))}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.button, { 
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: colors.dark,
                flex: 1
              }]} 
              onPress={handleReset}
            >
              <Text style={[styles.buttonText, { color: colors.dark }]}>
                Reset
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.successButton, { flex: 2 }]} 
              onPress={handleApply}
            >
              <Text style={styles.buttonText}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};