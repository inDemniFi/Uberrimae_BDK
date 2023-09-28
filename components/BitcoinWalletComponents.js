// components/BitcoinWalletComponent.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
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

const BitcoinWalletComponent = () => {
  useEffect(() => {
    const createAndSyncWallet = async () => {
      try {
        const mnemonic = await new Mnemonic().create(WordCount.WORDS12);
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

        const wallet = await new Wallet().create(
          externalDescriptor,
          internalDescriptor,
          Network.Testnet,
          dbConfig
        );

        await wallet.sync(blockchain);

        // Additional logic or state updates can be added here
      } catch (error) {
        console.error('Error creating or syncing wallet:', error);
      }
    };

    // Call the function when the component mounts
    createAndSyncWallet();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <View>
      <Text>Bitcoin Wallet Component</Text>
      {/* Additional UI components or information can be added here */}
    </View>
  );
};

export default BitcoinWalletComponent;
