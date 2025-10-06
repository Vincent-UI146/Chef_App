import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MenuItem } from './types'; // ✅ Import from separate file
import { styles, colors } from './style';

interface MenuItemCardProps {
  item: MenuItem;
  onPress?: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.menuItemCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemHeader}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>${item.price}</Text>
      </View>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <View style={styles.courseTag}>
        <Text style={styles.courseTagText}>{item.course}</Text>
      </View>
    </TouchableOpacity>
  );
};
export { MenuItem };

