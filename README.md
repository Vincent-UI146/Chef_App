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



