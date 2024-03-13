import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CompeteScreen = ({ username, alreadyCheckedIn }) => {
    const [friendsList, setFriendsList] = useState([]);
    const [userStats, setUserStats] = useState({});
    const [firstHighestUserWithScoreToday, setFirstHighestUserWithScoreToday] = useState({});
    const [secondHighestUserWithScoreToday, setSecondHighestUserWithScoreToday] = useState({});
    const [thirdHighestUserWithScoreToday, setThirdHighestUserWithScoreToday] = useState({});
    const [firstHighestUserWithScoreWeek, setFirstHighestUserWithScoreWeek] = useState({});
    const [secondHighestUserWithScoreWeek, setSecondHighestUserWithScoreWeek] = useState({});
    const [thirdHighestUserWithScoreWeek, setThirdHighestUserWithScoreWeek] = useState({});

    const getUserFriends = useCallback(async () => {
        const response = await fetch(`http://localhost:8080/getUserFriends?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setFriendsList(data);

    }, [username]);

    // call the backend to get the user's sleep data
    const getUserStats = async (user) => {
        const response = await fetch(`http://localhost:8080/getSleepData?username=${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        // console.log(`${user}:`, data);
    
        const today = new Date().toISOString().split('T')[0];
        const todayData = data.find(day => new Date(day.Date).toISOString().split('T')[0] === today);
        return todayData ? todayData.HoursSlept : 0;
    };

    // call the backend to get the user's sleep data
    const getUserData = async () => {
        let allUserStats = {};
    
        // fetch the current user's stats
        const userResponse = await getUserStats(username);
        allUserStats[username] = userResponse;

        console.log(friendsList);

    
        // fetch each friend's stats
        for (const friend of friendsList) {
            console.log(friend);
            const friendResponse = await getUserStats(friend);
            allUserStats[friend] = friendResponse;
        }
    
        // include logic to find today's score for each user and sort
        const userScoresToday = Object.entries(allUserStats).map(([user, todayScore]) => ({
            user,
            todayScore
        }));
    
        // sort by today's score in descending order
        userScoresToday.sort((a, b) => b.todayScore - a.todayScore);
    
        // pick the top three
        const [first, second, third] = userScoresToday.slice(0, 3);
    
        // update state with the top three users and their scores
        setFirstHighestUserWithScoreToday(first);
        setSecondHighestUserWithScoreToday(second);
        setThirdHighestUserWithScoreToday(third);
    };

    // now that we have the sleep data for everyone, we can get the user's stats
    useEffect(() => {
        getUserFriends();
    }, [username]);

    useEffect(() => {
        if (friendsList.length > 0) {
            getUserData();
        }
    }, [friendsList]);

    // find the top three users and their scores for the week

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Leaderboard</Text>
            <View style={styles.container}>
                <Text style={styles.containerTitle}>Daily Average</Text>
                <View style={styles.userContainer}>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.userText}>1. {firstHighestUserWithScoreToday?.user}</Text>
                        <Text style={styles.scoreText}>{firstHighestUserWithScoreToday?.todayScore}</Text>
                    </View>
                    <View style={{...styles.scoreLength, width: `${(firstHighestUserWithScoreToday?.todayScore / 12) * 100}%`}}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#192f6a', '#3b5998', '#4c669f']}
                            style={styles.gradient}
                        />
                    </View>
                </View>
                <View style={styles.userContainer}>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.userText}>2. {secondHighestUserWithScoreToday?.user}</Text>
                        <Text style={styles.scoreText}>{secondHighestUserWithScoreToday?.todayScore}</Text>
                    </View>
                    <View style={{...styles.scoreLength, width: `${(secondHighestUserWithScoreToday?.todayScore / 12) * 100}%`}}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#192f6a', '#3b5998', '#4c669f']}
                            style={styles.gradient}
                        />
                    </View>
                </View>
                <View style={styles.userContainer}>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.userText}>3. {thirdHighestUserWithScoreToday?.user}</Text>
                        <Text style={styles.scoreText}>{thirdHighestUserWithScoreToday?.todayScore}</Text>
                    </View>
                    <View style={{...styles.scoreLength, width: `${(thirdHighestUserWithScoreToday?.todayScore / 12) * 100}%`}}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#192f6a', '#3b5998', '#4c669f']}
                            style={styles.gradient}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <Button title="Weekly" onPress={getUserFriends} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 30,
    },
    gradient: {
        flex: 1,
        borderRadius: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#1B1B1B',
        width: '85%',
        borderRadius: 20,
        marginTop: 30,
        padding: 20,
    },
    containerTitle: {
        color: 'white',
        fontSize: 28,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    text: {
        color: 'white',
        fontSize: 36,
    },
    scoreLength: {
        height: 2,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignSelf: 'flex-start',
        overflow: 'hidden',
        marginBottom: 10,
    },
    userContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userText: {
        color: 'white',
        fontSize: 20,
    },
    scoreText: {
        color: 'white',
        fontSize: 20,
    }
});

export default CompeteScreen;