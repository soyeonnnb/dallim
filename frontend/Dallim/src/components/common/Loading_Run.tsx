import * as S from './Loading_Run.styles';
import { characterData } from '@/recoil/data/CharacterData';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

import PlanetBlack from '@/assets/images/planets/main/PlanetBlack.png';
import PlanetPurple from '@/assets/images/planets/main/PlanetPurple.png';
import PlanetRed from '@/assets/images/planets/main/PlanetRed.png';
import PlanetBlue from '@/assets/images/planets/main/PlanetBlue.png';
import PlanetYellow from '@/assets/images/planets/main/PlanetYellow.png';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

interface LoadingRunProps {
  onReload: () => void; 
}
function Loading_Run({ onReload }: LoadingRunProps) {

  const [showReload, setShowReload] = useState(false);

  // 각 행성에 대한 회전 상태와 애니메이션 설정
  const rotateValue1 = new Animated.Value(0);
  const rotateValue2 = new Animated.Value(0);
  const rotateValue3 = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue1, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(rotateValue2, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(rotateValue3, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // 회전 값 계산
  const rotate1 = rotateValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotate2 = rotateValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['150deg', '510deg'],
  });
  const rotate3 = rotateValue3.interpolate({
    inputRange: [0, 1],
    outputRange: ['200deg', '560deg'],
  });
  const rotate4 = rotateValue3.interpolate({
    inputRange: [0, 1],
    outputRange: ['300deg', '660deg'],
  });

  // 10초 후에 새로고침 버튼을 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReload(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <S.Container>

      <S.RunBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[0].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[1].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[2].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[3].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
      </S.RunBox>

      <S.LoadingBox>
        {showReload ? (
          // 로딩 완료 후 새로고침 버튼 표시
          <S.ReloadButton onPress={onReload}>
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              colors={['#6EE2F5', '#6454F0']}
              style={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <S.ReloadButtonText>새로고침</S.ReloadButtonText>
              <RadialGradient
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                  opacity: 0.3,
                  justifyContent: 'center',
                  alignContent: 'center',
                  overflow: 'hidden',
                }}
                colors={['#ffffff', '#A890FF']}
                stops={[0, 0.3]}
                radius={500}
                center={[50, 100]}>


              </RadialGradient>
            </LinearGradient>
          </S.ReloadButton>
        ) : (
          <>
            <Animated.Image
              source={PlanetBlack}
              style={{
                width: 80, // 가운데 행성의 크기를 80으로 설정
                height: 80, // 가운데 행성의 크기를 80으로 설정
                position: 'absolute',
                top: '50%', // 부모 컨테이너 중앙에 위치
                left: '50%', // 부모 컨테이너 중앙에 위치
                transform: [
                  { translateX: -45 }, // 이미지 크기의 절반으로 이동
                  { translateY: -45 }, // 이미지 크기의 절반으로 이동
                  { rotate: rotate4 }, // 회전 애니메이션 적용

                ],
              }}
            />
            <Animated.Image
              source={PlanetPurple}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                top: '49%',
                left: '49%',
                transform: [
                  { translateX: -20 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { translateY: -25 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { rotate: rotate1 }, // 회전 애니메이션 적용
                  { translateX: 50 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  { translateY: 50 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                ],
              }}
            />
            <Animated.Image
              source={PlanetRed}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                top: '49%',
                left: '49%',
                transform: [
                  { translateX: -20 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { translateY: -25 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { rotate: rotate2 }, // 회전 애니메이션 적용
                  { translateX: 60 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  { translateY: 60 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                ],
              }}
            />
            <Animated.Image
              source={PlanetBlue}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                top: '49%',
                left: '49%',
                transform: [
                  { translateX: -20 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { translateY: -25 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { rotate: rotate3 }, // 회전 애니메이션 적용
                  { translateX: 70 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  { translateY: 70 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                ],
              }}
            />
            <Animated.Image
              source={PlanetYellow}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                top: '49%',
                left: '49%',
                transform: [
                  { translateX: -20 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { translateY: -25 }, // 중앙 행성의 반경 및 도는 행성의 크기를 고려하여 이동거리 조정
                  { rotate: rotate4 }, // 회전 애니메이션 적용
                  { translateX: 80 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  { translateY: 80 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                ],
              }}
            />

          </>

        )}
      </S.LoadingBox>


    </S.Container>
  );
}

export default Loading_Run;
