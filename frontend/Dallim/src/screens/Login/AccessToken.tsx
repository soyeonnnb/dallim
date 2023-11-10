import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from './Login.styles';
import React, {useEffect} from 'react';
import {Text} from 'react-native-svg';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {
  navigation: any;
}

const AccessToken = ({navigation}: Props) => {
  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('[access Token]' + token);
      if (token) {
        navigation.navigate('BottomTab', {
          screen: 'Main',
        });
      } else {
        // token이 없으면 Login페이지
        navigation.replace('Login');
      }
    };

    checkTokenAndNavigate();
  }, []);

  return <S.Container></S.Container>;
};

export default AccessToken;
