import {StyleSheet, View} from 'react-native';
import React from 'react';
import WalletComponent from './components/WalletComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <WalletComponent />
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
