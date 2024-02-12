import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';

const CustomTabBar = (props) => {
  const renderIcon = ({ route, focused }) => {
    const Icon = route.icon;
    return <Icon focused={focused}/>;
  };

  const renderLabel = ({ route, focused }) => (
    <Text style={[styles.label, { color: focused ? '#666CFF' : '#B5B5B5' }]}>
      {route.title}
    </Text>
  );

  return (
    <TabBar
      style={ styles.tab }
      {...props}
      renderIcon={renderIcon}
      renderLabel={renderLabel}
    />
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: 'transparent',
  }
});

export default CustomTabBar;