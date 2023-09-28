// WalletComponent.js
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import WalletService from '../services/WalletService';
import AppButton from './buttons/AppButton';

const WalletComponent = () => {
  const [wallet, setWallet] = useState(null);

  const handleCreateWallet = async () => {
    try {
      const newWallet = await WalletService.createWallet();
      setWallet(newWallet);
      Alert.alert('Wallet Created', 'A new wallet has been created successfully.');
    } catch (error) {
      console.error('Error creating wallet:', error);
      Alert.alert('Error', 'There was an error creating the wallet. Please try again.');
    }
  };

  return (
    <View>
      <Text>Wallet Status: {wallet ? 'Created' : 'Not Created'}</Text>
      <AppButton title="Create Wallet" onPress={handleCreateWallet} />
    </View>
  );
};

export default WalletComponent;
