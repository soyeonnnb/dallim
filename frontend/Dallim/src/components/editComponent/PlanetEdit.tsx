import * as S from './PlanetEdit.styles';
import { planetData } from '@/recoil/PlanetData';
import CustomToast from '../common/CustomToast';
import { useEffect, useState } from 'react';
import PlanetPurchaseCheckModal from './editModal/PlanetPurchaseCheckModal';
import PlanetSelectModal from './editModal/PlanetSelectModal';
import BoomEffect from '@/components/common/BoomEffect';
import Planet from './PlanetBox';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  equippedPlanetIndexState,
  selectedPlanetIndexState,
  selectedPlanetIsPurchasedState,
  userPointState
} from '@/recoil/EditRecoil';

type PlanetEditProps = {
  handleEquippedPlanetChange: (index: number) => void;
  onPlanetChange: (index: number) => void;
}

function PlanetEdit({ onPlanetChange, handleEquippedPlanetChange }: PlanetEditProps) {

  const equippedPlanetIndex = useRecoilValue(equippedPlanetIndexState); // 장착된 행성 인덱스
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useRecoilState(selectedPlanetIndexState); // 선택된 행성 인덱스
  const [selectedPlanetIsPurchased, setSelectedPlanetIsPurchased] = useRecoilState(selectedPlanetIsPurchasedState); // 행성 구매 여부
  const [userPoint, setUserPoint] = useRecoilState(userPointState);


  const [planetSelectModalVisible, setPlanetSelectModalVisible] = useState(false); // 행성 선택 확인 모달
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false); // 구매 확인 모달
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    console.log("대표 행성이 바꼈어요(Index 기준) : " + equippedPlanetIndex);
  }, [equippedPlanetIndex]);

  function handlePlanetChange(index: number) {
    console.log(index + "번째 행성이 눌렸습니다!(Index)")
    onPlanetChange(index); // 상위 컴포넌트로 전달
  }

  function equippedPlanetChange() {
    togglePlanetSelectModal();
    const planetCount = planetData.length;
    handlePlanetChange(selectedPlanetIndex % planetCount);
  }

  function togglePlanetSelectModal() {
    setPlanetSelectModalVisible(!planetSelectModalVisible);
  }

  function handlePurchaseCheck() {
    console.log("행성을 구매할건지 체크");
    setPurchaseModalVisible(true);
  }
  
  function handlePurchaseConfirm() {
    console.log("구매 확인!");
    if(userPoint >= 2000) {
      setUserPoint(userPoint - 2000); // 포인트 차감
      CustomToast({ type: "success", text1: "구매 성공!" });
  
      setSelectedPlanetIsPurchased(true);
      // 구매 로직( Axios 요청 )
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // 폭죽
      setPurchaseModalVisible(false);
    } else {
      CustomToast({ type: "error", text1: "포인트가 부족합니다." });
    }
  }

  function handlePurchaseCancel() {
    console.log("구매 취소!");
    setPurchaseModalVisible(false);
  }

  function handleEquipped() {
    console.log("시작 버튼 눌림!");
    CustomToast({ type: "success", text1: "현재 착용중인 행성입니다." });
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
        <S.PlanetBox >
          <Planet />
        </S.PlanetBox>
      </S.Body>

      <S.Footer>
        {selectedPlanetIsPurchased ? (
          selectedPlanetIndex === equippedPlanetIndex ? (
            <S.ButtonBox onPress={handleEquipped}>
              <S.EquippedText>착용중</S.EquippedText>
            </S.ButtonBox>
          ) : (
            <S.ButtonBox onPress={equippedPlanetChange}>
              <S.ButtonText>선택</S.ButtonText>
            </S.ButtonBox>
          )
        ) : (
          <S.LockButtonBox onPress={handlePurchaseCheck}>
            <S.LockedImage source={require('@/assets/icons/LockIcon.png')} resizeMode='contain' />
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
      {showConfetti && (
        <BoomEffect show={showConfetti} />
      )}
    </S.Container>
  );
};

export default PlanetEdit;