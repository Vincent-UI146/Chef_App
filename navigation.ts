import { MenuItem } from "./Index";

export type RootStackParamList = {
  Home: undefined;
  AddEditItem: { 
    item?: MenuItem; 
    onSave?: (item: MenuItem) => void;
    onDelete?: (id: string) => void;
  };
  Filter: {
    filters: FilterState;
    onApplyFilters: (filters: FilterState) => void;
  };
};

export interface FilterState {
  courses: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

// Extend existing MenuItem interface if needed
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}