import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// 스크린 List
import Login from './src/screens/Login/Login';
import Main from './src/screens/main/Main';
import Chart from './src/screens/chart/Chart';
import Social from './src/screens/social/Social';
import Edit from './src/screens/edit/Edit';
import Profile from './src/screens/profile/Profile';
import NotFound from './src/screens/notFound/NotFound';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* 네비게이션 스택 또는 다른 네비게이션 구성을 이곳에 추가할 수 있다 */}
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Chart' component={Chart} />
        <Stack.Screen name='Social' component={Social} />
        <Stack.Screen name='Edit' component={Edit} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='NotFound' component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;