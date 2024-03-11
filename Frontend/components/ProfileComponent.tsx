import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileIconDark from '../assets/icons/ProfileIconDark.svg';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const ProfileComponent = ({ signOut }) => {
  // create a modal that can prompt the user to sign out
  const [visible, setVisible] = React.useState(false);
  
  const hideModal = () => {
    setVisible(false);
  }

  const showSignOut = () => {
    setVisible(true);
  }

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Button style={styles.button} onPress={signOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Button>
        </Modal>
      </Portal>
      <ProfileIconDark onPress={showSignOut}/>
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
      color: 'white',
  },
  modal: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'transparent',
  },
  button: {
      backgroundColor: '#2C2D57',
      padding: 10,
      borderRadius: 10,
  },
});

export default ProfileComponent;