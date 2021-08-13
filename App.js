import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './app/navigation/AppNavigation';
import AudioProvider from './app/context/AudioProvider';

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AudioProvider>
  );
}