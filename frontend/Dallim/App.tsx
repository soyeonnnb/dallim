import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/components/common/bottomTab/BottomTab';
// import Login from '../../../screens/Login/Login';
// import NotFound from '../../../screens/notFound/NotFound';

function App() {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}

export default App;