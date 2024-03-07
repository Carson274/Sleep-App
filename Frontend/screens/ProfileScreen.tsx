import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>Profile Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 36,
    }
});

export default ProfileScreen;