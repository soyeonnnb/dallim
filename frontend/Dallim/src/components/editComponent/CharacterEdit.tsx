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
  handleEquippedCharacterChange: (index: number) => void;
  onCharacterChange: (index: number) => void;
}

function CharacterEdit({ equippedCharacterIndex, equippedCharacterLevel, equippedEvolutionStage, selectedCharacterIndex, selectedCharacterLevel, selectedEvolutionStage, selectedCharacterExp, selectedCharacterPurchased, handleEquippedCharacterChange, onCharacterChange }: CharacterEditProps) {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("선택 캐릭터가 바꼈어요(Index 기준) : " + selectedCharacterIndex);
  }, [selectedCharacterIndex]);

  function handleCharacterChange(index: number) {
    console.log(index + "번째 캐릭터가 눌렸습니다!")
    onCharacterChange(index); // 상위 컴포넌트로 전달
    // 여기에 캐릭터 Axios put 예정 
  }

  function equippedCharacterChange() {
    toggleModal();
    const characterCount = characterData.length;
    handleCharacterChange(selectedCharacterIndex % characterCount);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handlePurchaseCheck() {
    console.log("캐릭커를 구매할건지 체크");
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
          <Character selectedCharacterIndex={selectedCharacterIndex} selectedEvolutionStage={selectedEvolutionStage} selectedCharacterPurchased={selectedCharacterPurchased}/>
        </S.CharacterBox>
      </S.Body>

      <S.Footer>
        {selectedCharacterPurchased ? (
          <>
            <S.ButtonBox onPress={toggleModal}>
              <S.ButtonText>선택</S.ButtonText>
            </S.ButtonBox>

            <S.LevelBox>
              <S.LevelText>Level {selectedCharacterLevel}</S.LevelText>
              <S.ExperienceBox>
                <S.Experience percentage={selectedCharacterExp}></S.Experience>
              </S.ExperienceBox>
            </S.LevelBox>
          </>
        ) : (
          <S.LockButtonBox onPress={handlePurchaseCheck}>
            <S.LockedImage source={require('@/assets/icons/LockIcon.png')} resizeMode='contain'/>
            <S.LockedText>2000 포인트</S.LockedText>
          </S.LockButtonBox>
        )}
      </S.Footer>


      <CharacterSelectModal
        showModal={showModal}
        toggleModal={toggleModal}
        equippedCharacterChange={equippedCharacterChange}

        equippedCharacterIndex={equippedCharacterIndex}
        equippedCharacterLevel={equippedCharacterLevel}
        equippedEvolutionStage={equippedEvolutionStage}
        selectedCharacterIndex={selectedCharacterIndex}
        selectedCharacterLevel={selectedCharacterLevel}
        selectedEvolutionStage={selectedEvolutionStage}
      />

    </S.Container>
  );
};

export default CharacterEdit;