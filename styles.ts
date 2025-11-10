import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2c3e50',
  secondary: '#3498db',
  success: '#27ae60',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#17a2b8',
  light: '#ecf0f1',
  dark: '#2c3e50',
  white: '#ffffff',
  background: '#f8f9fa',
  card: '#ffffff'
};

export const typography = {
  heading: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.dark
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.dark
  },
  body: {
    fontSize: 16,
    color: colors.dark
  },
  caption: {
    fontSize: 14,
    color: '#666'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: colors.success
  },
  stats: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.info
  }
};

export const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  headerTitle: {
    ...typography.heading,
    color: colors.primary
  },
  
  // Buttons
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  successButton: {
    backgroundColor: colors.success,
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 16,
  },
  
  // Cards
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  menuItemCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  // Forms
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.dark
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  
  // Menu Items
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuItemName: {
    ...typography.subheading,
    flex: 1,
    marginRight: 10,
  },
  menuItemPrice: {
    ...typography.price,
  },
  menuItemDescription: {
    ...typography.caption,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  
  // Course Tags
  courseTag: {
    backgroundColor: colors.light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  courseTagText: {
    fontSize: 12,
    color: colors.dark,
    fontWeight: '500',
  },
  
  // Sections
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  sectionTitle: {
    ...typography.subheading,
    color: colors.primary,
  },
  
  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  statsText: {
    ...typography.body,
  },
  statsValue: {
    ...typography.stats,
    fontWeight: '600',
  },
  
  // Filter
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  // Empty States
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    ...typography.body,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // Navigation
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabButtonActive: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});