import React from 'react';
import { View } from 'react-native';
import AnalyzeIconUnfocused from '../assets/icons/AnalyzeIcon.svg';
import AnalyzeIconFocused from '../assets/icons/AnalyzeIconFocused.svg'; 

const AnalyzeIcon = ({ focused }) => {
  return (
    <View>
      {focused ? (
        <AnalyzeIconFocused width={40} height={40} />
      ) : (
        <AnalyzeIconUnfocused width={40} height={40} />
      )}
    </View>
  );
};

export default AnalyzeIcon;