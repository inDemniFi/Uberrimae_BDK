import {StyleSheet, View} from 'react-native';
import React from 'react';
import Page from './components/Page';

export default function App() {
  return (
    <View style={styles.container}>
      <Page />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
