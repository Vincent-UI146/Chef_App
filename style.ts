import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2c3e50',
  secondary: '#3498db',
  success: '#27ae60',
  danger: '#e74c3c',
  warning: '#f39c12',
  light: '#ecf0f1',
  dark: '#2c3e50',
  white: '#ffffff',
  background: '#f8f9fa'
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
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10
  },
  headerTitle: {
    ...typography.heading,
    color: colors.primary
  },
  filterButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  filterButtonText: {
    color: colors.white,
    fontWeight: '600'
  },
  statsContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statsText: {
    ...typography.body,
    marginBottom: 4
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20
  },
  sectionTitle: {
    ...typography.subheading,
    color: colors.primary
  },
  menuItemCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  menuItemName: {
    ...typography.subheading,
    flex: 1,
    marginRight: 10
  },
  menuItemPrice: {
    ...typography.price
  },
  menuItemDescription: {
    ...typography.caption,
    color: '#666',
    lineHeight: 20
  },
  addButton: {
    backgroundColor: colors.success,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  addButtonText: {
    ...typography.subheading,
    fontWeight: '600',
    color: colors.white 
  },
  formContainer: {
    flex: 1,
    padding: 16
  },
  inputGroup: {
    marginBottom: 20
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
    textAlignVertical: 'top'
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: colors.white
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5
  },
  saveButton: {
    backgroundColor: colors.success
  },
  cancelButton: {
    backgroundColor: colors.danger
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16
  },
  courseTag: {
    backgroundColor: colors.light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8
  },
  courseTagText: {
    fontSize: 12,
    color: colors.dark,
    fontWeight: '500'
  },
  body: {
    ...typography.body 
  }
});
