import React from 'react';
import { View } from 'react-native';
import CheckInIconUnfocused from '../assets/icons/CheckInIcon.svg';
import CheckInIconFocused from '../assets/icons/CheckInIconFocused.svg'; 

const CheckInIcon = ({ focused }) => {
  return (
    <View>
      {focused ? (
        <CheckInIconFocused width={40} height={40} />
      ) : (
        <CheckInIconUnfocused width={40} height={40} />
      )}
    </View>
  );
};

export default CheckInIcon;