import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const { width: screenWidth } = Dimensions.get('window')

const OverviewScreen = ({ username }) => {
    const [sleepData, setSleepData] = React.useState([]);
    const [labels, setLabels] = React.useState([]);

    // function to get the last 7 days of the week in form "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    const getLabelsForLast7Days = () => {
        const today = new Date();
        return [...Array(7)].map((_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            return d.toLocaleDateString('en-US', { weekday: 'short' });
        }).reverse();
    };

    // call the backend to get the user's sleep data
    const getUserStats = async () => {
        const response = await fetch(`http://localhost:8080/getSleepData?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        // set sleepData to be the last 7 days of data
        const lastData = data.slice(-7);
        setSleepData(lastData.map((data) => data.HoursSlept));

        // sets the labels to be the last 7 days
        setLabels(getLabelsForLast7Days());
        
        console.log(lastData);
    }

    // useEffect(() => {
    //     console.log(sleepData);
    // }, [sleepData]);

    // data for the bar chart
    const barData = {
        labels: labels,
        datasets: [
            {
                data: sleepData,
            },
        ],
    }

    const chartConfig = {
        backgroundGradientFrom: '#131313',
        backgroundGradientTo: '#131313',
        fillShadowGradient: '#206BB6',
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barPercentage: 1,
        decimanlPlaces: 0,
        barRadius: 16,

    }

    useEffect(() => {
        getUserStats();
    }, [username]);

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Overview</Text>
            <BarChart
                data={barData}
                width={screenWidth - 20}
                height={280}
                yAxisSuffix={' hrs'}
                chartConfig={chartConfig}
                style={styles.barChart}
                yAxisInterval={1}
                fromZero={true}
                showValuesOnTopOfBars={true}
            />
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
    },
    barChart: {
        padding: 40,
    }
});

export default OverviewScreen;