import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Logo from '../assets/sleep_svg.svg';

const SplashScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Logo width={120} height={120} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;