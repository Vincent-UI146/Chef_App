import { useState, useCallback } from 'react';
import { MenuItem, Course, CourseStats } from './types';
import { initialMenuItems } from './data';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  const addMenuItem = useCallback((item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
  }, []);

  const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const getItemsByCourse = useCallback((course: Course) => {
    return menuItems.filter(item => item.course === course);
  }, [menuItems]);

  const getCourseStats = useCallback((): CourseStats[] => {
    const courses: Course[] = ['Starters', 'Main Courses', 'Desserts', 'Drinks'];
    
    return courses.map(course => {
      const courseItems = getItemsByCourse(course);
      const count = courseItems.length;
      
      if (count === 0) {
        return {
          course,
          count: 0,
          averagePrice: 0,
          totalItems: menuItems.length
        };
      }

      const totalPrice = courseItems.reduce((sum, item) => sum + item.price, 0);
      const averagePrice = parseFloat((totalPrice / count).toFixed(2));

      return {
        course,
        count,
        averagePrice,
        totalItems: menuItems.length
      };
    });
  }, [menuItems, getItemsByCourse]);

  const getFilteredItems = useCallback((filters: { courses: string[]; priceRange: { min: number; max: number } }) => {
    return menuItems.filter(item => {
      const courseMatch = filters.courses.includes(item.course);
      const priceMatch = item.price >= filters.priceRange.min && item.price <= filters.priceRange.max;
      return courseMatch && priceMatch;
    });
  }, [menuItems]);

  return {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getItemsByCourse,
    getCourseStats,
    getFilteredItems,
  };
};