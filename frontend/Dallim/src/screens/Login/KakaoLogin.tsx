import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/common/Loading';
import {postFcmToken} from '@/apis/LoginApi';
//
interface KakaoLoginProps {
  navigation: any;
}

const KakaoLogin = ({navigation}: KakaoLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

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

      await AsyncStorage.setItem('userId', String(data.uesrId));
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await postFcmToken();
    } catch (error) {
      console.error('Error during login request:', error);
      throw error; // 또는 적절한 에러 처리
    }
  };

  const parseAuthCode = async (url: string) => {
    if (isCodeSent) return;
    const exp = 'code=';
    const startIndex = url.indexOf(exp);
    if (startIndex !== -1) {
      setIsCodeSent(true);
      const authCode = url.substring(startIndex + exp.length);

      setIsLoading(true);

      await axios

        .get('http://k9b208.p.ssafy.io/api/oauth2/code/kakao', {
          params: {
            code: authCode,
          },
        })
        .then(async res => {
          const accessToken = res.data.accessToken;

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
            uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=https://k9b208.p.ssafy.io/login/oauth2/code/kakao',
            // uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://localhost:8080/login/oauth2/code/kakao',
            // uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://localhost:8081/login/oauth2/code/kakao',
            // uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://k9b208.p.ssafy.io/login/oauth2/code/kakao',
            headers: {
              'Accept-Language': 'ko-KR,ko',
            },
          }}
          javaScriptEnabled={true}
          saveFormData={false}
          onNavigationStateChange={navState => {
            parseAuthCode(navState.url);
          }}
        />
      )}
    </View>
  );
};

export default KakaoLogin;
