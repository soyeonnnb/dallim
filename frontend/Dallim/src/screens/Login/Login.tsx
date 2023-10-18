import React from 'react';
import { Button } from 'react-native';
import * as S from './Login.styles';

interface LoginProps {
  navigation: any;
}
const Login = ({ navigation }: LoginProps) => {
  return (
    <S.Container>
      <S.Title>Login Screen</S.Title>
      <Button
        title="Go to Main"
        onPress={() => navigation.navigate('BottomTab', { screen: 'Main' })}
      />
      <Button
        title="Go to Main"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTab', params: { screen: 'Main' } }],
          });
        }}
      />
      <Button
        title="카카오 로그인 버튼"
        onPress={() => navigation.navigate('Kakao')}
      />
      <Button
        title="네이버 로그인 버튼"
        onPress={() => navigation.navigate('Naver')}
      />
    </S.Container>
  );
};

export default Login;
