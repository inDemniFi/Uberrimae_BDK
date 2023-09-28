import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import BitcoinWalletComponents from './components/BitcoinWalletComponents';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Uberrimae Fidei is Amazing</Text>
      <StatusBar style="auto" />
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
