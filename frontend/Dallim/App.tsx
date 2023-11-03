import * as React from 'react';

import {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RecoilRoot} from 'recoil';
import BottomTab from './src/components/common/bottomTab/BottomTab';
import Kakao from './src/screens/login/KakaoLogin';
import Login from './src/screens/login/Login';
import NotFound from './src/screens/notFound/NotFound';
import Naver from './src/screens/login/NaverLogin';
import Toast from 'react-native-toast-message';
import {enableScreens} from 'react-native-screens';
import {DeviceEventEmitter} from 'react-native';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

enableScreens();
const Stack = createStackNavigator();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});

type RouteEvent = {
  name: string;
};

function NavigationWithListener() {
  const navigation = useNavigation();

  useEffect(() => {
    const appRouteSubscription = DeviceEventEmitter.addListener(
      'AppRouteEvent',
      (route: RouteEvent) => {
        if (route && route.name) {
        }
      },
    );

    return () => {
      appRouteSubscription.remove();
    };
  }, [navigation]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}
function App() {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token] ', fcmToken);
  };

  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

export default App;
