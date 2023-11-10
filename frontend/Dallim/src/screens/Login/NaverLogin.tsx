import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/common/Loading';
import {postFcmToken} from '@/apis/LoginApi';

interface NaverLoginProps {
  navigation: any;
}

const NaverLogin = ({navigation}: NaverLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  // const sendLoginRequest = async (token: string) => {
  //   try {
  //     const response = await fetch('http://10.0.2.2:8080/api/oauth/login', {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({access: token}),
  //     });
  //     const data = await response.json();

  //     await AsyncStorage.setItem('accessToken', data.accessToken);
  const sendLoginRequest = async (token: string) => {
    try {
      const response = await axios.get(
        'http://k9b208.p.ssafy.io/api/oauth/login',
        {
          params: {
            access: token,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = response.data;
      console.log(data);
      await AsyncStorage.setItem('userId', String(data.uesrId));
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await postFcmToken();
      setIsLoading(false);
      navigation.navigate('BottomTab', {
        screen: 'Main',
      });
    } catch (error) {
      console.error('Error during login request:', error);
      throw error;
    }
  };

  const parseAuthCode = async (url: string) => {
    if (isCodeSent) return;
    const exp = 'code=';
    const startIndex = url.indexOf(exp);
    if (startIndex !== -1) {
      setIsCodeSent(true);
      const endIndex = url.indexOf('&', startIndex);
      const authCode = url.substring(
        startIndex + exp.length,
        endIndex !== -1 ? endIndex : undefined,
      );

      setIsLoading(true);

      await axios
        .get('http://k9b208.p.ssafy.io/api/oauth2/code/naver', {
          params: {
            code: authCode,
          },
        })
        .then(async res => {
          // const data = await res.data;
          const accessToken = res.data.accessToken;

          // await AsyncStorage.setItem('userId', String(res.data.uesrId));
          // console.log(res.data.uesrId);
          await sendLoginRequest(accessToken);
        })
        .catch(error => {
          console.error('Axios Error: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      navigation.navigate('BottomTab', {
        screen: 'Main',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loading />
      ) : (
        <WebView
          originWhitelist={['*']}
          scalesPageToFit={false}
          style={{marginTop: 30}}
          source={{
            uri: 'https://nid.naver.com/oauth2.0/authorize?client_id=U981wCCDuUbK6_3C3WJo&response_type=code&redirect_uri=http://localhost:8080/login/oauth2/code/naver',

            // uri: 'https://nid.naver.com/oauth2.0/authorize?client_id=U981wCCDuUbK6_3C3WJo&response_type=code&redirect_uri=https://k9b208.p.ssafy.io/login/oauth2/code/naver', // 네이버 로그인 페이지 URL
            headers: {
              'Accept-Language': 'ko-KR,ko',
            },
          }}
          method="GET"
          headers={{
            'Accept-Language': 'ko-KR,ko',
          }}
          body={null}
          javaScriptEnabled={true}
          saveFormData={false}
          onNavigationStateChange={navState => {
            parseAuthCode(navState.url);
          }}
          // uri: 'https://nid.naver.com/oauth2.0/authorize?client_id=U981wCCDuUbK6_3C3WJo&response_type=code&redirect_uri=https://k9b208.p.ssafy.io/login/oauth2/code/naver', // 네이버 로그인 페이지 URL
        />
      )}
    </View>
  );
};

export default NaverLogin;
