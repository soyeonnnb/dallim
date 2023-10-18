import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import WebView from 'react-native-webview';
import * as S from './Login.styles'; // 스타일 컴포넌트 import
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface KakaoLoginProps {
  navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const KakaoLogin = ({navigation}: KakaoLoginProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const parseAuthCode = async (url: string) => {
    const exp = 'code='; //url에 붙어 날라오는 인가코드는 code=뒤부터 parse하여 get
    const startIndex = url.indexOf(exp); //url에서 "code="으로 시작하는 index를 찾지 못하면 -1반환
    if (startIndex !== -1) {
      const authCode = url.substring(startIndex + exp.length);
      console.log('access code :: ' + authCode);

      console.log(
        'Request URL: ',
        'http://10.0.2.2:8080/api/oauth2/code/kakao',
      );
      console.log('Request Data: ', {params: {code: authCode}});

      await axios
        .post('http://10.0.2.2:8080/api/oauth2/code/kakao', null, {
          params: {
            code: authCode,
          },
        })
        .then(async res => {
          await AsyncStorage.setItem('accessToken', res.data.accessToken);
          console.log(res.data.accessToken);
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
          // uri: 'http://10.0.2.2:8080/login/oauth2/code/kakao',
          // uri: 'https://kauth.kakao.com/oauth/authorize',
          // uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://10.0.2.2:8080/login/oauth2/code/kakao',
          uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://localhost:8080/login/oauth2/code/kakao',
          //client_id에는 본인 앱 등록후 발급받은 REST API KEY
          //redirect_url도 본인 uri
          headers: {
            'Accept-Language': 'ko-KR,ko',
          },
        }}
        javaScriptEnabled={true}
        saveFormData={false}
        // onMessage={event => {
        //   console.log('찍' + event.nativeEvent.url);
        //   parseAuthCode(event.nativeEvent.url);
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
