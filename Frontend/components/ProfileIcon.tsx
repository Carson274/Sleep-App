import React from 'react';
import { View } from 'react-native';
import ProfileIconUnfocused from '../assets/icons/ProfileIcon.svg';
import ProfileIconFocused from '../assets/icons/ProfileIconFocused.svg'; 

const ProfileIcon = ({ focused }) => {
  return (
    <View>
      {focused ? (
        <ProfileIconFocused width={40} height={40} />
      ) : (
        <ProfileIconUnfocused width={40} height={40} />
      )}
    </View>
  );
};

export default ProfileIcon;