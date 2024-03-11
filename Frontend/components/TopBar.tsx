import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Logo from '../assets/sleep_svg.svg';
import * as SecureStore from 'expo-secure-store';
import ProfileComponent from './ProfileComponent';
import ShareComponent from './ShareComponent';

const TopBar = ({ signOut }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
      <View style={styles.sideComponent}>
          <ShareComponent />
        </View>
        <View style={styles.logoContainer}>
          <Logo width={48} height={48} />
        </View>
        <View style={styles.sideComponent}>
          <ProfileComponent signOut={signOut}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  sideComponent: {
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 36,
  }
});

export default TopBar;