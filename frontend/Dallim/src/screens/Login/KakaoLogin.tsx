import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface KakaoLoginProps {
  navigation: any;
}

const KakaoLogin = ({navigation}: KakaoLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const parseAuthCode = async (url: string) => {
    const exp = 'code=';
    const startIndex = url.indexOf(exp);
    if (startIndex !== -1) {
      const authCode = url.substring(startIndex + exp.length);

      setIsLoading(true);

      await axios
        .post('http://10.0.2.2:8080/api/oauth2/code/kakao', null, {
          params: {
            code: authCode,
          },
        })
        .then(async res => {
          await AsyncStorage.setItem('accessToken', res.data.accessToken);
        })
        .catch(error => {
          console.error('Axios Error: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      navigation.navigate('Main', {screen: 'Main'});
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <WebView
          originWhitelist={['*']}
          scalesPageToFit={false}
          style={{marginTop: 30}}
          source={{
            uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1&redirect_uri=http://localhost:8080/login/oauth2/code/kakao',

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
