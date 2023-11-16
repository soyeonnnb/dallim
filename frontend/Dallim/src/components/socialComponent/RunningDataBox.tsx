import * as S from './RunningDataBox.styles';
import PlaceIcon from '@/assets/icons/PlaceIcon';
import DateIcon from '@/assets/icons/DateIcon';
import DistIcon from '@/assets/icons/DistIcon';
import TimeIcon from '@/assets/icons/TimeIcon';
import SpeedsIcon from '@/assets/icons/SpeedsIcon';
import {postRecordSave} from '@/apis/SocialApi';
import CheckModal from './socialModal/CheckModal';
import {useState} from 'react';
import {
  calculatePace,
  meterToKMOrMeter,
  secondToMinuteText,
} from '@/recoil/data/RunningData';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

interface RunningDataBoxProps {
  id: string;
  location: string;
  createdAt: string;
  totalDistance: number;
  totalTime: number;
  averagePace: number;
  registration: boolean;
  onUpdateRegistration: (id: string) => void;
}

function RunningDataBox({
  id,
  location,
  createdAt,
  totalDistance,
  totalTime,
  averagePace,
  registration,
  onUpdateRegistration,
}: RunningDataBoxProps) {
  // 날짜 형식 변환 함수, 예: "2023-10-25T21:00:00" -> "2023년 10월 25일"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const handleModalRecordSave = async () => {
    // console.log('모달에서 기록 저장 버튼 클릭 확인, id:', id);
    try {
      await postRecordSave(id); // 서버 전송
      onUpdateRegistration(id); // 상태 업데이트
    } catch (error) {
      // console.error('런닝메이트 등록 오류', error);
    }
  };

  const [checkModalVisible, setCheckModalVisible] = useState(false); // 행성 선택 확인 모달

  function toggleCheckModal() {
    setCheckModalVisible(!checkModalVisible);
  }

  const formatTime = (totalMinutes: number) => {
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${totalMinutes}분`;
    }
  };

  return (
    <S.Container>
      <S.BoxShadow
        distance={3}
        startColor="rgba(0, 0, 0, 0.25)"
        endColor="rgba(0, 0, 0, 0.25)"
        offset={[0, 3]}>
        <S.Box>
          <S.Top>
            <S.TopLeft>
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
              <S.Text>{location}</S.Text>
            </S.TopLeft>
            <S.TopRight>
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
              <S.Text>{formatDate(createdAt)}</S.Text>
            </S.TopRight>
          </S.Top>
          <S.Middle>
            <S.MiddleLeft>
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
              <S.Text>{meterToKMOrMeter(totalDistance)}</S.Text>
            </S.MiddleLeft>
            <S.MiddleRight>
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
              <S.Text>{secondToMinuteText(totalTime)}</S.Text>
            </S.MiddleRight>
          </S.Middle>
          <S.Bottom>
            <S.BottomLeft>
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
              <S.Text>{calculatePace(averagePace)}</S.Text>
            </S.BottomLeft>
            <S.BottomRight>
              <S.AddBox>
                {!registration ? (
                  <S.ButtonShadow
                    distance={2}
                    startColor="rgba(0, 0, 0, 0.25)"
                    endColor="rgba(0, 0, 0, 0.25)"
                    offset={[0, 2]}>
                    <S.AddButton onPress={toggleCheckModal}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={['#6EE2F5', '#6454F0']}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',

                          // position: 'absolute',
                        }}>
                        <S.AddText>등록하기</S.AddText>
                      </LinearGradient>
                    </S.AddButton>
                  </S.ButtonShadow>
                ) : (
                  <S.ButtonShadow
                    distance={2}
                    startColor="rgba(0, 0, 0, 0.25)"
                    endColor="rgba(0, 0, 0, 0.25)"
                    offset={[0, 2]}>
                    <S.AddButton_two disabled>
                      <S.AddText_two>등록됨</S.AddText_two>
                    </S.AddButton_two>
                  </S.ButtonShadow>
                )}
              </S.AddBox>
            </S.BottomRight>
          </S.Bottom>
        </S.Box>
      </S.BoxShadow>

      <CheckModal
        checkModalVisible={checkModalVisible}
        handleModalRecordSave={handleModalRecordSave}
        toggleCheckModal={toggleCheckModal}
      />
    </S.Container>
  );
}

export default RunningDataBox;
