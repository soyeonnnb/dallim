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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  requestUserPermission,
  NotificationListner,
} from './src/utils/pushnotification_helper';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Platform, Linking} from 'react-native';
import {displayNoti} from './src/utils/pushnotification_helper';

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
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      displayNoti(remoteMessage); // 위에서 작성한 함수로 넘겨준다
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const {status} = await checkNotifications();

      if (status === 'denied') {
        requestNotifications(['alert', 'sound']).then(({status}) => {
          // If the status is still denied, guide the user to the settings
          if (
            status === 'denied' &&
            Platform.OS === 'android' &&
            Platform.Version >= 33
          ) {
            // Open the app's settings page in the system settings
            Linking.openSettings();
          }
        });
      }
    };

    requestNotificationPermission();
  }, []);

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('[FCM Token] ', fcmToken);
      // 비동기 저장 처리를 기다립니다.
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (e) {
      // 에러 핸들링
      console.error('Failed to fetch or save FCM token', e);
    }
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
