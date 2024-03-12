import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const FriendsPendingComponent = ({ route }) => {
    const { username } = route.params;

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Pending Requests</Text>
            <Button title="Add Friends" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#131313',
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
});

export default FriendsPendingComponent;