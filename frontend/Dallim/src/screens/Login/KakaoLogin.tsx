import React from 'react';
import {View, Text} from 'react-native';
import WebView from 'react-native-webview';
import * as S from './Login.style'; // 스타일 컴포넌트 import

interface KakaoLoginProps {
  navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const KakaoLogin = ({navigation}: KakaoLoginProps) => {
  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{marginTop: 30}}
        source={{
          //   uri: 'http://10.0.2.2:8080/oauth2/authorization/kakao',
          uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://localhost:8080/login/oauth2/code/kakao',
          //client_id에는 본인 앱 등록후 발급받은 REST API KEY
          //redirect_url도 본인 uri
          headers: {
            'Accept-Language': 'ko-KR,ko',
          },
        }}
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default KakaoLogin;
