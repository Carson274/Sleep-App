import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Logo from '../assets/sleep_svg.svg';
import * as SecureStore from 'expo-secure-store';

const LoginComponent = ({ username, setUsername, setIsSignedIn, toggleScreen }) => {
  const [password, setPassword] = React.useState("");

  const Authenticate = async () => {
    const response = await fetch(`http://localhost:8080/authenticate?username=${username}&password=${password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
    return response;
  }

  const Login = async () => {
    const authResponse = await Authenticate();
    if (authResponse.result === 1) {
      setIsSignedIn(true);
    } else {
      alert('Username or password is incorrect');
      setUsername("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={120} height={120} />
      </View>
      <View style={styles.upperContainer}>
        <Text style={styles.text}>Welcome Back!</Text>
        <Text style={styles.textSubheading}>Login to continue</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={ styles.textInput }
          label="Username"
          value={username}
          mode="outlined"
          onChangeText={text => setUsername(text)}
          outlineColor='white'
          activeOutlineColor='#206BB6'
          selectionColor='#206BB6'
          textColor='white'
          autoCapitalize="none"
        />
        <TextInput
          style={ styles.textInput }
          label="Password"
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          outlineColor='white'
          activeOutlineColor='#206BB6'
          selectionColor='#206BB6'
          textColor='white'
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Button 
          style={styles.button} 
          mode="contained" 
          contentStyle={styles.buttonContent} 
          labelStyle={styles.buttonLabel} 
          onPress={() => Login()}
        >
        LOGIN
        </Button>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 5}}>
            Don't have an account?
          </Text>
          <Text style={{color: '#206BB6', fontWeight: 'bold', marginLeft: 5}} onPress={toggleScreen}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 20,
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 60,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '80%',
    backgroundColor: '#131313',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSubheading: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    margin: 8,
    width: '80%',
    backgroundColor: '#206BB6',
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
  },
  buttonContent: {
    height: 60,
  },
  buttonLabel: {
    fontSize: 20,
    color: '#131313',
  },
});

export default LoginComponent;