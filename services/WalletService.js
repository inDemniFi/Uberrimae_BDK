// WalletService.js
import { DescriptorSecretKey, Mnemonic, Blockchain, Wallet, DatabaseConfig, Descriptor } from 'bdk-rn';
import { Network, KeyChainKind, WordCount } from 'bdk-rn/lib/lib/enums';

export const createWallet = async () => {
  try {
    // Create a Mnemonic
    const mnemonic = await new Mnemonic().create(WordCount.WORDS12);

    // Create a DescriptorSecretKey
    const descriptorSecretKey = await new DescriptorSecretKey().create(Network.Regtest, mnemonic);

    // Get the public key from DescriptorSecretKey
    const descriptorPublicKey = await descriptorSecretKey.asPublic();

    // Fingerprint is a placeholder; you may need to replace it
    const fingerprint = 'd1d04177';

    // Create an external public descriptor
    const externalPublicDescriptor = await new Descriptor().newBip44Public(
      descriptorPublicKey,
      fingerprint,
      KeyChainKind.External,
      Network.Regtest
    );

    // Set up the Blockchain configuration for regtest
    const blockchainConfig = {
      url: 'http://127.0.0.1:18443', // Update this with your Bitcoin Core regtest RPC address
      rpcuser: 'admin',
      rpcpassword: 'password',
    };

    // Create a Blockchain instance
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
