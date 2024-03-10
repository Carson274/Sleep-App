import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import AddIcon from '../assets/icons/AddIcon.svg';
import CheckInComponent from '../components/CheckInComponent';
import { BlurView } from 'expo-blur';

const CheckInScreen = ({ username }) => {
    const [visible, setVisible] = React.useState(false);
  
    const showModal = () => {
        setVisible(true);
        console.log(username);
    }
    const hideModal = () => setVisible(false);
  
    return (
        <View style={styles.container}>
            <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <BlurView
                intensity={50}
                style={StyleSheet.absoluteFill}
                tint="dark"
            >
                <CheckInComponent username={username} hideModal={hideModal}/>
            </BlurView>
            </Modal>
            </Portal>
            <Text style={styles.text}>Check In</Text>
            <Button style={{marginTop: 30}} onPress={showModal}>
                <AddIcon height={60} width={60} />
            </Button>
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 36,
        color: 'white',
    },
    modal: {
        backgroundColor: 'transparent',
        height: '100%',
    },
});
  
export default CheckInScreen;