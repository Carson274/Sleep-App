import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import RemoveFriendComponent from '../components/RemoveFriendComponent';
import { useFocusEffect } from '@react-navigation/native';

const FriendsListComponent = ({ route }) => {
    const { username } = route.params;

    const [resultsFound, setResultsFound] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // call the backend to get the user's sleep data
    const getUserFriends = useCallback(async () => {
        const response = await fetch(`http://localhost:8080/getUserFriends?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setFriendsList(data);

        if (data.length >= 1) {
            setResultsFound(true);
        }
        
        // console.log(`${username}'s friends: ` + friendsList);
    }, [username]);

    useEffect(() => {
        getUserFriends();
    }, [username, refresh]);

    useFocusEffect(
        useCallback(() => {
            getUserFriends();
        }, [getUserFriends])
    );

    return (
        <View style={styles.view}>
            {resultsFound ?
                <ScrollView style={styles.scrollView}>
                    {friendsList.map((friend, index) => (
                        <View key={index} style={styles.userContainer}>
                            <Text style={styles.text}>{friend || 'Unnamed'}</Text>
                            <RemoveFriendComponent setRefresh={setRefresh} username={username} friendUsername={friend}/>
                        </View>
                    ))}
                </ScrollView>
            : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.text}>You have no friends :(</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#131313',
    },
    text: {

        color: 'white',
        fontSize: 24,
    },
    scrollView: {
        width: '85%',
    },
    userContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#959595',
        borderBottomWidth: 2,
        height: 60,
    },
});

export default FriendsListComponent;