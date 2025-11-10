export type Course = 'Starters' | 'Main Courses' | 'Desserts' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: Course;
  createdAt: Date;
  isFeatured: boolean;
}

export interface FilterState {
  courses: string[];
  priceRange: {
    min: number;
    max: number;
  };
  featuredOnly: boolean;
}

export interface CourseStats {
  course: Course;
  count: number;
  averagePrice: number;
  totalPrice: number;
  mostExpensive: number;
  cheapest: number;
}

export interface MenuAnalysis {
  totalItems: number;
  totalValue: number;
  courseStats: CourseStats[];
  mostExpensiveItem: MenuItem | null;
  cheapestItem: MenuItem | null;
}

export type RootStackParamList = {
  Home: undefined;
  ManageMenu: undefined;
  Filter: {
    filters: FilterState;
    onApplyFilters: (filters: FilterState) => void;
  };
};

// Global type for application constants
export interface AppConstants {
  MAX_PRICE: number;
  MIN_PRICE: number;
  MAX_NAME_LENGTH: number;
  MAX_DESCRIPTION_LENGTH: number;
  COURSES: Course[];
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}