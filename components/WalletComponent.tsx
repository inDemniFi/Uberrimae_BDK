// WalletComponent.js
import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, Image, Alert, ActivityIndicator} from 'react-native';
import {createWallet} from '../services/WalletService';
import AppButton from './buttons/AppButton';

// Import the styles
import {styles} from '../styles/styles';
import {Wallet} from 'bdk-rn';
import {AddressIndex} from 'bdk-rn/lib/lib/enums';

import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const WalletComponent = () => {
  const [wallet, setWallet] = useState<Wallet>();
  const [mnemonic, setMnemonic] = useState<string>('');
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleCreateWallet = async (mnemonicString = '') => {
    try {
      setLoading(true);
      const {wallet, mnemonic} = await createWallet(mnemonicString); // Use the imported function
      setWallet(wallet);
      setMnemonic(mnemonic);

      // store mnemonic to local storage
      storage.set('mnemonic', mnemonic);
      const address = await wallet.getAddress(AddressIndex.New);
      const addressString = await address.address?.asString();
      setAddress(addressString);
      Alert.alert(
        `Wallet ${mnemonicString ? 'Loaded' : 'Created'} `,
        mnemonicString
          ? 'Existing wallet loaded successfully'
          : 'A new wallet has been created successfully.',
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error creating wallet:', error);
      Alert.alert(
        'Error',
        'There was an error creating the wallet. Please try again.',
      );
    }
  };

  useEffect(() => {
    (async () => {
      const existingMnemonic = storage.getString('mnemonic');
      if (existingMnemonic) await handleCreateWallet(existingMnemonic);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Uberrimae Fidei</Text>
        <Text style={styles.subHeaderText}>
          Insuring Bitcoin with the {'\n'}
          <Text style={{fontStyle: 'italic'}}>utmost good faith</Text>
        </Text>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>

      {/* Middle Section */}
      {!wallet?.id ? (
        <View style={styles.middleSection}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Fragment>
              <Text>Create an Uberrimae Fidei Bitcoin Wallet</Text>
              <AppButton
                title="Create Wallet"
                onPress={() => handleCreateWallet()}
              />
            </Fragment>
          )}
        </View>
      ) : (
        <View>
          <Text>Wallet created successfully</Text>
          <Text>
            <Text style={styles.boldFont}>Address:</Text> {address}
          </Text>
          <Text>
            <Text style={styles.boldFont}>Mnemonic:</Text> {mnemonic}
          </Text>
        </View>
      )}

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>
          Your wallet, your coins {'\n'} 100% open-source & open-design
        </Text>
      </View>
    </View>
  );
};

export default WalletComponent;
