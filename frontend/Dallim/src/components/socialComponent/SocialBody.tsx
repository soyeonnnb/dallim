import React, { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import * as S from './SocialBody.styles';
import QuestionIcon from '../../assets/icons/QuestionIcon.png';
import RankInfoBox from './RankInfoBox';

function SocialHeader() {

    const NowDate = new Date();
    const DateMonth = NowDate.getMonth() + 1;  // getMonth는 0부터 시작하기 때문

    const startOfYear = new Date(NowDate.getFullYear(), 0, 1);
    const daysPassedSinceStartOfYear = Math.floor((NowDate - startOfYear) / (24 * 60 * 60 * 1000));

    // 1월 1일이 속한 주를 첫째 주로 간주
    const daysFromStartWeek = startOfYear.getDay(); // 0 (일요일) ~ 6 (토요일)
    const adjustedDaysPassed = daysPassedSinceStartOfYear + daysFromStartWeek;

    const DateWeek = Math.ceil(adjustedDaysPassed / 7);

    const [isOn, setIsOn] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const toggleHandle = () => {
        setIsOn(prevIsOn => {
            Animated.timing(animatedValue, {
                toValue: prevIsOn ? 0 : 50,
                duration: 100,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();
            return !prevIsOn;
        });
    };

    return (
        <S.Container>
            <S.Top>
                <S.TopLeft>
                    <S.DateText>{DateMonth}월 {DateWeek}주차 랭킹  </S.DateText>
                    <S.QuestionImage source={QuestionIcon} />
                </S.TopLeft>
                <S.ToggleButtonWrapper onPress={toggleHandle}>
                    <S.ToggleButton
                        style={{
                            transform: [
                                {
                                    translateX: animatedValue,
                                },
                            ],
                        }}
                    >
                        <S.ToggleButtonText>{isOn ? "팔로잉" : "전체"}</S.ToggleButtonText>
                    </S.ToggleButton>
                </S.ToggleButtonWrapper>
            </S.Top>
            <S.Body>
                {/* 나중에 데이터 불러와서 스크롤 적용 예정 */}
                <RankInfoBox />
                <RankInfoBox />
                <RankInfoBox />
                <RankInfoBox />
                <RankInfoBox />
            </S.Body>
        </S.Container>
    );
};

export default SocialHeader;
