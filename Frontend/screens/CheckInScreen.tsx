import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import AddIcon from '../assets/icons/AddIcon.svg';
import CheckInComponent from '../components/CheckInComponent';
import { BlurView } from 'expo-blur';

const CheckInScreen = ({ username, setAlreadyCheckedIn, alreadyCheckedIn }) => {
    const [visible, setVisible] = React.useState(false);

    const sizeAnim = React.useRef(new Animated.Value(60)).current;
    const opacityAnim = React.useRef(new Animated.Value(1)).current;

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

    useEffect(() => {
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(sizeAnim, {
                    toValue: 500,
                    duration: 1300,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                })
            ]).start();
        }, 150);
    }, []);
    
  
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
                    <Text style={styles.modifiedText}>Check In</Text>
                    <View style={styles.animationContainer}>
                    <Animated.View style={[styles.expandingCircle, { height: sizeAnim, width: sizeAnim, borderRadius: sizeAnim, opacity: opacityAnim }]}></Animated.View>
                        <Button onPress={showModal} style={styles.buttonStyle} >
                            <View style={styles.iconContainer}>
                                <AddIcon height={60} width={60} />
                            </View>
                        </Button>
                    </View>
                </>
            )}
        </View>
    );
  };

const styles = StyleSheet.create({
    animationContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300,
        backgroundColor: 'transparent',
    },
    expandingCircle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        backgroundColor: '#D9D9D9',
        zIndex: 1,
    },
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
    modifiedText: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        marginTop: 80,
        marginBottom: -80,
    },
    modal: {
        backgroundColor: 'transparent',
        height: '100%',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    
});
  
export default CheckInScreen;