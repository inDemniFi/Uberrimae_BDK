// WalletService.js
import { DescriptorSecretKey, Mnemonic, Blockchain, Wallet, DatabaseConfig, Descriptor, KeyChainKind } from 'bdk-rn';
import { WordCount, Network } from 'bdk-rn/lib/lib/enums';

export const createWallet = async () => {
  try {
    // Create a Mnemonic
    const mnemonic = await new Mnemonic().create(WordCount.WORDS12);


    // Create a DescriptorSecretKey
    const descriptorSecretKey = await new DescriptorSecretKey().create(Network.Regtest, mnemonic);

    // Create an external descriptor
    const externalDescriptor = await new Descriptor().newBip44(
      descriptorSecretKey,
      KeyChainKind.External,
      Network.Regtest
    );

    // Create an internal descriptor
    const internalDescriptor = await new Descriptor().newBip44(
      descriptorSecretKey,
      KeyChainKind.Internal,
      Network.Regtest
    );

    // Set up the Blockchain configuration for regtest
    const blockchainConfig = {
      url: 'http://127.0.0.1:18445', 
      rpcuser: 'admin',
      rpcpassword: 'password',
    };

    // Create a Blockchain instance
    const blockchain = await new Blockchain().create(config);

    // Create a wallet instance
    const dbConfig = await new DatabaseConfig().memory();
    const wallet = await new Wallet().create(externalDescriptor, internalDescriptor, Network.Testnet, dbConfig);
    await wallet.sync(blockchain);

    console.log('Wallet created successfully:', wallet);
    return wallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};
