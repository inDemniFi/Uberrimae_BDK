// styles/styles.js

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 16,
  },
  bottomText: {
    textAlign: 'center',
  },
  balanceText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10, // Added marginBottom for spacing
  },
  boldFont: {
    fontWeight: 'bold',
  },
  spacing: {
    marginVertical: 30, // Adjust this value as needed
  },
  button: {
    marginTop: 20, // Adjust the value as needed
  },
  // Add this to styles.ts
  balanceBox: {
    marginTop: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: 'blue', // Border color
    borderRadius: 5, // Border radius for rounded corners
  },

  
});
