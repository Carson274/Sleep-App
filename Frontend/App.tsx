import React from 'react';
import { StyleSheet, SafeAreaView, useWindowDimensions, AppRegistry } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import { PaperProvider } from 'react-native-paper';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';
import * as SecureStore from 'expo-secure-store';

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

// this is the main app component
const App = () => {
  const layout = useWindowDimensions();
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isSignOut, setIsSignOut] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  // the routes for the tab view
  const [routes] = React.useState([
    { key: 'first', title: 'Profile', icon: ProfileIcon },
    { key: 'second', title: 'Check In', icon: CheckInIcon },
    { key: 'third', title: 'Overview', icon: OverviewIcon },
    { key: 'fourth', title: 'Analyze', icon: AnalyzeIcon },
  ]);
  
  // loading screen while we look for the user's token
  if (isSignedIn === null) {
    return (
      <LinearGradient
        colors={['#131313', '#131313', '#131313', '#131313', '#131313', '#131313', '#2C2D57']}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      >
        <SplashScreen />
      </LinearGradient>
    );
  }

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#131313', '#131313', '#131313', '#131313', '#131313', '#131313', '#2C2D57']}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      >
      {isSignedIn ?
          <SafeAreaView style={ styles.safeAreaView }>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => <CustomTabBar {...props} />}
              />
          </SafeAreaView>
      : <AuthScreen setIsSignedIn={setIsSignedIn}/>}
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
      flex: 1,
      backgroundColor: 'transparent',
  },
});

export default App;