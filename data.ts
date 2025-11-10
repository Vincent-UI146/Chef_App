import { MenuItem } from './types';

export const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Mediterranean Salad',
    description: 'Fresh greens with olives, feta cheese, and olive oil dressing',
    price: 80,
    course: 'Starters'
  },
  {
    id: '2',
    name: 'Garlic Prawns',
    description: 'Tiger prawns cooked in garlic butter sauce',
    price: 110,
    course: 'Starters'
  },
  {
    id: '3',
    name: 'Filet Mignon',
    description: 'Premium beef tenderloin with red wine reduction',
    price: 325,
    course: 'Main Courses'
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon butter and seasonal vegetables',
    price: 265,
    course: 'Main Courses'
  },
  {
    id: '5',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 50,
    course: 'Desserts'
  },
  {
    id: '6',
    name: 'House Wine',
    description: 'Glass of premium house red or white wine',
    price: 75,
    course: 'Drinks'
  }
];

export const courses = [
  { label: 'Starters', value: 'Starters' },
  { label: 'Main Courses', value: 'Main Courses' },
  { label: 'Desserts', value: 'Desserts' },
  { label: 'Drinks', value: 'Drinks' }
];