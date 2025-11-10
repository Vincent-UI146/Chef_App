import { MenuItem, AppConstants } from './types';


export const APP_CONSTANTS: AppConstants = {
  MAX_PRICE: 1000,
  MIN_PRICE: 0,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 200,
  COURSES: ['Starters', 'Main Courses', 'Desserts', 'Drinks']
};


export let globalMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Mediterranean Salad',
    description: 'Fresh greens with olives, feta cheese, and olive oil dressing',
    price: 12,
    course: 'Starters',
    createdAt: new Date('2024-01-15'),
    isFeatured: true
  },
  {
    id: '2',
    name: 'Garlic Prawns',
    description: 'Tiger prawns cooked in garlic butter sauce',
    price: 16,
    course: 'Starters',
    createdAt: new Date('2024-01-20'),
    isFeatured: false
  },
  {
    id: '3',
    name: 'Filet Mignon',
    description: 'Premium beef tenderloin with red wine reduction',
    price: 32,
    course: 'Main Courses',
    createdAt: new Date('2024-01-10'),
    isFeatured: true
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon butter and seasonal vegetables',
    price: 26,
    course: 'Main Courses',
    createdAt: new Date('2024-01-18'),
    isFeatured: false
  },
  {
    id: '5',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 8,
    course: 'Desserts',
    createdAt: new Date('2024-01-22'),
    isFeatured: true
  },
  {
    id: '6',
    name: 'House Wine',
    description: 'Glass of premium house red or white wine',
    price: 6,
    course: 'Drinks',
    createdAt: new Date('2024-01-25'),
    isFeatured: false
  }
];

export const courses = [
  { label: 'Starters', value: 'Starters' },
  { label: 'Main Courses', value: 'Main Courses' },
  { label: 'Desserts', value: 'Desserts' },
  { label: 'Drinks', value: 'Drinks' }
];