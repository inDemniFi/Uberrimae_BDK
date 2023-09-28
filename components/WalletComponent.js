// WalletComponent.js
import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { createWallet } from '../services/WalletService';
import AppButton from './buttons/AppButton';

// Import the styles
import { styles } from '../styles/styles';

const WalletComponent = () => {
  const [wallet, setWallet] = useState(null);

  const handleCreateWallet = async () => {
    try {
      const newWallet = await createWallet(); // Use the imported function
      setWallet(newWallet);
      Alert.alert('Wallet Created', 'A new wallet has been created successfully.');
    } catch (error) {
      console.error('Error creating wallet:', error);
      Alert.alert('Error', 'There was an error creating the wallet. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Uberrimae Fidei</Text>
        <Text style={styles.subHeaderText}>
          Insuring Bitcoin with the {'\n'}<Text style={{ fontStyle: 'italic' }}>utmost good faith</Text>
        </Text>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <Text>Create an Uberrimae Fidei Bitcoin Wallet</Text>
        <AppButton title="Create Wallet" onPress={handleCreateWallet} />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>Your wallet, your coins {'\n'} 100% open-source & open-design</Text>
      </View>
    </View>
  );
};

export default WalletComponent;
