export type Course = 'Starters' | 'Main Courses' | 'Desserts' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: Course;
}

export interface AppState {
  menuItems: MenuItem[];
}

// Re-export navigation types
export * from './navigation';