import React from 'react';
import { View, Text } from 'react-native';
import { TabBar } from 'react-native-tab-view';

const CustomTabBar = (props) => {
  const renderIcon = ({ route }) => {
    const Icon = route.icon;
    return <Icon />;
  };

  return (
    <TabBar
      {...props}
      renderIcon={renderIcon}
      renderLabel={({ route }) => <Text>{route.title}</Text>}
    />
  );
};

export default CustomTabBar;