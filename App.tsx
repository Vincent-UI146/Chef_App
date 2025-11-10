import React from 'react';
import { StatusBar } from 'react-native';
import { Navigation } from './Appnavigator';
import { colors } from './style';

const App: React.FC = () => {
  return (
    <>
      <StatusBar 
        backgroundColor={colors.primary} 
        barStyle="light-content" 
      />
      <Navigation />
    </>
  );
};

export default App;