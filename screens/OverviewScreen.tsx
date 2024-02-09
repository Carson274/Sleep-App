import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';

const OverviewScreen = () => {
    return (
        <View style={styles.view}>
            <Text>Overview Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OverviewScreen;