// WalletService.js
import {
  DescriptorSecretKey,
  Mnemonic,
  Blockchain,
  Wallet,
  DatabaseConfig,
  Descriptor,
} from 'bdk-rn';
import {
  WordCount,
  Network,
  KeychainKind,
  BlockchainElectrumConfig,
} from 'bdk-rn/lib/lib/enums';

export const createWallet = async (mnemonicString = '') => {
  try {
    let mnemonic;
    // Check if mnenomic is already exist, use that
    if (mnemonicString != '') {
      mnemonic = await new Mnemonic().fromString(mnemonicString);
    } else {
      // Create a Mnemonic
      mnemonic = await new Mnemonic().create(WordCount.WORDS12);
    }

    // Create a DescriptorSecretKey
    const descriptorSecretKey = await new DescriptorSecretKey().create(
      Network.Testnet,
      mnemonic,
    );

    // Create an external descriptor
    const externalDescriptor = await new Descriptor().newBip44(
      descriptorSecretKey,
      KeychainKind.External,
      Network.Regtest,
    );

    // Create an internal descriptor
    const internalDescriptor = await new Descriptor().newBip44(
      descriptorSecretKey,
      KeychainKind.Internal,
      Network.Regtest,
    );

    // Set up the Blockchain configuration for regtest
    const config: BlockchainElectrumConfig = {
      url: 'ssl://electrum.blockstream.info:60002',
      sock5: null,
      retry: 5,
      timeout: 5,
      stopGap: 500,
      validateDomain: false,
    };

    // Create a Blockchain instance
    const blockchain = await new Blockchain().create(config);

    // Create a wallet instance
    const dbConfig = await new DatabaseConfig().memory();
    const wallet = await new Wallet().create(
      externalDescriptor,
      internalDescriptor,
      Network.Testnet,
      dbConfig,
    );
    await wallet.sync(blockchain);

    return {mnemonic: mnemonic.asString(), wallet};
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};
