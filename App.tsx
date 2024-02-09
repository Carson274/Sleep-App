import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, useWindowDimensions } from 'react-native';
import ProfileScreen from './screens/ProfileScreen'
import CheckInScreen from './screens/CheckInScreen'
import OverviewScreen from './screens/OverviewScreen'
import AnalyzeScreen from './screens/AnalyzeScreen'
import CustomTabBar from './components/CustomTabBar'
import { TabView, SceneMap } from 'react-native-tab-view';
import ProfileIcon from './components/ProfileIcon';
import CheckInIcon from './components/CheckInIcon';
import OverviewIcon from './components/OverviewIcon';
import AnalyzeIcon from './components/AnalyzeIcon';

const FirstRoute = () => (
  <ProfileScreen />
);

const SecondRoute = () => (
  <CheckInScreen />
);

const ThirdRoute = () => (
  <OverviewScreen />
);

const FourthRoute = () => (
  <AnalyzeScreen />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const App = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Profile', icon: ProfileIcon },
    { key: 'second', title: 'Check In', icon: CheckInIcon },
    { key: 'third', title: 'Overview', icon: OverviewIcon },
    { key: 'fourth', title: 'Analyze', icon: AnalyzeIcon },
  ]);
  

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => <CustomTabBar {...props} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
      flex: 1,
  },
});

export default App;