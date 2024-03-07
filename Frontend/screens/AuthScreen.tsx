import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SignUpComponent from '../components/SignUpComponent';
import LoginComponent from '../components/LoginComponent';
import Logo from '../assets/sleep_svg.svg';
import { Button } from 'react-native-paper';

const AuthScreen = () => {
  const [loginOption, setLoginOption] = React.useState("");

  function toggleScreen(option) {
    setLoginOption(option);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {loginOption === 'signup' ? (
        <SignUpComponent toggleScreen={() => toggleScreen('login')}/>
      ) : loginOption === 'login' ? (
        <LoginComponent toggleScreen={() => toggleScreen('signup')}/>
      ) : (
        <>
          <View style={styles.logoContainer}>
            <Logo width={120} height={120} />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.text}>Welcome to Slumped Stats</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Button style={styles.button} mode="contained" contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel} onPress={() => toggleScreen('login')}>
              Login
            </Button>
            <Button style={styles.button} mode="contained" contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel} onPress={() => toggleScreen('signup')}>
              Sign Up
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );  
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 8,
    width: '80%',
    backgroundColor: '#206BB6',
    borderRadius: 10,
    height: 60,
  },
  buttonContent: {
    height: 60,
  },
  buttonLabel: {
    fontSize: 20,
    color: '#131313',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
  },
  messageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
});

export default AuthScreen;