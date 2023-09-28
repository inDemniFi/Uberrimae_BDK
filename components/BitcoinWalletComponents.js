// components/BitcoinWalletComponents.js
import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import {
  DescriptorSecretKey,
  Mnemonic,
  Blockchain,
  Wallet,
  DatabaseConfig,
  Descriptor,
  WordCount,
  Network,
  KeyChainKind,
} from 'bdk-rn';

const BitcoinWalletComponents = () => {
  const [seedPhrase, setSeedPhrase] = useState('');

  const handleCreateWallet = async () => {
    try {
      // Create a Wallet
      const mnemonic = await new Mnemonic().create(WordCount.WORDS12);
      setSeedPhrase(mnemonic);

      const descriptorSecretKey = await new DescriptorSecretKey().create(Network.Testnet, mnemonic);
      const externalDescriptor = await new Descriptor().newBip44(
        descriptorSecretKey,
        KeyChainKind.External,
        Network.Testnet
      );
      const internalDescriptor = await new Descriptor().newBip44(
        descriptorSecretKey,
        KeyChainKind.Internal,
        Network.Testnet
      );

      const config = {
        url: 'ssl://electrum.blockstream.info:60002',
        sock5: null,
        retry: 5,
        timeout: 5,
        stopGap: 100,
        validateDomain: false,
      };

      const blockchain = await new Blockchain().create(config);
      const dbConfig = await new DatabaseConfig().memory();

      const wallet = await new Wallet().create(externalDescriptor, internalDescriptor, Network.Testnet, dbConfig);

      await wallet.sync(blockchain);

      // Additional logic or state updates can be added here
      console.log('Wallet created and synced successfully:', wallet);
    } catch (error) {
      console.error('Error creating or syncing wallet:', error);
      Alert.alert('Error', 'There was an error creating the wallet. Please try again.');
    }
  };

  return (
    <View>
      <Text>Create an Uberrimae Fidei Wallet</Text>
      <Button title="Create a Wallet" onPress={handleCreateWallet} />
      {seedPhrase && (
        <View>
          <Text>Seed Phrase:</Text>
          <Text>{seedPhrase}</Text>
        </View>
      )}
      {/* Additional UI components or information can be added here */}
    </View>
  );
};

export default BitcoinWalletComponents;
