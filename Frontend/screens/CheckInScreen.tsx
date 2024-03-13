import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import AddIcon from '../assets/icons/AddIcon.svg';
import CheckInComponent from '../components/CheckInComponent';
import { BlurView } from 'expo-blur';

const CheckInScreen = ({ username, setAlreadyCheckedIn, alreadyCheckedIn }) => {
    const [visible, setVisible] = React.useState(false);

    const checkIfAlreadyCheckedIn = async () => {
        const date = new Date().toISOString().split('T')[0];
        const response = await fetch(`http://localhost:8080/checkIfCheckedIn?username=${username}&date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        
        return response;
    }

    const checkIfAdded = async () => {
        const response = await checkIfAlreadyCheckedIn()
        // console.log('we got to the if statement')
        // console.log('response.result: ', response.result)
        // console.log('alreadyCheckedIn: ', alreadyCheckedIn)
        if(response.result === 1) {
            setAlreadyCheckedIn(true);
        }
        else {
            setAlreadyCheckedIn(false);
        }
        // console.log('alreadyCheckedIn: ', alreadyCheckedIn)
    }

    useEffect(() => {
        // console.log('Checking if already checked in -- CheckInScreen')
        checkIfAdded();
    }, [alreadyCheckedIn]);

    const showModal = () => {
        setVisible(true);
        // console.log(username);
    }
    const hideModal = () => setVisible(false);
  
    return (
        <View style={styles.container}>
            {alreadyCheckedIn ? (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>You've already checked in today!</Text>
                </View>
            ) : (
                <>
                    <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <BlurView
                        intensity={50}
                        style={StyleSheet.absoluteFill}
                        tint="dark"
                    >
                        <CheckInComponent username={username} hideModal={hideModal} setAlreadyCheckedIn={setAlreadyCheckedIn} />
                    </BlurView>
                    </Modal>
                    </Portal>
                    <Text style={styles.text}>Check In</Text>
                    <Button style={{marginTop: 30}} onPress={showModal}>
                        <AddIcon height={60} width={60} />
                    </Button>
                </>
            )}
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    modal: {
        backgroundColor: 'transparent',
        height: '100%',
    },
});
  
export default CheckInScreen;