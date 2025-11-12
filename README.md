# Chef-App

A professional React Native mobile application designed for chefs to efficiently manage their restaurant menus. Built with TypeScript and React Navigation, this app provides an intuitive interface for creating, editing, and organizing menu items.

##  App Overview

The Chef-App is a cross-platform solution that helps culinary professionals:
- Create and manage menu items with detailed information
- Organize dishes by course categories
- Quickly update menu offerings
- Filter and view specific menu sections
- Maintain an organized digital menu system

##  Features

### Core Functionality
- **Add New Menu Items** - Complete form with dish name, description, price, and course selection
- **Edit Existing Items** - Modify any menu item with intuitive editing interface
- **Delete Items** - Remove menu items with confirmation dialog
- **Course Organization** - Automatic categorization by Starters, Main Courses, Desserts, and Drinks
- **Real-time Statistics** - Display total items and average pricing
- **Advanced Filtering** - Filter menu by course type and price range

### User Experience
- **Modal Navigation** - Smooth, native-feeling modals for forms and filters
- **Form Validation** - Comprehensive input validation with user-friendly error messages
- **Professional Design** - Clean, culinary-focused interface suitable for kitchen use
- **Touch-Optimized** - Large touch targets for easy use in busy kitchen environments
- **Keyboard Handling** - Proper keyboard avoidance for seamless form completion

##  Technical Architecture

### Single-Screen Design
The app utilizes a sophisticated single-screen architecture with modal components:

- **HomeScreen** - Main dashboard displaying all menu items organized by course
- **AddEditForm Modal** - Comprehensive form for creating and editing menu items
- **FilterModal** - Advanced filtering interface for course and price range selection

### Technology Stack
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe development with excellent IDE support
- **React Navigation** - Professional navigation and screen management
- **React Native Picker** - Native course selection component
- **React Native Slider** - Price range filtering control
- **Modal Components** - Native modal presentations for forms

## Screen Descriptions

###  Home Screen
The central hub of the application featuring:
- **Header Bar** - App title with filter access button
- **Statistics Panel** - Real-time metrics showing total items and average price
- **Course Sections** - Organized display of menu items by category
- **Add Button** - Prominent call-to-action for creating new menu items
- **Interactive Cards** - Tappable menu items for quick editing

Each course section displays:
- Section header with item count
- Individual menu item cards showing:
  - Dish name and price
  - Detailed description
  - Course category badge
  - Edit-on-tap functionality

###  Add/Edit Form Modal
A comprehensive form interface that appears as a modal sheet:

**Form Fields:**
- **Dish Name** - Required text input with validation
- **Description** - Multi-line text area for detailed dish information
- **Price** - Numeric input with decimal support and validation
- **Course Selection** - Native picker with predefined categories

**Form Actions:**
- **Save/Update** - Primary action with validation
- **Delete** - Available in edit mode with confirmation
- **Cancel** - Safe exit with unsaved changes protection

**Features:**
- Auto-focus on first field for new items
- Keyboard-avoiding behavior
- Comprehensive input validation
- Professional styling matching main theme

###  Filter Modal
Advanced filtering interface for menu management:

**Filter Options:**
- **Course Filtering** - Toggle switches for each course category
- **Price Range** - Slider control for minimum and maximum price filtering
- **Reset Functionality** - Quick reset to default filter settings

**User Experience:**
- Real-time filter preview
- Intuitive toggle controls
- Visual feedback for active filters
- Smooth modal presentation

##  Design Philosophy

### Culinary-Focused Interface
- **Professional Color Scheme** - Chef whites with culinary accent colors
- **Clear Typography** - Readable fonts suitable for kitchen environments
- **Intuitive Layout** - Logical information hierarchy for quick scanning
- **Visual Consistency** - Unified design language across all components

### Kitchen-optimized UX
- **Large Touch Targets** - Easy interaction during busy service
- **Quick Actions** - Minimal taps required for common tasks
- **Clear Feedback** - Immediate confirmation of user actions
- **Error Prevention** - Validation and confirmation dialogs



# Chef's Menu App  - Final PoE Submission

A professional React Native mobile application for chefs to manage restaurant menus, now with enhanced features and improved architecture.

##  Change Log

###  New Features Implemented

