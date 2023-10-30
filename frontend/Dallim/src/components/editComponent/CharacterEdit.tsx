import React, { useEffect, useState } from 'react';
import * as S from './CharacterEdit.styles';
import Character from './CharacterBox';
import CharacterSelectModal from './editModal/CharacterSelectModal';
import { characterData } from '../common/CharacterData';
type CharacterEditProps = {
  equippedCharacterIndex: number;
  equippedCharacterLevel: number;
  equippedEvolutionStage: number;
  selectedCharacterIndex: number;
  selectedCharacterLevel: number;
  selectedEvolutionStage: number;
  selectedCharacterExp: number;
  selectedCharacterPurchased: boolean;
  onCharacterChange: (index: number) => void;
}

function CharacterEdit({ equippedCharacterIndex, equippedCharacterLevel, equippedEvolutionStage, selectedCharacterIndex, selectedCharacterLevel, selectedEvolutionStage, selectedCharacterExp, selectedCharacterPurchased, onCharacterChange }: CharacterEditProps) {

  const Experience = selectedCharacterExp;
  const experiencePercentage = (Experience / 100) * 100;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("선택 캐릭터가 바꼈어요(Index 기준) : " + selectedCharacterIndex);
  }, [selectedCharacterIndex]);

  function handleCharacterChange(index: number) {
    console.log(index + "번째 캐릭터가 눌렸습니다!")
    onCharacterChange(index); // 상위 컴포넌트로 전달
    // 여기에 캐릭터 Axios put 예정 
  }

  function confirmCharacterChange() {
    toggleModal();
    handleCharacterChange(selectedCharacterIndex % 4);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <S.Container>

      <S.Header>
        <S.DotBox>
          {characterData.map((_, index) => (
            <S.Dot key={index} isActive={selectedCharacterIndex === index} />
          ))}
        </S.DotBox>
      </S.Header>

      <S.Body>
        <S.CharacterBox>
          <Character selectedCharacterIndex={selectedCharacterIndex} selectedEvolutionStage={selectedEvolutionStage} />
        </S.CharacterBox>
      </S.Body>

      <S.Footer>
        <S.ButtonBox onPress={toggleModal}>
          <S.ButtonText>선택</S.ButtonText>
        </S.ButtonBox>

        <S.LevelBox>
          <S.LevelText>Level {selectedCharacterLevel}</S.LevelText>
          <S.ExperienceBox>
            <S.Experience percentage={experiencePercentage}></S.Experience>
          </S.ExperienceBox>
        </S.LevelBox>
      </S.Footer>

      <CharacterSelectModal
        showModal={showModal}
        toggleModal={toggleModal}
        confirmCharacterChange={confirmCharacterChange}

        equippedCharacterIndex={equippedCharacterIndex}
        equippedCharacterLevel={equippedCharacterLevel}
        equippedEvolutionStage={equippedEvolutionStage}
        selectedCharacterIndex={selectedCharacterIndex}
        selectedCharacterLevel={selectedCharacterLevel}
        selectedEvolutionStag={selectedEvolutionStage}
      />

    </S.Container>
  );
};

export default CharacterEdit;