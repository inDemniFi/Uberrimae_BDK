// styles/styles.js

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
});
