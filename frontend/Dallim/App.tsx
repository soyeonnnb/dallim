import * as React from 'react';

import { requestUserPermission, NotificationListner } from './src/utils/pushnotification_helper';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { displayNoti } from './src/utils/pushnotification_helper';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { Platform, Linking } from 'react-native';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from './src/components/common/bottomTab/BottomTab';
import messaging from '@react-native-firebase/messaging';
import NotFound from './src/screens/notFound/NotFound';
import Kakao from './src/screens/login/KakaoLogin';
import Naver from './src/screens/login/NaverLogin';
import Toast from 'react-native-toast-message';
import Login from './src/screens/login/Login';
import Sound from 'react-native-sound';

enableScreens();
const Stack = createStackNavigator();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});

function App() {
  // 배경쏭
  useEffect(() => {
    Sound.setCategory('Playback'); // 배경음악 재생 설정
    const bgm = new Sound('bgm2.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('오디오 로드 실패:', error);
        return;
      }
      bgm.setNumberOfLoops(-1); // 무한 반복
      bgm.play((success) => {
        if (!success) {
          console.log('오디오 재생 실패:');
        }
      });
    });
    return () => {
      bgm.release();
    };
  }, []);

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
      const { status } = await checkNotifications();

      if (status === 'denied') {
        requestNotifications(['alert', 'sound']).then(({ status }) => {
          if (
            status === 'denied' &&
            Platform.OS === 'android' &&
            Platform.Version >= 33
          ) {
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
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (e) {
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
            options={{ headerShown: false }} // BottomTab의 헤더 숨기기
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFound}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Kakao"
            component={Kakao}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Naver"
            component={Naver}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

        <Toast />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
