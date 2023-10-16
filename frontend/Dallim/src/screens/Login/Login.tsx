import React from 'react';
import {Button} from 'react-native';
import * as S from './Login.styles'; // 스타일 컴포넌트 import

interface LoginProps {
  navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const Login = ({navigation}: LoginProps) => {
  return (
    <S.Container>
      <S.Title>Login Screen</S.Title>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="카카오 로그인 버튼"
        onPress={() => navigation.navigate('Kakao')}
      />
    </S.Container>
  );
};

export default Login;
