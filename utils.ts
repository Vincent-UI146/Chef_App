const APP_CONSTANTS = {
  COURSES: ['Starter', 'Main', 'Dessert', 'Drinks'] as string[],
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_PRICE: 9999.99
};

interface MenuAnalysis {
  totalItems: number;
  totalValue: number;
  courseStats: CourseStats[];
  mostExpensiveItem: MenuItem | null;
  cheapestItem: MenuItem | null;
}

// Local Course type because './types' does not export Course
type Course = string;

interface CourseStats {
  course: Course;
  count: number;
  averagePrice: number;
  totalPrice: number;
  mostExpensive: number;
  cheapest: number;
}

// Local MenuItem type because './types' does not export MenuItem
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: Course;
  isFeatured: boolean;
  createdAt: string | Date;
}

// Currency formatting utility
export const formatPrice = (price: number): string => {
  return `R${price.toFixed(2)}`;
};

/**
 * Calculate comprehensive menu statistics using different loop types
 */
export const analyzeMenu = (menuItems: MenuItem[]): MenuAnalysis => {
  if (menuItems.length === 0) {
    return {
      totalItems: 0,
      totalValue: 0,
      courseStats: [],
      mostExpensiveItem: null,
      cheapestItem: null
    };
  }

  let totalValue = 0;
  let mostExpensiveItem: MenuItem | null = null;
  let cheapestItem: MenuItem | null = null;

  // For loop for total value calculation
  for (let i = 0; i < menuItems.length; i++) {
    totalValue += menuItems[i].price;
  }

  // While loop to find most expensive and cheapest
  let index = 0;
  mostExpensiveItem = menuItems[0];
  cheapestItem = menuItems[0];
  
  while (index < menuItems.length) {
    if (menuItems[index].price > mostExpensiveItem.price) {
      mostExpensiveItem = menuItems[index];
    }
    if (menuItems[index].price < cheapestItem.price) {
      cheapestItem = menuItems[index];
    }
    index++;
  }

  // Calculate course statistics using for...in loop
  const courseStats = calculateCourseStats(menuItems);

  return {
    totalItems: menuItems.length,
    totalValue,
    courseStats,
    mostExpensiveItem,
    cheapestItem
  };
};

/**
 * Calculate statistics for each course using for...in loop
 */
const calculateCourseStats = (menuItems: MenuItem[]): CourseStats[] => {
  const courseData: { [key in Course]?: MenuItem[] } = {};

  // Group items by course using for...in loop
  for (const course of APP_CONSTANTS.COURSES) {
    courseData[course] = [];
  }

  // For loop for grouping
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    if (courseData[item.course]) {
      courseData[item.course]!.push(item);
    }
  }

  const stats: CourseStats[] = [];

  // For...in loop for object iteration
  for (const course in courseData) {
    const items = courseData[course as Course];
    if (items && items.length > 0) {
      const courseStat = calculateSingleCourseStats(course as Course, items);
      stats.push(courseStat);
    }
  }

  return stats;
};

/**
 * Calculate statistics for a single course
 */
const calculateSingleCourseStats = (course: Course, items: MenuItem[]): CourseStats => {
  let totalPrice = 0;
  let mostExpensive = items[0].price;
  let cheapest = items[0].price;

  // For loop for course calculations
  for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].price;
    
    if (items[i].price > mostExpensive) {
      mostExpensive = items[i].price;
    }
    
    if (items[i].price < cheapest) {
      cheapest = items[i].price;
    }
  }

  const averagePrice = parseFloat((totalPrice / items.length).toFixed(2));

  return {
    course,
    count: items.length,
    averagePrice,
    totalPrice,
    mostExpensive,
    cheapest
  };
};

/**
 * Filter menu items based on filter criteria
 */
export const filterMenuItems = (
  menuItems: MenuItem[], 
  filters: { courses: string[]; priceRange: { min: number; max: number }; featuredOnly: boolean }
): MenuItem[] => {
  const filteredItems: MenuItem[] = [];

  // For loop with conditional logic
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    let shouldInclude = true;

    // Course filter
    if (!filters.courses.includes(item.course)) {
      shouldInclude = false;
    }

    // Price range filter
    if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
      shouldInclude = false;
    }

    // Featured filter
    if (filters.featuredOnly && !item.isFeatured) {
      shouldInclude = false;
    }

    if (shouldInclude) {
      filteredItems.push(item);
    }
  }

  return filteredItems;
};

/**
 * Validate menu item using while loop for error collection
 */
export const validateMenuItem = (item: Omit<MenuItem, 'id' | 'createdAt' | 'isFeatured'>): string[] => {
  const errors: string[] = [];
  let errorCheckIndex = 0;
  const validations = [
    { check: !item.name.trim(), message: 'Dish name is required' },
    { check: item.name.length > APP_CONSTANTS.MAX_NAME_LENGTH, message: `Dish name too long (max ${APP_CONSTANTS.MAX_NAME_LENGTH} chars)` },
    { check: !item.description.trim(), message: 'Description is required' },
    { check: item.description.length > APP_CONSTANTS.MAX_DESCRIPTION_LENGTH, message: `Description too long (max ${APP_CONSTANTS.MAX_DESCRIPTION_LENGTH} chars)` },
    { check: isNaN(item.price) || item.price <= 0, message: 'Price must be a positive number' },
    { check: item.price > APP_CONSTANTS.MAX_PRICE, message: `Price cannot exceed ${formatPrice(APP_CONSTANTS.MAX_PRICE)}` }
  ];

  // While loop for validation checks
  while (errorCheckIndex < validations.length) {
    const validation = validations[errorCheckIndex];
    if (validation.check) {
      errors.push(validation.message);
    }
    errorCheckIndex++;
  }

  return errors;
};

/**
 * Generate menu report
 */
export const generateMenuReport = (menuItems: MenuItem[]): string => {
  if (menuItems.length === 0) {
    return "No menu items available.";
  }

  const analysis = analyzeMenu(menuItems);
  let report = `MENU REPORT\n`;
  report += `Total Items: ${analysis.totalItems}\n`;
  report += `Total Value: ${formatPrice(analysis.totalValue)}\n\n`;

  // For loop for course reports
  for (let i = 0; i < analysis.courseStats.length; i++) {
    const stat = analysis.courseStats[i];
    report += `${stat.course}:\n`;
    report += `  Items: ${stat.count}\n`;
    report += `  Average Price: ${formatPrice(stat.averagePrice)}\n`;
    report += `  Price Range: ${formatPrice(stat.cheapest)} - ${formatPrice(stat.mostExpensive)}\n\n`;
  }

  if (analysis.mostExpensiveItem) {
    report += `Most Expensive: ${analysis.mostExpensiveItem.name} - ${formatPrice(analysis.mostExpensiveItem.price)}\n`;
  }
  if (analysis.cheapestItem) {
    report += `Cheapest: ${analysis.cheapestItem.name} - ${formatPrice(analysis.cheapestItem.price)}\n`;
  }

  return report;
};

/**
 * Find items by course
 */
export const findItemsByCourse = (menuItems: MenuItem[], course: Course): MenuItem[] => {
  const items: MenuItem[] = [];

  // For loop for finding items
  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].course === course) {
      items.push(menuItems[i]);
    }
  }

  return items;
};

/**
 * Calculate total menu value using while loop
 */
export const calculateTotalValue = (menuItems: MenuItem[]): number => {
  let total = 0;
  let index = 0;
  
  while (index < menuItems.length) {
    total += menuItems[index].price;
    index++;
  }
  
  return total;
};