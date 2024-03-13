import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const CheckInComponent = ({ username, hideModal, setAlreadyCheckedIn }) => {
  const [sleep, setSleep] = useState(0);

  const trackSleep = async () => {
    hideModal();
    setAlreadyCheckedIn(true);
    const date = new Date().toISOString().split('T')[0];
    // console.log(username, sleep, date);

    const response = await fetch(`http://localhost:8080/trackSleep?username=${username}&sleep=${sleep}&date=${date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        sleep: sleep,
        date: date,
      }),
    })
      // if there's an error, log it
      .catch(error => console.error('Error:', error))
      // if there's no error, log the response
      // .then(response => console.log('Success:', response))
  }

  return (
      <View style={styles.container}>
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>Enter the amout of sleep you got last night:</Text>
        </View>
        <Slider
          style={{width: '80%', height: 40}}
          minimumValue={0}
          maximumValue={12}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={value => setSleep(value)}
          step={0.5}
        />
        <Text style={styles.text}>{sleep}hrs</Text>
        <Button style={styles.button} mode="contained" contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel} mode="contained" onPress={trackSleep}>
          <Text style={{color: 'white'}}>Submit</Text>
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
  },
  topTextContainer: {
      marginBottom: 20,
      width: '80%',
  },
  topText: {
      color: 'white',
      fontSize: 24,
  },
  text: {
      fontSize: 36,
      color: 'white',
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
});

export default CheckInComponent;