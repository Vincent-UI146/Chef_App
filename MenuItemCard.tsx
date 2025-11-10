import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MenuItem } from './types';
import { styles } from './style';

interface Props {
  item: MenuItem;
  onPress?: () => void;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

export const MenuItemCard: React.FC<Props> = ({ 
  item, 
  onPress, 
  showDelete = false, 
  onDelete 
}) => {
  return (
    <TouchableOpacity 
      style={styles.menuItemCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemHeader}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>R{item.price}</Text>
      </View>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.courseTag}>
          <Text style={styles.courseTagText}>{item.course}</Text>
        </View>
        {showDelete && onDelete && (
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton, { paddingHorizontal: 12, paddingVertical: 6 }]}
            onPress={() => onDelete(item.id)}
          >
            <Text style={[styles.buttonText, { fontSize: 12 }]}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};