import * as S from './AloneRunModal.styles';
import { equippedCharacterIndexState, equippedEvolutionStageState, equippedPlanetIndexState, userIdState } from '@/recoil/UserRecoil';
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
import RuningModal from './RuningModal';

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
  const trackIdRef = useRef<number | null>(null); // 위치 추적 ID 저장을 위한 참조 변수

  const userId = useRecoilValue(userIdState);
  const equippedCharacterIndex = useRecoilValue(equippedCharacterIndexState);
  const equippedEvolutionStage = useRecoilValue(equippedEvolutionStageState);
  const equippedPlanetIndex = useRecoilValue(equippedPlanetIndexState);

  const [runningSession, setRunningSession] = useRecoilState(runningSessionState);
  const [secondsElapsed, setSecondsElapsed] = useRecoilState(secondsElapsedState);
  const [isRunning, setIsRunning] = useRecoilState(isRunningState);
  const [totalDistance, setTotalDistance] = useRecoilState(totalDistanceState);
  const [displayDistance, setDisplayDistance] = useRecoilState(displayDistanceState);
  const [lastPosition, setLastPosition] = useRecoilState(lastPositionState);

  // 페이스 상태
  const [pace, setPace] = useState('0:00');

  // 확인 모달
  const [showModal, setShowModal] = useState(false);
  // 시작 및 종료 모달 구분을 위한 상태
  const [modalType, setModalType] = useState<'start' | 'stop' | null>(null);

  // 위치 권한 상태를 로컬 상태로 관리
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  // 데이터 잘 들어가는지 확인 용도
  useEffect(() => {
    console.log("업데이트된 runningRecordInfos 배열 크기: ", runningSession.runningRecordInfos.length);
    console.log("여기 왔나?? : ", JSON.stringify(runningSession, null, 2));

  }, [runningSession]);

  // 타이머와 위치 추적을 시작하는 함수
  const startRun = () => {
    startTracking();
    console.log("시작하나?!!!!!!")
    startTimer();
    setIsRunning(true);
  }

  const startTimer = () => {
    setSecondsElapsed(0); // 타이머 초기화
    timerIdRef.current = setInterval(() => {
      setSecondsElapsed(prevSeconds => prevSeconds + 1);
    }, 1000);
  };

  const stopRun = () => {
    setSecondsElapsed(0); // 타이머 초기화

    if (trackIdRef.current !== null) {
      Geolocation.clearWatch(trackIdRef.current);
      trackIdRef.current = null;
    }

    if (timerIdRef.current) clearInterval(timerIdRef.current);
    setIsRunning(false); // 타이머 실행 상태를 false로 설정
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

  // m/s 페이스 변환 (초/km)
  function msToPace(speed: number) {
    if (speed === 0) return '0:00'; // 속도가 0일 경우

    const paceSeconds = 1000 / speed; // m/s를 초/km로 변환
    const minutes = Math.floor(paceSeconds / 60);
    const seconds = Math.round(paceSeconds % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // 위치 초기화 && 초기 위치 설정 필수!
  useEffect(() => {
    if (!lastPosition) {
      Geolocation.getCurrentPosition((position) => {
        setLastPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [lastPosition]);

  // 위치 추적 시작 함수
  const startTracking = () => {
    const trackId = Geolocation.watchPosition((position) => {
      let distance = 0;

      if (lastPosition) {
        distance = calculateDistance(
          lastPosition.latitude,
          lastPosition.longitude,
          position.coords.latitude,
          position.coords.longitude
        );
      } else {
        setLastPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }

      const newTotalDistance = totalDistance + distance;
      const displayDistance = Math.round((newTotalDistance) * 100) / 100.0;

      const speed = position.coords.speed ?? 0;
      const speedInKmH = speed * 3.6;
      const pace = speedInKmH !== 0 ? 60 / speedInKmH : 0;

      const paceValue = msToPace(speed);
      setPace(paceValue);

      const newLocationData = {
        second: position.timestamp,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        distance: newTotalDistance, 
        speed: speed, 
        pace: pace, 
      };

      // 데이터 누적 업데이트
      setRunningSession(oldRecords => ({
        ...oldRecords,
        runningRecordInfos: [...oldRecords.runningRecordInfos, newLocationData]
      }));
      setTotalDistance(newTotalDistance);
      setDisplayDistance(displayDistance);
      setLastPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, distanceFilter: 0, interval: 1000 });

    trackIdRef.current = trackId;
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

  // 모달 : 시작 텍스트 클릭
  const handleStartButton = () => {
    setModalType('start');
    setShowModal(true);
  };
  // 모달 : 종료 텍스트 클릭
  const handleStopButton = () => {
    setModalType('stop');
    setShowModal(true);
  };

  // 모달 : "확인"을 눌렀을 때의 동작
  const handleConfirm = async () => {
    if (modalType === 'start') {
      if (locationPermissionGranted) {
        startRun();
      } else {
        const permission = await requestLocationPermission();
        if (permission === 'granted') {
          setLocationPermissionGranted(true);
          startRun();
        } else {
          console.warn("위치 권한 허용을 하셔야 함.");
        }
      }
      setShowModal(false);
      setModalType(null); // 모달 타입 초기화
    } else if (modalType === 'stop') {
      stopRun();
      setShowModal(false);
      setModalType(null); // 모달 타입 초기화

      // 수집한 데이터를 변수에 저장
      const endTime = secondsElapsed; // 종료 시간 (타이머 시간)
      const endTotalDistance = totalDistance; // 총 거리
      // 평균 속력 계산
      const averageSpeed = endTotalDistance / endTime;

      console.log("1 / initialLatitudeState(시작 위도) : " + runningSession.runningRecordInfos[0].latitude);
      console.log("1 / initialLongitudeState(시작 경도) : " + runningSession.runningRecordInfos[0].longitude);
      console.log("1 / watchOrMobile(모바일인가요?) : " + runningSession.watchOrMobile);
      console.log("1 / userId(유저 Id) : " + userId);
      console.log("1 / characterId(캐릭터 Id) : " + equippedCharacterIndex);
      console.log("1 / type (홀로 달리기) : " + runningSession.type);
      console.log("1 / rivalRecord(라이벌 없음) : " + runningSession.rivalRecord);

      console.log("2 / totalTime(초) : " + secondsElapsed);
      console.log("2 / totalDistance(M) : " + totalDistance);
      console.log("2 / averageSpeed(m/s) : " + averageSpeed);
      console.log("2 / createdAt(작성시간) : " + runningSession.createdAt);


      // axios로 모아놓은 데이터 보내주기
    }
  };

  // 모달 : "취소"를 눌렀을 때의 동작
  const handleCancel = () => {
    setShowModal(false);
    setModalType(null);
  };

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
                <S.RunButton onPress={isRunning ? handleStopButton : handleStartButton}>
                  <S.StartText>{isRunning ? '종료' : '시작'}</S.StartText>
                </S.RunButton>
              </S.ButtonBackground>
            </S.StartBox>

            <S.RecodeBox>
              <S.RecodeLeft>
                <S.RecodeTextBox>
                  <S.RecodeTitle>페이스</S.RecodeTitle>
                </S.RecodeTextBox>
                <S.RecodeBottomBox>
                  <S.RecodeText>{pace} 초/km </S.RecodeText>
                </S.RecodeBottomBox>
              </S.RecodeLeft>
              <S.RecodeRight>
                <S.RecodeTextBox>
                  <S.RecodeTitle>총 거리</S.RecodeTitle>
                </S.RecodeTextBox>
                <S.RecodeBottomBox>
                  <S.RecodeText>{displayDistance} 미터</S.RecodeText>
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

      <RuningModal
        isVisible={showModal}
        modalType={modalType}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Modal>
  );
};

export default AloneRunModal;
