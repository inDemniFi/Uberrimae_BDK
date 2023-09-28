// WalletService.js
import { DescriptorSecretKey, Mnemonic, Blockchain, Wallet, DatabaseConfig, Descriptor } from 'bdk-rn';
import { Network, KeyChainKind } from 'bdk-rn/lib/lib/enums';

export const createWallet = async () => {
  try {
    // Create a Descriptor
    const mnemonic = await new Mnemonic().create(12); // Use the word count suitable for your case
    const descriptorSecretKey = await new DescriptorSecretKey().create(Network.Regtest, mnemonic);
    const descriptorPublicKey = await descriptorSecretKey.asPublic();
    const fingerprint = 'd1d04177';

    const externalPublicDescriptor = await new Descriptor().newBip44Public(
      descriptorPublicKey,
      fingerprint,
      KeyChainKind.External,
      Network.Regtest
    );

    // You might need to create a change descriptor in a similar manner if needed

    // Set up the Blockchain configuration for regtest
    const blockchainConfig = {
      url: 'http://127.0.0.1:9050', // Update this with your Bitcoin Core regtest RPC address
      rpcuser: 'admin',
      rpcpassword: 'password',
    };

    const blockchain = await new Blockchain().create(blockchainConfig);

    // Create a wallet instance
    const dbConfig = await new DatabaseConfig().memory();
    const wallet = await new Wallet().create(externalPublicDescriptor, null, Network.Regtest, dbConfig);

    // Sync the wallet with the blockchain
    await wallet.sync(blockchain);

    console.log('Wallet created successfully:', wallet);
    return wallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error; // Re-throw the error for further handling
  }
};
