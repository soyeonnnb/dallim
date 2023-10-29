import React from 'react';
import * as S from './Chart.styles'; // 스타일 컴포넌트 import
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
import Character from '@/assets/characters/Penguin.png';

import FirstChart from '../../components/chartComponent/FirstChart';
import SecondChart from '../../components/chartComponent/SecondChart';
import ThirdChart from '../../components/chartComponent/ThirdChart';

function Chart() {
    const { width } = Dimensions.get('window');

    const Nickname = '하늘을 나는 펭소';
    const components = [<FirstChart />, <SecondChart />, <ThirdChart />];

    return (
        <S.Container>
            <S.BackgroundImage
                source={require('../../assets/images/MainBackground3.png')}
                resizeMode="cover">
                <S.Body>
                    <S.BodyBox>
                        <S.Top>
                            <S.CharacterBox>
                                <S.Cycle>
                                    <S.CharacterImage source={Character} />
                                </S.Cycle>
                            </S.CharacterBox>
                            <S.NicknameBox>
                                <S.NicknameText>{Nickname}</S.NicknameText>
                            </S.NicknameBox>
                        </S.Top>
                        <S.Middle>
                            <Carousel
                                data={components}
                                width={width / 3 * 2}
                                renderItem={({ item, index }: { item: React.ReactElement; index: number }) =>
                                    <React.Fragment key={index}>{item}</React.Fragment> // key prop 추가
                                }
                            />
                        </S.Middle>
                    </S.BodyBox>
                </S.Body>
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Chart;
