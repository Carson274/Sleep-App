import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsListComponent from '../components/FriendsListComponent';
import FriendsPendingComponent from '../components/FriendsPendingComponent';
import FriendsAddComponent from '../components/FriendsAddComponent';

const Tab = createMaterialTopTabNavigator();

const FriendsScreen = ({ username }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="FriendsList"
        tabBarPosition="top"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 16, textTransform: 'none'  },
          tabBarStyle: { backgroundColor: 'transparent' },
          tabBarIndicatorStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen name="Friends" component={FriendsListComponent} initialParams={{ username: username }} />
        {/* <Tab.Screen name="Pending" component={FriendsPendingComponent} initialParams={{ username: username }} /> */}
        <Tab.Screen name="Add" component={FriendsAddComponent} initialParams={{ username: username }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default FriendsScreen;
