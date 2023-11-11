import * as S from './PlanetEdit.styles';
import { postPlanetPurchase, updateEquippedPlanet } from '@/apis/EditApi';
import { useEffect, useState } from 'react';
import { planetData } from '@/recoil/PlanetData';
import PlanetPurchaseCheckModal from './editModal/PlanetPurchaseCheckModal';
import PlanetSelectModal from './editModal/PlanetSelectModal';
// import BoomEffect from '@/components/common/BoomEffect';
import CustomToast from '../common/CustomToast';
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
};

function PlanetEdit({ onPlanetChange, handleEquippedPlanetChange }: PlanetEditProps) {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userPoint, setUserPoint] = useRecoilState(userPointState);
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useRecoilState(equippedPlanetIndexState,);  // 장착된 행성 인덱스
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useRecoilState(selectedPlanetIndexState,); // 선택된 행성 인덱스
  const [selectedPlanetIsPurchased, setSelectedPlanetIsPurchased] = useRecoilState(selectedPlanetIsPurchasedState); // 행성 구매 여부

  const [planetSelectModalVisible, setPlanetSelectModalVisible] = useState(false); // 행성 선택 확인 모달
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false); // 구매 확인 모달
  const [showConfetti, setShowConfetti] = useState(false);

  async function equippedPlanetChange() {
    togglePlanetSelectModal();
    const planetCount = planetData.length;
    onPlanetChange(selectedPlanetIndex % planetCount);

    try {
      const responseData = await updateEquippedPlanet(selectedPlanetIndex);
      if (responseData.status === 'success') {
        CustomToast({ type: 'success', text1: '대표 행성 변경 성공!' });
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
    console.log('행성을 구매할건지 체크');
    setPurchaseModalVisible(true);
  }

  async function handlePurchaseConfirm() {
    console.log('구매 확인!');
    if (userPoint >= 2000) {
      try {
        const responseData = await postPlanetPurchase(selectedPlanetIndex);
        if (responseData.status === 'success' && responseData.data === true) {
          setUserPoint(userPoint - 2000); // 포인트 차감
          CustomToast({ type: 'success', text1: '구매 성공!' });

          // test
          setSelectedPlanetIsPurchased(true);
          setSelectedPlanetIndex(selectedPlanetIndex);
          setEquippedPlanetIndex(selectedPlanetIndex);

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

          setPurchaseModalVisible(false); // 모달 닫기
          // setShowConfetti(true); // 폭죽
          // setTimeout(() => setShowConfetti(false), 4000); // 폭죽 타이머
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
    console.log('구매 취소!');
    setPurchaseModalVisible(false);
  }

  function handleEquipped() {
    console.log('시작 버튼 눌림!');
    CustomToast({ type: 'success', text1: '이미 선택된 행성입니다.' });
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
              <S.EquippedText>대표 행성</S.EquippedText>
            </S.ButtonBox>
          ) : (
            <S.ButtonBox onPress={togglePlanetSelectModal}>
              <S.ButtonText>선택</S.ButtonText>
            </S.ButtonBox>
          )
        ) : (
          <S.LockButtonBox onPress={handlePurchaseCheck}>
            <S.LockedImage
              source={require('@/assets/icons/LockIcon.png')}
              resizeMode="contain"
            />
            <S.LockedText>2000 포인트</S.LockedText>
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
      {/* {showConfetti && <BoomEffect show={showConfetti} />} */}
    </S.Container>
  );
}

export default PlanetEdit;
