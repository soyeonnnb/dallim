import * as S from './AloneRunModal.styles';
import { equippedCharacterIndexState, equippedEvolutionStageState, equippedPlanetIndexState } from '@/recoil/UserRecoil';
import { PermissionsAndroid, Platform } from 'react-native';
import { characterData } from '@/recoil/CharacterData';
import React, { useEffect, useRef, useState } from 'react';
import { planetData } from '@/recoil/PlanetData';
import { Modal } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import SpinAnimation from '@/components/common/SpinAnimation';

import { runningSessionState, secondsElapsedState, isRunningState, totalDistanceState, displayDistanceState, lastPositionState } from '@/recoil/RunningRecoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import ExitModal from './ExitModal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

interface Position {
  latitude: number;
  longitude: number;
}

interface LocationData {
  second: number; // 필요
  latitude: number;
  longitude: number;
  distance: number; // 필요
  speed: number; // 필요
  pace: number; // 필요
}

const AloneRunModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);


  const equippedCharacterIndex = useRecoilValue(equippedCharacterIndexState);
  const equippedEvolutionStage = useRecoilValue(equippedEvolutionStageState);
  const equippedPlanetIndex = useRecoilValue(equippedPlanetIndexState);

  const [runningSession, setRunningSession] = useRecoilState(runningSessionState);
  const [secondsElapsed, setSecondsElapsed] = useRecoilState(secondsElapsedState);
  const [isRunning, setIsRunning] = useRecoilState(isRunningState);
  const [totalDistance, setTotalDistance] = useRecoilState(totalDistanceState);
  const [displayDistance, setDisplayDistance] = useRecoilState(displayDistanceState);
  const [lastPosition, setLastPosition] = useRecoilState(lastPositionState); // Recoil 상태로 정의

  const [showStart, setShowStart] = useState(true);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimer();
      startTracking();
    } else if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
  }, [isRunning]);

  // 위치 권한 요청 함수 (안드로이드용)
  async function requestLocationPermission() {
    try {
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한",
            message: "이 앱은 위치 추적 기능이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "거부",
            buttonPositive: "허용"
          }
        );
      }
      return 'granted';
    } catch (err) {
      console.warn(err);
    }
  }

  // 달리기 시작
  const StartAlone = async () => {
    const permission = await requestLocationPermission();
    if (permission === 'granted') {
      startRun();
    }
  };

  // 타이머와 위치 추적을 시작하는 함수
  const startRun = () => {
    startTimer();
    startTracking();
    setIsRunning(true);
    setShowStart(true);
  }

  const stopRun = () => {
    if (timerIdRef.current) clearInterval(timerIdRef.current);
    setIsRunning(false); // 타이머 실행 상태를 false로 설정
  };

  // "종료" 버튼 클릭 시 실행되는 함수
  const handleStopButton = () => {
    handleShowExitModal(); // 종료 확인 모달 표시
  };

  const startTimer = () => {
    setSecondsElapsed(0); // 타이머 초기화
    timerIdRef.current = setInterval(() => {
      setSecondsElapsed(prevSeconds => prevSeconds + 1);
    }, 1000);
  };

  // 초를 시:분:초 형식으로 변환하는 함수
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map(val => val < 10 ? `0${val}` : val)
      .join(':');
  };


  // 위치 추적 시작 함수
  const startTracking = () => {
    const id = Geolocation.watchPosition((position) => {
      let distance = 0;
      if (lastPosition) {
        distance = calculateDistance(
          lastPosition.latitude,
          lastPosition.longitude,
          position.coords.latitude,
          position.coords.longitude
        );
      }
      setTotalDistance(prevTotal => {
        const newTotal = prevTotal + distance;
        setDisplayDistance(Math.round((newTotal / 1000) * 100) / 100.0); // 여기에서 km 단위로 변환하여 표시
        return newTotal;
      });
      const speed = position.coords.speed ?? 0; // speed가 null이면 0을 사용
      const speedInKmH = speed * 3.6; // m/s를 km/h로 변환
      const pace = speedInKmH !== 0 ? 60 / speedInKmH : 0; // 페이스 계산

      setRunningSession(oldRecords => {
        const newLocationData = {
          second: position.timestamp,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          distance: distance, // 이전에 계산한 거리
          speed: speed, // 이전에 계산한 속도
          pace: pace, // 이전에 계산한 페이스
        };
        console.log("ddddddddddddddddd : " + newLocationData);
        return {
          ...oldRecords, // 기존 상태의 다른 속성들을 유지
          runningRecordInfos: [...oldRecords.runningRecordInfos, newLocationData]// runningRecordInfos 배열에 새 데이터 추가
        };
      });
      setLastPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, distanceFilter: 0, interval: 1000 });
    setWatchId(id); // watcher ID 저장
  };

  // Haversine 공식을 사용하여 두 지점 간의 거리를 계산하는 함수
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // 지구의 반경(m)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리(m)
  }
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // 종료 모달
  const [showExitModal, setShowExitModal] = useState(false);
  // 종료 확인 모달 표시 함수
  const handleShowExitModal = () => {
    setShowExitModal(true);
    console.log("모달 뜸");
  };
  // 모달에서 "확인"을 눌렀을 때의 동작
  const handleConfirmExit = () => {
    stopRun(); // 타이머 멈추고 데이터 저장
    setShowExitModal(false);
    console.log("확인 누름 여기에서 axios로 보낼거야");
  };
  // 모달에서 "취소"를 눌렀을 때의 동작
  const handleCancelExit = () => {
    setShowExitModal(false);
    if (watchId !== null) {
      Geolocation.clearWatch(watchId); // 위치 추적 멈추기
    }
    console.log("취소 누름");
  };

  // 컴포넌트 렌더링 시작
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground3.png')}
        resizeMode="cover">
        <S.ModalContainer>
          <S.Header>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} />
            </S.CloseButton>
          </S.Header>

          <S.Body>
            <S.TimerBox>
              <S.TimerText>{formatTime(secondsElapsed)}</S.TimerText>
            </S.TimerBox>

            <S.StartBox>
              <S.ButtonBackground
                source={require('@/assets/images/StartButton.png')}
                resizeMode="contain">
                <S.RunButton onPress={isRunning ? handleStopButton : StartAlone}>
                  <S.StartText>{isRunning ? '종료' : '시작'}</S.StartText>
                </S.RunButton>
              </S.ButtonBackground>
            </S.StartBox>

            <S.RecodeBox>
              <S.RecodeLeft>
                <S.RecodeTextBox>
                  <S.RecodeTitle>러닝 시작 상태</S.RecodeTitle>
                </S.RecodeTextBox>
                <S.RecodeBottomBox>
                  <S.RecodeText>{isRunning}</S.RecodeText>
                </S.RecodeBottomBox>
              </S.RecodeLeft>
              <S.RecodeRight>
                <S.RecodeTextBox>
                  <S.RecodeTitle>총 거리</S.RecodeTitle>
                </S.RecodeTextBox>
                <S.RecodeBottomBox>
                  <S.RecodeText>{displayDistance} km</S.RecodeText>
                </S.RecodeBottomBox>
              </S.RecodeRight>
            </S.RecodeBox>
          </S.Body>

          {/* 행성 */}
          <S.ThemeBox>
            <SpinAnimation>
              <S.StyledImage
                source={planetData[equippedPlanetIndex].Planet}
                resizeMode="contain"
              />
            </SpinAnimation>
          </S.ThemeBox>

          {/* 캐릭터 */}
          <S.CharacterBox>
            <S.StyledGif
              source={
                characterData[equippedCharacterIndex].evolutions[
                  equippedEvolutionStage
                ].running
              }
              resizeMode="contain"
            />
          </S.CharacterBox>
        </S.ModalContainer>
      </S.BackgroundImage>

      <ExitModal
        isVisible={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </Modal>
  );
};

export default AloneRunModal;
