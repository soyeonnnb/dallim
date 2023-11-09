import * as S from './Login.styles';
import LoginTitle from '@/assets/images/LoginTitle.png';
import NaverIcon from '@/assets/icons/NaverIcon.png';
import KakaoIcon from '@/assets/icons/KakaoIcon.png';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const Login = ({ navigation }: any) => {

  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 무한 반복되는 애니메이션을 생성합니다.
    Animated.loop(
      // 위아래로 움직이는 애니메이션 시퀀스를 정의합니다.
      Animated.sequence([
        // 0에서 -50까지 이동 (위로)
        Animated.timing(moveAnim, {
          toValue: -50,
          duration: 1000,
          useNativeDriver: true,
        }),
        // -50에서 다시 0으로 이동 (아래로)
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [moveAnim]);


  return (
    <S.Container>
      <S.BackgroundVideo
        source={require('@/assets/videos/LoginBackground.mp4')}
        resizeMode="cover"
        repeat={true}
        muted={true}
        playInBackground={false}
        playWhenInactive={false}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject, 
          transform: [{ translateY: moveAnim }], 
        }}
      >
        <S.BackgroundImage source={require('@/assets/images/LoginBackground_1.png')} resizeMode='contain' />
      </Animated.View>


      <S.Top>
        <S.TitleBox>
          <S.TitleImage source={LoginTitle} />
        </S.TitleBox>
      </S.Top>

      <S.Body>
        <S.NaverButton onPress={() => navigation.navigate('Naver')}>
          <S.Icon source={NaverIcon} />
          <S.NaverText>네이버로 시작하기</S.NaverText>
        </S.NaverButton>

        <S.KakaoButton onPress={() => navigation.navigate('Kakao')}>
          <S.Icon source={KakaoIcon} />
          <S.KakaoText>카카오로 시작하기</S.KakaoText>
        </S.KakaoButton>
      </S.Body>

      <S.Footer>
        <S.BackgroundImage source={require('@/assets/images/LoginBackground_2.png')} resizeMode='cover'>
        </S.BackgroundImage>
      </S.Footer>

    </S.Container>
  );
};

export default Login;
