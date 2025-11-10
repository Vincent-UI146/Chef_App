export type Course = 'Starters' | 'Main Courses' | 'Desserts' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: Course;
}

export interface FilterState {
  courses: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface CourseStats {
  course: Course;
  count: number;
  averagePrice: number;
  totalItems: number;
}

export type RootStackParamList = {
  Home: undefined;
  ManageMenu: undefined;
  Filter: {
    filters: FilterState;
    onApplyFilters: (filters: FilterState) => void;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}