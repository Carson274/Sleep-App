import React from 'react';
import { View } from 'react-native';
import OverviewIconUnfocused from '../assets/icons/OverviewIcon.svg';
import OverviewIconFocused from '../assets/icons/OverviewIconFocused.svg'; 

const OverviewIcon = ({ focused }) => {
  return (
    <View>
      {focused ? (
        <OverviewIconFocused width={40} height={40} />
      ) : (
        <OverviewIconUnfocused width={40} height={40} />
      )}
    </View>
  );
};

export default OverviewIcon;