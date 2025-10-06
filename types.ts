import { Course } from './Index'; 
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  course: Course;
}
