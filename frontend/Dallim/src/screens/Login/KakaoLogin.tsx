import React from 'react';
import {View, Text} from 'react-native';
import WebView from 'react-native-webview';
import * as S from './Login.styles'; // 스타일 컴포넌트 import
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface KakaoLoginProps {
  navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const KakaoLogin = ({navigation}: KakaoLoginProps) => {
  const sendAuthCodeToServer = async (authCode: any) => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/login/oauth2/code/kakao',
        null, // 요청 본문은 null로 설정합니다.
        {
          params: {
            code: authCode,
          },
        },
      );
      console.log('서버 응답:', response.data);

      // 서버 응답을 처리하고 필요한 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('서버 요청 실패:', error);
    }
  };

  // parseAuthCode 함수 내에서 authCode를 얻은 후 호출
  const parseAuthCode = async (url: string) => {
    const exp = 'code='; //url에 붙어 날라오는 인가코드는 code=뒤부터 parse하여 get
    const startIndex = url.indexOf(exp); //url에서 "code="으로 시작하는 index를 찾지 못하면 -1반환
    if (startIndex !== -1) {
      const authCode = url.substring(startIndex + exp.length);
      console.log('authCode ' + authCode);

      // authCode를 서버로 전달
      sendAuthCodeToServer(authCode);

      navigation.navigate('Home', {screen: 'Home'});
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{marginTop: 30}}
        source={{
          // uri: 'http://10.0.2.2:8080/login/oauth2/code/kakao',
          // uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://10.0.2.2:8080/login/oauth2/code/kakao',
          uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://localhost:8080/login/oauth2/code/kakao',
          //client_id에는 본인 앱 등록후 발급받은 REST API KEY
          //redirect_url도 본인 uri
          headers: {
            'Accept-Language': 'ko-KR,ko',
          },
        }}
        javaScriptEnabled={true}
        // onMessage={event => {
        //   console.log(event.nativeEvent['url']);
        //   parseAuthCode(event.nativeEvent['url']);
        // }}
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

export default KakaoLogin;
