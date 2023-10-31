import React, { useEffect, useState } from 'react';
import * as S from './PlanetEdit.styles';
import Planet from './PlanetBox';
import { planetData } from '../common/PlanetData';
import PlanetSelectModal from './editModal/PlanetSelectModal';
import PlanetPurchaseCheckModal from './editModal/PlanetPurchaseCheckModal';
import BoomEffect from '@/components/common/BoomEffect';

type PlanetEditProps = {
  equippedPlanetIndex: number; // 장착된 행성 인덱스
  selectedPlanetIndex: number; // 선택된 행성 인덱스
  selectedPlanetPurchased: boolean;
  handleEquippedPlanetChange: (index: number) => void;
  onPlanetChange: (index: number) => void;
}

function PlanetEdit({ equippedPlanetIndex, selectedPlanetIndex, selectedPlanetPurchased, onPlanetChange, handleEquippedPlanetChange }: PlanetEditProps) {

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
    handleEquippedPlanetChange(equippedPlanetIndex % planetCount);
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
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setPurchaseModalVisible(false);
  }
  function handlePurchaseCancel() {
    console.log("구매 취소!");
    setPurchaseModalVisible(false);
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
          <Planet selectedPlanetIndex={selectedPlanetIndex} selectedPlanetPurchased={selectedPlanetPurchased} />
        </S.PlanetBox>
      </S.Body>

      <S.Footer>
        {selectedPlanetPurchased ? (
          <>
            <S.ButtonBox onPress={equippedPlanetChange}>
              <S.ButtonText>선택</S.ButtonText>
            </S.ButtonBox>
          </>
        ) : (
          <S.LockButtonBox onPress={handlePurchaseCheck}>
            <S.LockedImage source={require('@/assets/icons/LockIcon.png')} resizeMode='contain' />
            <S.LockedText>2000 포인트</S.LockedText>
          </S.LockButtonBox>
        )}
      </S.Footer>

      <PlanetSelectModal
        planetSelectModalVisible={planetSelectModalVisible}
        equippedPlanetIndex={equippedPlanetIndex}
        selectedPlanetIndex={selectedPlanetIndex}
        togglePlanetSelectModal={togglePlanetSelectModal}
        equippedPlanetChange={equippedPlanetChange}
      />
      <PlanetPurchaseCheckModal
        purchaseModalVisible={purchaseModalVisible}
        selectedPlanetIndex={selectedPlanetIndex}
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