import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NaverLoginProps {
  navigation: any;
}

const NaverLogin = ({navigation}: NaverLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

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
        .post('http://10.0.2.2:8080/api/oauth2/code/naver', null, {
          params: {
            code: authCode,
          },
        })
        .then(async res => {
          const accessToken = res.data.accessToken;
          console.log(res.data.accessToken);
          // await AsyncStorage.setItem('accessToken', accessToken);
        })
        .catch(error => {
          console.error('Axios Error: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      // navigation.navigate('Main', {screen: 'Main'});
      navigation.navigate('BottomTab', {
        screen: 'Main',
      });
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
            uri: 'https://nid.naver.com/oauth2.0/authorize?client_id=U981wCCDuUbK6_3C3WJo&response_type=code&redirect_uri=http://localhost:8080/login/oauth2/code/naver', // 네이버 로그인 페이지 URL
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
        />
      )}
    </View>
  );
};

export default NaverLogin;
