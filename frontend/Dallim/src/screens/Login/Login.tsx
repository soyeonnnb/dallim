import React from 'react';
import {Button} from 'react-native';
import * as S from './Login.styles';

import Moon from '../../assets/images/LoginMoon.png';
import NaverIcon from '../../assets/icons/NaverIcon.png';
import KakaoIcon from '../../assets/icons/KakaoIcon.png';

interface LoginProps {
  navigation: any;
}

const Login = ({navigation}: LoginProps) => {
  return (
    <S.Container>
      <S.BackgroundVideo
        source={require('../../assets/videos/LoginBackground.mp4')}
        resizeMode="cover"
        repeat={true}
        muted={true}
        playInBackground={false}
        playWhenInactive={false}
      />

      <S.Body>
        <S.StyledImage source={Moon} />

        {/* 임시버튼 */}
        <Button
          title="Go to Main"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTab', params: {screen: 'Main'}}],
            });
          }}
        />
      </S.Body>
      <S.Bottom>
        <S.NaverButton onPress={() => navigation.navigate('Naver')}>
          <S.Icon source={NaverIcon} />
          <S.NaverText>네이버로 시작하기</S.NaverText>
        </S.NaverButton>

        <S.KakaoButton onPress={() => navigation.navigate('Kakao')}>
          <S.Icon source={KakaoIcon} />
          <S.KakaoText>카카오로 시작하기</S.KakaoText>
        </S.KakaoButton>
      </S.Bottom>
    </S.Container>
  );
};

export default Login;
