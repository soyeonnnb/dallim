import * as S from './CardPage.styles';
import {planetData} from '@/recoil/data/PlanetData';
import {characterData} from '@/recoil/data/CharacterData';

// Icon

import ClearIcon from '@/assets/icons/ClearIcon.png';
import {calculatePace, meterToKMOrMeter} from '@/recoil/data/RunningData';

import RadialGradient from 'react-native-radial-gradient';
import PlaceIcon from '@/assets/icons/PlaceIcon';
import DateIcon from '@/assets/icons/DateIcon';
import DistIcon from '@/assets/icons/DistIcon';
import TimeIcon from '@/assets/icons/TimeIcon';
import SpeedsIcon from '@/assets/icons/SpeedsIcon';

interface ICardPage {
  item: {
    id: string;
    characterIndex: number;
    evolutionStage: number;
    planetIndex: number;
    level: number;
    nickName: string;
    totalDistance: number;
    averagePace: number;
    totalTime: number;
    createdAt: string;
    clear: boolean;
    location: string;
  };
  // style: ViewStyle;
}

export default function CardPage({item}: ICardPage) {
  const selectedCharacter = characterData[item.characterIndex];
  const selectedCharacterLevelData =
    selectedCharacter.Evolutions[item.evolutionStage];

  const getFormattedDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };
  const formattedDate = getFormattedDate(item.createdAt);

  // 속력
  // const speed = item.totalDistance / item.totalDistance;

  const formatTimeFromSeconds = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600); // 총 시간을 3600으로 나눠 시간 구하기
    const minutes = Math.floor((totalSeconds % 3600) / 60); // 남은 초를 60으로 나눠 분 구하기
    const seconds = totalSeconds % 60; // 남은 초

    // 시간, 분, 초를 문자열로 변환
    let timeString = '';
    if (hours > 0) timeString += `${hours}시간 `;
    if (minutes > 0) timeString += `${minutes}분 `;
    timeString += `${seconds}초`;

    return timeString;
  };

  // const formatPace = (pace: number) => {
  //   const minutes = calculatePace(pace); // 분

  //   return `{minutes}`; // 포맷팅된 문자열 반환
  // };

  return (
    // <S.PageItem style={style}>
    <S.PageItem>
      <S.ImageWrapper>
        <S.StyledImage
          source={planetData[item.planetIndex].Cardtwo}
          resizeMode="cover">
          <S.Header>
            <S.HeaderLeft>
              <S.LevelText>Lv. {item.level}</S.LevelText>
            </S.HeaderLeft>
            <S.HeaderRight>
              <S.NicknameText>{item.nickName}</S.NicknameText>
            </S.HeaderRight>
          </S.Header>
          <S.Body></S.Body>
          <S.Footer>
            <S.TopBox>
              <S.Icon>
                <S.CircleShadow
                  distance={2}
                  startColor="rgba(241, 139, 153, 0.4)"
                  endColor="rgba(232, 166, 174, 0.4)"
                  offset={[0, 0]}>
                  <S.PlaceCircle>
                    <PlaceIcon width={15} height={15} />
                    <RadialGradient
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 100,
                        opacity: 0.25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        overflow: 'hidden',
                      }}
                      colors={['#ffffff', '#F18298']}
                      stops={[0.03, 0.4]}
                      radius={20}
                      center={[50, 100]}></RadialGradient>
                  </S.PlaceCircle>
                </S.CircleShadow>
              </S.Icon>
              <S.FooterText>
                <S.DateText>{item.location}</S.DateText>
              </S.FooterText>
            </S.TopBox>
            <S.TopBox>
              <S.Icon>
                <S.CircleShadow
                  distance={2}
                  startColor="rgba(70, 208, 110, 0.3)"
                  endColor="rgba(70, 208, 110, 0.5)"
                  offset={[0, 0]}>
                  <S.DateCircle>
                    <DateIcon width={15} height={15} />
                  </S.DateCircle>
                </S.CircleShadow>
              </S.Icon>
              <S.FooterText>
                <S.DateText>{formattedDate}</S.DateText>
              </S.FooterText>
            </S.TopBox>
            <S.TopBox>
              <S.Icon>
                <S.CircleShadow
                  distance={2}
                  startColor="rgba(239, 102, 71, 0.3)"
                  endColor="rgba(239, 102, 71, 0.3)"
                  offset={[0, 0]}>
                  <S.DistCircle>
                    <DistIcon width={18} height={18} />
                    <RadialGradient
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 100,
                        opacity: 0.15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        overflow: 'hidden',
                      }}
                      colors={['#ffffff', '#B82101']}
                      stops={[0.4, 1]}
                      radius={20}
                      center={[7, 7]}></RadialGradient>
                  </S.DistCircle>
                </S.CircleShadow>
              </S.Icon>
              <S.FooterText>
                <S.DateText>{meterToKMOrMeter(item.totalDistance)}</S.DateText>
              </S.FooterText>
            </S.TopBox>
            <S.TopBox>
              <S.Icon>
                <S.CircleShadow
                  distance={2}
                  startColor="rgba(229, 163, 232, 0.3)"
                  endColor="rgba(229, 163, 232, 0.3)"
                  offset={[0, 0]}>
                  <S.TimeCircle>
                    <TimeIcon width={15} height={15} />
                    <RadialGradient
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 100,
                        opacity: 0.15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        overflow: 'hidden',
                      }}
                      colors={['#F9CEFF', '#EF4CE9']}
                      stops={[0.4, 1]}
                      radius={20}
                      center={[7, 7]}></RadialGradient>
                  </S.TimeCircle>
                </S.CircleShadow>
              </S.Icon>
              <S.FooterText>
                <S.DateText>{formatTimeFromSeconds(item.totalTime)}</S.DateText>
              </S.FooterText>
            </S.TopBox>
            <S.TopBox>
              <S.Icon>
                <S.CircleShadow
                  distance={2}
                  startColor="rgba(111, 133, 205, 0.5)"
                  endColor="rgba(109, 166, 216, 0.5)"
                  offset={[0, 0]}>
                  <S.SpeedCircle>
                    <SpeedsIcon width={13} height={13} />
                    <RadialGradient
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 100,
                        opacity: 0.15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        overflow: 'hidden',
                      }}
                      colors={['#F9CEFF', '#0030D9']}
                      stops={[0.4, 1]}
                      radius={20}
                      center={[7, 7]}></RadialGradient>
                  </S.SpeedCircle>
                </S.CircleShadow>
              </S.Icon>
              <S.FooterText>
                <S.DateText>{calculatePace(item.averagePace)}</S.DateText>
              </S.FooterText>
            </S.TopBox>
          </S.Footer>

          {/* 클리어 도장 */}
        </S.StyledImage>
      </S.ImageWrapper>
      
      <S.ClearBox>
        {item.clear && <S.ClearImage source={ClearIcon} resizeMode="contain" />}
      </S.ClearBox>

      {/* 캐릭터 */}
      <S.BodyBottomCharacterImageBox>
        <S.CharacterImage
          source={selectedCharacterLevelData.Main}
          resizeMode="contain"
        />
      </S.BodyBottomCharacterImageBox>
    </S.PageItem>
  );
}
