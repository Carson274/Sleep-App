import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import AddFriendComponent from '../components/AddFriendComponent';

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
                <Button style={styles.button} mode="contained" onPress={searchForUsers}>Enter</Button>
            </View>
            <View>
                {resultsFound ?
                    <ScrollView style={styles.scrollView}>
                        {users.map((user, index) => (
                            <View key={index} style={styles.userContainer}>
                                <Text style={styles.text}>{user || 'Unnamed'}</Text>
                                <AddFriendComponent username={username} friendUsername={user}/>
                            </View>
                        ))}
                    </ScrollView>
                : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>No users found.</Text>
                    </View>
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

        height: 60,
    },
    searchContainer: {
        width: '90%',
        alignItems: 'center',
        top: 0,
        flexDirection: 'row',
        marginTop: 20,
    },
    searchBar: {
        flex: 2,
        backgroundColor: 'transparent',
        borderColor: '#959595',
        borderWidth: 2,
        color: 'white',
        borderRadius: 20,
        height: 40,
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
    button: {
        flex: 0.75,
        backgroundColor: '#206BB6',
        borderRadius: 20,
        height: 40,
        marginLeft: 10,
    },
});

export default FriendsAddComponent;