#### 1. Average Price by Course Statistics
- **Feature**: Home screen now displays average prices broken down by course categories
- **Implementation**: 
  - Added `CourseStats` interface in types
  - Created `getCourseStats()` method in custom hook
  - Built `StatsCard` component to display statistics
  - Shows item count and average price for each course

#### 2. Separate Manage Menu Screen
- **Feature**: Moved menu management to dedicated screen
- **Implementation**:
  - Created `ManageMenuScreen` with full CRUD operations
  - Added "Manage" button on home screen for navigation
  - Implemented delete functionality with confirmation dialogs
  - Maintained add item functionality in modal on manage screen

#### 3. Enhanced Filtering System
- **Feature**: Complete course-based filtering with price range
- **Implementation**:
  - Updated `FilterScreen` with course toggles and price slider
  - Added filter state management
  - Implemented filtered items display with clear filters option
  - Shows count of filtered vs total items

#### 4. Array-based Data Storage
- **Feature**: All menu items stored in managed array
- **Implementation**:
  - Custom `useMenu` hook for centralized state management
  - Complete CRUD operations (Create, Read, Update, Delete)
  - Proper array manipulation for all operations

###  Code Refactoring & Improvements

#### Architecture Improvements
- **Custom Hook**: Created `useMenu.ts` for centralized state management
- **Component Modularization**: Split into reusable components:
  - `MenuItemCard` - Display menu items
  - `StatsCard` - Show statistics
  - `CourseSection` - Organize by course
- **Type Safety**: Enhanced TypeScript interfaces and types

#### File Structure Optimization



#### State Management
- **Centralized Logic**: All menu operations in custom hook
- **Efficient Updates**: Proper state updates with useCallback
- **Filter Management**: Separate filter state with persistence

#### UI/UX Improvements
- **Professional Design**: Enhanced color scheme and typography
- **Better Navigation**: Clear screen hierarchy and transitions
- **User Feedback**: Improved alerts and confirmation dialogs
- **Empty States**: Helpful messages when no data exists

###  Bug Fixes & Enhancements

#### Navigation
- Fixed modal presentation issues
- Improved back navigation behavior
- Added proper screen titles

#### Form Handling
- Enhanced input validation
- Better keyboard avoidance
- Improved error messaging

#### Performance
- Optimized re-renders with proper hooks
- Efficient list rendering
- Better state management

###  Technical Debt Addressed

1. **Single Responsibility**: Each component has clear, focused purpose
2. **Reusability**: Components can be used across multiple screens
3. **Maintainability**: Clear separation of concerns
4. **Scalability**: Easy to add new features and screens
5. **Type Safety**: Comprehensive TypeScript coverage

###  Features Demonstration

The app now includes:
-  Home screen with course statistics
-  Separate manage menu screen with full CRUD
-  Advanced filtering by course and price
-  Professional UI with consistent design
- Proper navigation between screens
- Comprehensive state management

##  App Screens

### Home Screen
- View complete menu organized by courses
- See statistics (total items, average prices by course)
- Access filter and manage functionality
- Clean, read-only display for customers

### Manage Menu Screen
- Add new menu items with full form validation
- Delete existing items with confirmation
- Organized by course categories
- Modal-based add form for better UX

### Filter Screen
- Filter by course categories (toggle switches)
- Filter by price range (slider control)
- Apply multiple filters simultaneously
- Reset to show all items

##  Technical Stack

- **React Native** with TypeScript
- **React Navigation** for screen management
- **Custom Hooks** for state management
- **Modular Components** for reusability
- **Professional Styling** with consistent design system

### Screenshots

<img width="395" height="854" alt="Screenshot 2025-11-10 143050" src="https://github.com/user-attachments/assets/e5135d4a-6355-43e7-a1a3-7b13b010a60f" />

<img width="392" height="852" alt="Screenshot 2025-11-10 143033" src="https://github.com/user-attachments/assets/e23acd8a-b736-45f9-b2c8-347312b40e1d" />

<img width="395" height="860" alt="Screenshot 2025-11-10 142947" src="https://github.com/user-attachments/assets/56f840e4-1af3-400c-9078-78c329b09f7e" />

<img width="395" height="853" alt="Screenshot 2025-11-10 143013" src="https://github.com/user-attachments/assets/1ad8e4fc-b3db-4a6a-996f-9d8f7036810c" />













