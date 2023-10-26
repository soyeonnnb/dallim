import React, { useEffect, useState } from 'react';
import * as S from './CharacterEdit.styles';
import CharacterBox from './CharacterBox';
import CharacterSelectModal from './editModal/CharacterSelectModal';
import { characterData } from './CharacterData';
type CharacterEditProps = {
  onCharacterChange: (index: number) => void;
  characterIndex: number;
}

function CharacterEdit({ onCharacterChange, characterIndex }: CharacterEditProps) {

  const Level = '10';
  const Experience = 40;
  const experiencePercentage = (Experience / 100) * 100;

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(characterIndex);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("대표 캐릭터가 바꼈어요(Index 기준) : " + selectedCharacterIndex);
  }, [selectedCharacterIndex]);

  function handleCharacterChange(index: number) {
    console.log(index + "번째 캐릭터가 눌렸습니다!")
    setSelectedCharacterIndex(index);
    onCharacterChange(index); // 상위 컴포넌트로 전달
    // 여기에 캐릭터 Axios put 예정 
  }

  useEffect(() => {
    setSelectedCharacterIndex(characterIndex);
  }, [characterIndex]);

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
          <CharacterBox index={characterIndex} />
        </S.CharacterBox>
      </S.Body>

      <S.Footer>
        <S.ButtonBox onPress={toggleModal}>
          <S.ButtonText>선택</S.ButtonText>
        </S.ButtonBox>

        <S.ButtomLevel>
          <S.LevelText>Level {Level}</S.LevelText>
          <S.ExperienceBox>
            <S.Experience percentage={experiencePercentage}></S.Experience>
          </S.ExperienceBox>
        </S.ButtomLevel>
      </S.Footer>

      <CharacterSelectModal
        showModal={showModal}
        toggleModal={toggleModal}
        confirmCharacterChange={confirmCharacterChange}
        characterIndex={characterIndex}
      />

    </S.Container>
  );
};

export default CharacterEdit;