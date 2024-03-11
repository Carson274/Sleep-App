import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';

const FriendsAddComponent = ({ route }) => {
    const { username } = route.params;

    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultsFound, setResultsFound] = useState(false);

    const searchForUsers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getUsers?username=${username}&searchQuery=${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setUsers(data);
            if (data.length >= 1) {
                setResultsFound(true);
            }
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }

    };

    const addFriend = async (username) => {
    };


    return (
        <View style={styles.view}>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor="#959595"
                    style={styles.searchBar}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <Button title="Search" onPress={searchForUsers} />
                {resultsFound ?
                    <ScrollView style={styles.scrollView}>
                        {users.map((user, index) => (
                            <View key={index} style={styles.userContainer}>
                                <Text style={styles.text}>{user || 'Unnamed'}</Text>
                                <Button title="Add" onPress={() => addFriend(user.name)} />
                            </View>
                        ))}
                    </ScrollView>
                : (
                    <Text style={styles.text}>No users found.</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#131313',
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
        marginTop: 20,
    },
    searchContainer: {
        width: '100%',
        alignItems: 'center',
        top: 0,
    },
    searchBar: {
        width: '90%',
        backgroundColor: 'transparent',
        borderColor: '#959595',
        borderWidth: 2,
        color: 'white',
        borderRadius: 20,
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
});

export default FriendsAddComponent;