import * as React from 'react';
import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeModules,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './src/components/common/bottomTab/BottomTab';
import Kakao from './src/screens/login/KakaoLogin';
import Login from './src/screens/login/Login';
import NotFound from './src/screens/notFound/NotFound';
import Naver from './src/screens/login/NaverLogin';
import Toast from 'react-native-toast-message';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const group = 'group.streak';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}} // BottomTab의 헤더 숨기기
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Kakao"
          component={Kakao}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Naver"
          component={Naver}
          options={{headerShown: false}}
        />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
}

export default App;
