import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Logo from '../assets/sleep_svg.svg';

const SignUpComponent = ({ toggleScreen }) => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={120} height={120} />
      </View>
      <View style={styles.upperContainer}>
        <Text style={styles.text}>Create New Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={ styles.textInput }
          label="Username"
          value={userName}
          mode="outlined"
          onChangeText={text => setUserName(text)}
          outlineColor='white'
          activeOutlineColor='white'
        />
        <TextInput
          style={ styles.textInput }
          label="Password"
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          outlineColor='white'
          activeOutlineColor='white'
        />
        <Button 
          style={styles.button} 
          mode="contained" 
          contentStyle={styles.buttonContent} 
          labelStyle={styles.buttonLabel} 
          onPress={console.log('Create account')}
        >
        CREATE
        </Button>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 5}}>
            Already have an account?
          </Text>
          <Text style={{color: '#206BB6', fontWeight: 'bold', marginLeft: 5}} onPress={toggleScreen}>
            Login
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

export default SignUpComponent;