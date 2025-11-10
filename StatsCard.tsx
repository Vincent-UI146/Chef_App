import React from 'react';
import { View, Text } from 'react-native';
import { CourseStats } from './types';
import { styles } from './style';

interface Props {
  stats: CourseStats[];
}

export const StatsCard: React.FC<Props> = ({ stats }) => {
  const totalItems = stats[0]?.totalItems || 0;
  const coursesWithItems = stats.filter(stat => stat.count > 0);

  return (
    <View style={styles.statsCard}>
      <Text style={[styles.label, { marginBottom: 12 }]}>Menu Statistics</Text>
      
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>Total Items:</Text>
        <Text style={styles.statsValue}>{totalItems}</Text>
      </View>
      
      {coursesWithItems.map((stat) => (
        <View key={stat.course} style={styles.statsRow}>
          <Text style={styles.statsText}>{stat.course}:</Text>
          <Text style={styles.statsValue}>
            {stat.count} items | Avg: R{stat.averagePrice}
          </Text>
        </View>
      ))}
      
      {coursesWithItems.length === 0 && (
        <Text style={styles.emptyStateText}>No menu items yet</Text>
      )}
    </View>
  );
};