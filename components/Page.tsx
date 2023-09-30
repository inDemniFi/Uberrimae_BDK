// Import necessary modules and components
import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, Image, Alert, ActivityIndicator, Button, TouchableOpacity, Clipboard} from 'react-native';
import {createWallet} from '../services/WalletService';
import AppButton from './buttons/AppButton';
import { Linking } from 'react-native';


// Import the styles
import {styles} from '../styles/styles';
import {Wallet} from 'bdk-rn';
import {AddressIndex} from 'bdk-rn/lib/lib/enums';

import {MMKV} from 'react-native-mmkv';

// Create an instance of MMKV for local storage
export const storage = new MMKV();

const Page = () => {
  const [wallet, setWallet] = useState<Wallet>();
  const [mnemonic, setMnemonic] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [seedPhraseVerified, setSeedPhraseVerified] = useState(false);

  // Function to handle the creation of a wallet
  const handleCreateWallet = async (mnemonicString = '') => {
    try {
      setLoading(true);
      const {wallet, mnemonic} = await createWallet(mnemonicString);
      setWallet(wallet);
      setMnemonic(mnemonic);

      // Store the mnemonic in local storage
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

  // Function to handle seed phrase verification
  const handleVerifySeedPhrase = () => {
    const storedMnemonic = storage.getString('mnemonic');
    if (storedMnemonic === mnemonic) {
      Alert.alert('Seed Phrase Verified', 'Your seed phrase has been successfully verified.');
      setSeedPhraseVerified(true);
    } else {
      Alert.alert('Seed Phrase Verification Failed', 'The entered seed phrase does not match.');
    }
  };

  // Function to handle copying the wallet address to the clipboard
  const handleCopyAddress = () => {
    Clipboard.setString(address || '');
    Alert.alert('Address Copied', 'Wallet address copied to clipboard.');
  };

  // Use effect to load existing wallet if available
  useEffect(() => {
    (async () => {
      const existingMnemonic = storage.getString('mnemonic');
      if (existingMnemonic) await handleCreateWallet(existingMnemonic);
    })();
  }, []);

  return (
    <View >
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
        <View style={[styles.middleSection, { marginTop: 20, marginBottom: 10 }]}>
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
          {/* Show only if seed phrase is not verified */}
          {!seedPhraseVerified && (
            <Fragment>
              <Text>Wallet created successfully</Text>
              <Text style={{ marginTop: 10 }}>
                <Text style={styles.boldFont}>Address:</Text> {address}
              </Text>
              <Text style={{ marginTop: 10 }}>
                <Text style={styles.boldFont}>Mnemonic:</Text> {mnemonic}
              </Text>
            </Fragment>
          )}

          {/* Verify Seed Phrase Button */}
          {!seedPhraseVerified && (
            <View style={{ marginTop: 20 }}>
              <Button
                title="Verify Seed Phrase"
                onPress={handleVerifySeedPhrase}
              />
            </View>
          )}

          {/* Copy Address Button and Additional Sections */}
          {seedPhraseVerified && (
            <Fragment>
              {/* Copy Address Button */}
              <TouchableOpacity onPress={handleCopyAddress} style={{ marginTop: 60, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'blue' }}>Copy Hidden Wallet Address</Text>
              </TouchableOpacity>


              <View style={styles.balanceBox}>
                <Text style={styles.balanceText}>
                  <Text style={styles.boldFont}>Balance:</Text> 10 Bitcoin{/* Fetch and display balance */}
                </Text>
              </View>


              <View style={{ marginTop: 40 }}>
                <Button
                  title="Send or Swap"
                  onPress={() => {
                    // Add logic to handle transaction or swap
                    // Open a website link when the button is pressed
                    Linking.openURL('https://InsuringBitcoin.vercel.app/');
                  }}
                />
              </View>

              <View style={{ marginTop: 40 }}>
                <Button
                  title="Risk Dashboard"
                  onPress={() => {
                    // Add logic to navigate to the risk dashboard
                    // Open a website link when the button is pressed
                    Linking.openURL('https://BitcoinRisk.vercel.app/');
                  }}
                />
              </View>

              <View style={{ marginTop: 40 }}>
                <Button
                  title="Buy Insurance"
                  onPress={() => {
                    // Add logic to navigate to the insurance website
                    // Open a website link when the button is pressed
                    Linking.openURL('https://InsuringBitcoin.vercel.app/');
                  }}
                />
              </View>
            </Fragment>
          )}
        </View>
      )}

      {/* Bottom Section */}
      <View style={[styles.bottomSection, { marginTop: 35, marginBottom: 1 }]}>
        <Text style={styles.bottomText}>
          Your wallet, your coins {'\n'} 100% open-source & open-design
        </Text>
      </View>
    </View>
  );
};

export default Page;