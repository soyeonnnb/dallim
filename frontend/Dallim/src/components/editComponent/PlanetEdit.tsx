import React, { useEffect, useState } from 'react';
import * as S from './PlanetEdit.styles';
import Planet from './PlanetBox';
import { planetData } from '../common/PlanetData';
import PlanetSelectModal from './editModal/PlanetSelectModal';

type PlanetEditProps = {
  equippedPlanetIndex: number; // 장착된 행성 인덱스
  selectedPlanetIndex: number; // 선택된 행성 인덱스
  selectedPlanetPurchased: boolean;
  handleEquippedPlanetChange: (index: number) => void;
  onPlanetChange: (index: number) => void;
}

function PlanetEdit({ equippedPlanetIndex, selectedPlanetIndex, selectedPlanetPurchased, onPlanetChange, handleEquippedPlanetChange }: PlanetEditProps) {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("대표 행성이 바꼈어요(Index 기준) : " + equippedPlanetIndex);
  }, [equippedPlanetIndex]);

  function handlePlanetChange(index: number) {
    console.log(index + "번째 행성이 눌렸습니다!(Index)")
    onPlanetChange(index); // 상위 컴포넌트로 전달
  }

  function equippedPlanetChange() {
    toggleModal();
    const planetCount = planetData.length;
    handleEquippedPlanetChange(equippedPlanetIndex % planetCount);
    handlePlanetChange(selectedPlanetIndex % planetCount);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handlePurchaseCheck() {
    console.log("행성을 구매할건지 체크");
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
          <Planet selectedPlanetIndex={selectedPlanetIndex} selectedPlanetPurchased={selectedPlanetPurchased}/>
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
            <S.LockedImage source={require('@/assets/icons/LockIcon.png')} resizeMode='contain'/>
            <S.LockedText>2000 포인트</S.LockedText>
          </S.LockButtonBox>
        )}
      </S.Footer>

      <PlanetSelectModal
        showModal={showModal}
        equippedPlanetIndex={equippedPlanetIndex}
        selectedPlanetIndex={selectedPlanetIndex}
        toggleModal={toggleModal}
        equippedPlanetChange={equippedPlanetChange}
      />

    </S.Container>
  );
};

export default PlanetEdit;