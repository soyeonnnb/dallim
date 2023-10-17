import React, {useState} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NaverLoginProps {
  navigation: any;
}

const NaverLogin = ({navigation}: NaverLoginProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const parseAuthCode = async (url: string) => {
    const exp = 'code='; // URL에서 인가 코드 추출
    const startIndex = url.indexOf(exp);
    if (startIndex !== -1) {
      const endIndex = url.indexOf('&', startIndex); // '&' 문자를 기준으로 파라미터 값을 추출합니다.
      const authCode = url.substring(
        startIndex + exp.length,
        endIndex !== -1 ? endIndex : undefined,
      );

      // authCode를 사용하여 로직을 수행하면 됩니다.
      console.log('인가 코드: ' + authCode);

      // 네이버 로그인 API로 액세스 토큰 요청
      await axios
        .post('http://10.0.2.2:8080/api/oauth2/code/naver', null, {
          params: {
            code: authCode,
          },
        })
        .then(async res => {
          const accessToken = res.data.access_token;
          await AsyncStorage.setItem('accessToken', accessToken);
          console.log('Access Token: ', accessToken);
        })
        .catch(error => {
          console.error('Axios Error: ', error);
        });
      navigation.navigate('Main', {screen: 'Main'});
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{marginTop: 30}}
        source={{
          uri: 'https://nid.naver.com/oauth2.0/authorize?client_id=U981wCCDuUbK6_3C3WJo&response_type=code&redirect_uri=http://localhost:8080/login/oauth2/code/naver', // 네이버 로그인 페이지 URL
          headers: {
            'Accept-Language': 'ko-KR,ko',
          },
        }}
        method="GET" // HTTP 메서드 설정
        headers={{
          'Accept-Language': 'ko-KR,ko',
        }}
        body={null} // HTTP 요청 본문 설정
        javaScriptEnabled={true}
        saveFormData={false}
        onNavigationStateChange={navState => {
          // URL 변경 시 콘솔에 로그 출력
          console.log('URL 변경: ' + navState.url);

          // URL을 parseAuthCode 함수에 전달
          parseAuthCode(navState.url);
        }}
      />
    </View>
  );
};

export default NaverLogin;
