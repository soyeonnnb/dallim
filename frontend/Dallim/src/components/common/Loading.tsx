import { useEffect, useState } from 'react';
import { characterData } from '@/recoil/CharacterData';
import * as S from './Loading.styles';
import { Animated } from 'react-native';

function Loading() {
    const [fadeAnim] = useState(new Animated.Value(0));  // 초기 투명도는 0

    useEffect(() => {
        // 무한 반복하는 페이드 애니메이션
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <S.Container >
            <S.BackgroundImage
                source={require('@/assets/images/MainBackground4.png')}
                resizeMode="cover">
                <S.Body>
                    <S.ThemeBox>
                        <S.StyledGif
                            source={characterData[0].evolutions[0].running}
                            resizeMode="contain"
                        />
                    </S.ThemeBox>
                    <S.ThemeBox>
                        <S.StyledGif
                            source={characterData[1].evolutions[0].running}
                            resizeMode="contain"
                        />
                    </S.ThemeBox>
                    <S.ThemeBox>
                        <S.StyledGif
                            source={characterData[2].evolutions[0].running}
                            resizeMode="contain"
                        />
                    </S.ThemeBox>
                    <S.ThemeBox>
                        <S.StyledGif
                            source={characterData[3].evolutions[0].running}
                            resizeMode="contain"
                        />
                    </S.ThemeBox>
                </S.Body>

                <S.Footer>
                    <S.FooterBox>
                        <S.AnimatedFooterText style={{ opacity: fadeAnim }}>로딩 중...</S.AnimatedFooterText>
                    </S.FooterBox>
                </S.Footer>

                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};


export default Loading;
