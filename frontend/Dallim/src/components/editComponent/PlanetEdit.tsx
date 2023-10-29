import React, { useEffect, useState } from 'react';
import * as S from './PlanetEdit.styles';
import Planet from './PlanetBox';
import { planetData } from '../common/PlanetData';
import PlanetSelectModal from './editModal/PlanetSelectModal';

type PlanetEditProps = {
  onPlanetChange: (index: number) => void;
  planetIndex: number;
  isOn: boolean;
}

function PlanetEdit({ onPlanetChange, planetIndex, isOn }: PlanetEditProps) {

  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(planetIndex);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("대표 행성이 바꼈어요(Index 기준) : " + selectedPlanetIndex);
  }, [selectedPlanetIndex]);

  function handlePlanetChange(index: number) {
    console.log(index + "번째 행성이 눌렸습니다!(Index)")
    setSelectedPlanetIndex(index);
    onPlanetChange(index); // 상위 컴포넌트로 전달
  }

  useEffect(() => {
    setSelectedPlanetIndex(planetIndex);
  }, [planetIndex]);

  function confirmPlanetChange() {
    toggleModal();
    handlePlanetChange(selectedPlanetIndex % 5);
  }

  function toggleModal() {
    setShowModal(!showModal);
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
        <S.PlanetBox isOn={isOn}>
          <Planet index={planetIndex} />
        </S.PlanetBox>
      </S.Body>

      <S.Footer>
        <S.ButtonBox onPress={toggleModal}>
          <S.ButtonText>선택</S.ButtonText>
        </S.ButtonBox>
      </S.Footer>

      <PlanetSelectModal
        showModal={showModal}
        toggleModal={toggleModal}
        confirmPlanetChange={confirmPlanetChange}
        planetIndex={planetIndex}
      />

    </S.Container>
  );
};

export default PlanetEdit;