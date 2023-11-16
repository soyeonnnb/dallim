import * as React from 'react';
import { requestUserPermission, NotificationListner } from './src/utils/pushnotification_helper';
import { CommonActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { displayNoti } from './src/utils/pushnotification_helper';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Linking, View, Text } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar'; // 안드로이드 상태 표시줄과 네비게이션 바를 숨긴다.
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from './src/components/common/bottomTab/BottomTab';
import messaging from '@react-native-firebase/messaging';
import NotFound from './src/screens/notFound/NotFound';
import Kakao from './src/screens/login/KakaoLogin';
import Naver from './src/screens/login/NaverLogin';
import Login from './src/screens/login/Login';
import Sound from 'react-native-sound';
import AccessToken from './src/screens/login/AccessToken';

import Toast from 'react-native-toast-message';
import { SuccessToast, ErrorToast } from './src/components/common/toast/CustomToast';

enableScreens();
const Stack = createStackNavigator();
SystemNavigationBar.stickyImmersive();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});

function App() {

  // 배경쏭
  useEffect(() => {
    Sound.setCategory('Playback'); // 배경음악 재생 설정
    const bgm = new Sound('dallimbgm.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        // console.log('오디오 로드 실패:', error);
        return;
      }
      bgm.setNumberOfLoops(-1); // 무한 반복
      bgm.play(success => {
        if (!success) {
          // console.log('오디오 재생 실패:');
        }
      });
    });
    return () => {
      bgm.release();
    };
  }, []);

  // 토스트 커스텀
  const toastConfig = {
    success: (internalState) => <SuccessToast text1={internalState.text1} />,
    error: (internalState) => <ErrorToast text1={internalState.text1} />,
  };

  // 위치사용 허락
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      displayNoti(remoteMessage);
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
      // console.log('[FCM Token] ', fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (e) {
      // console.error('Failed to fetch or save FCM token', e);
    }
  };

  // const accessToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('accessToken');
  //     console.log('[access Token]' + token);
  //     if (token) {
  //       // navigation.dispatch(
  //       //   CommonActions.reset({
  //       //     routes: [{name: 'BottomTab'}],
  //       //   }),
  //       // );
  //     }
  //     return token;
  //   } catch (error) {
  //     console.error('Error fetching token:', error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });
    // accessToken();

    return unsubscribe;
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AccessToken">
          <Stack.Screen
            name="AccessToken"
            component={AccessToken}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }} // BottomTab의 헤더 숨기기
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

        <Toast config={toastConfig} />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
