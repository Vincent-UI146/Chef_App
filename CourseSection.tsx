import React from 'react';
import { View, Text } from 'react-native';
import { MenuItem } from './types';
import { MenuItemCard } from './MenuItemCard';
import { styles } from './style';

interface Props {
  course: string;
  items: MenuItem[];
  onItemPress: (item: MenuItem) => void;
}

export const CourseSection: React.FC<Props> = ({ course, items, onItemPress }) => {
  if (items.length === 0) return null;

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {course} ({items.length})
        </Text>
      </View>
      {items.map(item => (
        <MenuItemCard 
          key={item.id} 
          item={item} 
          onPress={() => onItemPress(item)}
        />
      ))}
    </View>
  );
};