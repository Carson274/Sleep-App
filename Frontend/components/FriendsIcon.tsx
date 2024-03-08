import React from 'react';
import { View } from 'react-native';
import FriendsIconUnfocused from '../assets/icons/FriendsIcon.svg';
import FriendsIconFocused from '../assets/icons/FriendsIconFocused.svg'; 

const FriendsIcon = ({ focused }) => {
  return (
    <View>
      {focused ? (
        <FriendsIconFocused width={40} height={40} />
      ) : (
        <FriendsIconUnfocused width={40} height={40} />
      )}
    </View>
  );
};

export default FriendsIcon;