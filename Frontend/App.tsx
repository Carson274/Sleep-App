import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, useWindowDimensions, AppRegistry } from 'react-native';
import FriendsScreen from './screens/FriendsScreen'
import CheckInScreen from './screens/CheckInScreen'
import OverviewScreen from './screens/OverviewScreen'
import CompeteScreen from './screens/CompeteScreen'
import CustomTabBar from './components/CustomTabBar'
import { TabView, SceneMap } from 'react-native-tab-view';
import FriendsIcon from './components/FriendsIcon';
import CheckInIcon from './components/CheckInIcon';
import OverviewIcon from './components/OverviewIcon';
import AnalyzeIcon from './components/AnalyzeIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { PaperProvider } from 'react-native-paper';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';
import TopBar from './components/TopBar';

// this is the main app component
const App = () => {
  const layout = useWindowDimensions();
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isSignOut, setIsSignOut] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = React.useState(false);

  // set the default page to be the check in screen
  const [index, setIndex] = React.useState(1);

  useEffect(() => {
    setIndex(1);
  }, [isSignOut]);

  // the routes for the tab view
  const [routes] = React.useState([
    { key: 'first', title: 'Friends', icon: FriendsIcon },
    { key: 'second', title: 'Check In', icon: CheckInIcon, },
    { key: 'third', title: 'Overview', icon: OverviewIcon },
    { key: 'fourth', title: 'Compete', icon: AnalyzeIcon },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FriendsScreen username={username} />;
      case 'second':
        return <CheckInScreen username={username} setAlreadyCheckedIn={setAlreadyCheckedIn} alreadyCheckedIn={alreadyCheckedIn} />;
      case 'third':
        return <OverviewScreen username={username} alreadyCheckedIn={alreadyCheckedIn} />;
      case 'fourth':
        return <CompeteScreen />;
      default:
        return null;
    }
  };

  // sign out the user
  const signOut = () => {
    setIsSignedIn(false);
    setIsSignOut(true);
    setUsername(null);
  }
  
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
        colors={['#131313', '#131313', '#131313', '#131313', '#131313', '#131313', '#131313', '#2C2D57']}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      >
      {isSignedIn ?
          <SafeAreaView style={ styles.safeAreaView }>
            <TopBar signOut={signOut}/>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={props => <CustomTabBar {...props} />}
            />
          </SafeAreaView>
      : <AuthScreen username={username} setUsername={setUsername} setIsSignedIn={setIsSignedIn}/>}
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