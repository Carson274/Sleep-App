import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const { width: screenWidth } = Dimensions.get('window')

const OverviewScreen = ({ username, alreadyCheckedIn }) => {
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
    
        // convert fetched data into a map with the date (YYYY-MM-DD) as the key
        const dataMap = data.reduce((acc, current) => {
            const dateKey = new Date(current.Date).toISOString().split('T')[0];
            acc[dateKey] = current.HoursSlept;
            return acc;
        }, {});
    
        // generate labels for the actual last 7 days
        const last7DaysLabels = getLabelsForLast7Days();
    
        // convert last 7 days to YYYY-MM-DD format to match keys in dataMap
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();
    
        // map each of the last 7 days to its sleep data, default to 0 if not present
        const sleepDataForLast7Days = last7Days.map(date => dataMap[date] || 0);
    
        setSleepData(sleepDataForLast7Days);
        setLabels(last7DaysLabels);
    }

    useEffect(() => {
        console.log('useEffect called in OverViewScreen');
        getUserStats();
    }, [alreadyCheckedIn]);

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
        fillShadowGradient: '#1D53A3',
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barPercentage: 0.9,
        decimalPlaces: 0,
        barRadius: 16,
        propsForBackgroundLines: {
            strokeWidth: 0.5,
        }
    }

    useEffect(() => {
        getUserStats();
    }, [username]);

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Overview</Text>
            <BarChart
                data={barData}
                width={screenWidth}
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
        marginRight: 20,
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