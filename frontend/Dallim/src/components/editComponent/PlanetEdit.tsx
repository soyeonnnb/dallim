import * as S from './PlanetEdit.styles';
import { postPlanetPurchase, updateEquippedPlanet } from '@/apis/EditApi';
import { useEffect, useState } from 'react';
import { planetData } from '@/recoil/data/PlanetData';
import PlanetPurchaseCheckModal from './editModal/PlanetPurchaseCheckModal';
import PlanetSelectModal from './editModal/PlanetSelectModal';
import { CustomToast } from '@/components/common/toast/CustomToast';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import { colors } from '../common/globalStyles';

import Planet from './PlanetBox';

import { useRecoilState } from 'recoil';
import {
  userDataState,
  equippedPlanetIndexState,
  selectedPlanetIndexState,
  selectedPlanetIsPurchasedState,
  userPointState,
} from '@/recoil/UserRecoil';

type PlanetEditProps = {
  handleEquippedPlanetChange: (index: number) => void;
  onPlanetChange: (index: number) => void;
  onPlanetPurchased: (index: number, cost: number) => void;
};

function PlanetEdit({
  onPlanetChange,
  handleEquippedPlanetChange,
  onPlanetPurchased,
}: PlanetEditProps) {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userPoint, setUserPoint] = useRecoilState(userPointState);
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useRecoilState(
    equippedPlanetIndexState,
  ); // 장착된 행성 인덱스
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useRecoilState(
    selectedPlanetIndexState,
  ); // 선택된 행성 인덱스
  const [selectedPlanetIsPurchased, setSelectedPlanetIsPurchased] =
    useRecoilState(selectedPlanetIsPurchasedState); // 행성 구매 여부

  const [planetSelectModalVisible, setPlanetSelectModalVisible] =
    useState(false); // 행성 선택 확인 모달
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false); // 구매 확인 모달

  async function equippedPlanetChange() {
    togglePlanetSelectModal();
    const planetCount = planetData.length;
    onPlanetChange(selectedPlanetIndex % planetCount);

    try {
      const responseData = await updateEquippedPlanet(selectedPlanetIndex);
      if (responseData.status === 'success') {
        CustomToast({
          type: 'success',
          text1: '대표 행성 변경 성공!',
        });
      } else {
        CustomToast({
          type: 'error',
          text1: '통신에 실패했습니다. 다시 시도해주세요.',
        });
      }
    } catch (error) {
      CustomToast({
        type: 'error',
        text1: '변경에 실패했습니다. 다시 시도해주세요.',
      });
    }
  }

  function togglePlanetSelectModal() {
    setPlanetSelectModalVisible(!planetSelectModalVisible);
  }

  function handlePurchaseCheck() {
    setPurchaseModalVisible(true);
  }
  async function handlePurchaseConfirm() {
    if (userPoint >= 2000) {
      try {
        const responseData = await postPlanetPurchase(selectedPlanetIndex);
        if (responseData.status === 'success' && responseData.data === true) {
          setTimeout(() => {
            onPlanetPurchased(selectedPlanetIndex, 2000);
            setSelectedPlanetIsPurchased(true);
            setSelectedPlanetIndex(selectedPlanetIndex);
            setEquippedPlanetIndex(selectedPlanetIndex);
          }, 500);

          if (userData) {
            const newUserData = {
              ...userData,
              planets: userData.planets.map((planet, index) => {
                if (index === selectedPlanetIndex) {
                  return { ...planet, isPurchased: true };
                }
                return planet;
              }),
            };
            setUserData(newUserData);
          }

          CustomToast({ type: 'success', text1: '행성 구매 성공!' });
          setPurchaseModalVisible(false);
        } else {
          CustomToast({
            type: 'error',
            text1: '통신에 실패했습니다. 다시 시도해주세요.',
          });
        }
      } catch (error) {
        CustomToast({
          type: 'error',
          text1: '구매에 실패했습니다. 다시 시도해주세요.',
        });
      }
    } else {
      CustomToast({ type: 'error', text1: '포인트가 부족합니다.' });
    }
  }

  function handlePurchaseCancel() {
    // console.log('구매 취소!');
    setPurchaseModalVisible(false);
  }

  function handleEquipped() {
    // console.log('시작 버튼 눌림!');
    CustomToast({ type: 'error', text1: '이미 선택된 행성입니다.' });
  }

  return (
    <S.Container>
      <S.Header>
        <S.DotBox>
          {planetData.map((_, index) => (
            <S.Dot key={index} isActive={selectedPlanetIndex === index} />
          ))}
        </S.DotBox>
      </S.Header>

      <S.Body>
        <S.PlanetBox>
          <Planet />
        </S.PlanetBox>
      </S.Body>

      <S.Footer>
        {selectedPlanetIsPurchased ? (
          selectedPlanetIndex === equippedPlanetIndex ? (
            <S.ButtonBox onPress={handleEquipped}>
              <LinearGradient
                colors={[
                  colors.all.firstPoint.linear.start,
                  colors.all.firstPoint.linear.end,
                ]}
                style={{
                  borderRadius: 30,
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  overflow: 'hidden',
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}>
                <RadialGradient
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: 30,
                    opacity: 0.2,
                  }}
                  colors={['#ffffff', '#3D2FBF']}
                  stops={[0.04, 0.2]}
                  radius={500}
                  center={[100, 100]}></RadialGradient>
              </LinearGradient>
              <S.EquippedText>대표 행성</S.EquippedText>
            </S.ButtonBox>

          ) : (
            <S.ButtonBox onPress={togglePlanetSelectModal}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#6EE2F5', '#6454F0']}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',

                  // position: 'absolute',
                }}></LinearGradient>
              <S.ButtonText>선택</S.ButtonText>
            </S.ButtonBox>
          )
        ) : (
          <S.LockButtonBox onPress={handlePurchaseCheck}>
            <S.LockedImage
              source={require('@/assets/icons/LockIcon.png')}
              resizeMode="contain"
            />
            <S.RightBox>
              <S.LockedText>2000 포인트</S.LockedText>
            </S.RightBox>
          </S.LockButtonBox>
        )}
      </S.Footer>

      <PlanetSelectModal
        planetSelectModalVisible={planetSelectModalVisible}
        togglePlanetSelectModal={togglePlanetSelectModal}
        equippedPlanetChange={equippedPlanetChange}
      />
      <PlanetPurchaseCheckModal
        purchaseModalVisible={purchaseModalVisible}
        handleConfirm={handlePurchaseConfirm}
        handleCancel={handlePurchaseCancel}
      />
    </S.Container>
  );
}

export default PlanetEdit;
