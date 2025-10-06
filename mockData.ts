import { MenuItem } from './Index';
import { MenuItemCard } from './MenuItemCard';

export const initialMenuItems: MenuItem [] = [
  {
    id: '1',
    name: 'Mediterranean Salad',
    description: 'Fresh greens with olives, feta cheese, and olive oil dressing',
    price: 12,
    course: 'Starters'
  },
  {
    id: '2',
    name: 'Garlic Prawns',
    description: 'Tiger prawns cooked in garlic butter sauce',
    price: 16,
    course: 'Starters'
  },
  {
    id: '3',
    name: 'Filet Mignon',
    description: 'Premium beef tenderloin with red wine reduction',
    price: 32,
    course: 'Main Courses'
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon butter and seasonal vegetables',
    price: 26,
    course: 'Main Courses'
  }
];

export const courses: { label: string; value: string }[] = [
  { label: 'Starters', value: 'Starters' },
  { label: 'Main Courses', value: 'Main Courses' },
  { label: 'Desserts', value: 'Desserts' },
  { label: 'Drinks', value: 'Drinks' }
];