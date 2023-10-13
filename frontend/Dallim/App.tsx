import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import Login from './src/screens/Login/Login';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* 네비게이션 스택 또는 다른 네비게이션 구성을 이곳에 추가할 수 있다 */}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;