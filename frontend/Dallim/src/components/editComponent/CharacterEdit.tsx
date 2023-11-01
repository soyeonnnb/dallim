import * as S from './CharacterEdit.styles';
import { characterData } from '@/recoil/CharacterData';
import { useEffect, useState } from 'react';
import CharacterPurchaseCheckModal from './editModal/CharacterPurchaseCheckModal';
import CharacterSelectModal from './editModal/CharacterSelectModal';
import BoomEffect from '@/components/common/BoomEffect';
import Character from './CharacterBox';

import { useRecoilState } from 'recoil';
import {
  equippedCharacterIndexState,
  equippedCharacterLevelState,
  equippedEvolutionStageState,
  selectedCharacterIndexState,
  selectedCharacterLevelState,
  selectedEvolutionStageState,
  selectedCharacterExpState,
  selectedCharacterIsPurchasedState,
  userPointState
} from '@/recoil/EditRecoil';
import CustomToast from '../common/CustomToast';

type CharacterEditProps = {
  handleEquippedCharacterChange: (index: number) => void;
  onCharacterChange: (index: number) => void;
}

function CharacterEdit({ handleEquippedCharacterChange, onCharacterChange }: CharacterEditProps) {

  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(equippedCharacterIndexState);
  const [equippedCharacterLevel, setEquippedCharacterLevel] = useRecoilState(equippedCharacterLevelState);
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(equippedEvolutionStageState);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useRecoilState(selectedCharacterIndexState);
  const [selectedCharacterLevel, setSelectedCharacterLevel] = useRecoilState(selectedCharacterLevelState);
  const [selectedEvolutionStage, setSelectedEvolutionStage] = useRecoilState(selectedEvolutionStageState);
  const [selectedCharacterExp, setSelectedCharacterExp] = useRecoilState(selectedCharacterExpState);
  const [selectedCharacterIsPurchased, setSelectedCharacterIsPurchased] = useRecoilState(selectedCharacterIsPurchasedState);
  const [userPoint, setUserPoint] = useRecoilState(userPointState);

  const [characterSelectModalVisible, setCharacterSelectModalVisible] = useState(false); // 캐릭터 선택 확인 모달
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false); // 구매 확인 모달
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    console.log("선택 캐릭터가 바꼈어요(Index 기준) : " + selectedCharacterIndex);
  }, [selectedCharacterIndex]);

  function handleCharacterChange(index: number) {
    console.log(index + "번째 캐릭터가 눌렸습니다!")
    onCharacterChange(index); // 상위 컴포넌트로 전달
    // 여기에 캐릭터 Axios put 예정 
  }

  function equippedCharacterChange() {
    toggleCharacterSelectModal();
    const characterCount = characterData.length;
    handleCharacterChange(selectedCharacterIndex % characterCount);
  }

  function toggleCharacterSelectModal() {
    setCharacterSelectModalVisible(!characterSelectModalVisible);
  }

  function handlePurchaseCheck() {
    console.log("캐릭터를 구매할건지 체크");
    setPurchaseModalVisible(true);
  }
  function handlePurchaseConfirm() {
    console.log("구매 확인!");
    if (userPoint >= 4000) {
      setUserPoint(userPoint - 4000);
      CustomToast({ type: "success", text1: "구매 성공!" });

      setSelectedCharacterIsPurchased(true);

      // Axios 추가 예정

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
          <Character />
        </S.CharacterBox>
      </S.Body>

      <S.Footer>
        {selectedCharacterIsPurchased ? (
          equippedCharacterIndex === selectedCharacterIndex ? (
            <>
              <S.ButtonBox>
                <S.EquippedText>장착중</S.EquippedText>
              </S.ButtonBox>
              <S.LevelBox>
                <S.LevelText>Level {selectedCharacterLevel}</S.LevelText>
                <S.ExperienceBox>
                  <S.Experience percentage={selectedCharacterExp}></S.Experience>
                </S.ExperienceBox>
              </S.LevelBox>
            </>
          ) : (
            <>
              <S.ButtonBox onPress={toggleCharacterSelectModal}>
                <S.ButtonText>선택</S.ButtonText>
              </S.ButtonBox>
              <S.LevelBox>
                <S.LevelText>Level {selectedCharacterLevel}</S.LevelText>
                <S.ExperienceBox>
                  <S.Experience percentage={selectedCharacterExp}></S.Experience>
                </S.ExperienceBox>
              </S.LevelBox>
            </>
          )
        ) : (
          <S.LockButtonBox onPress={handlePurchaseCheck}>
            <S.LockedImage source={require('@/assets/icons/LockIcon.png')} resizeMode='contain' />
            <S.LockedText>4000 포인트</S.LockedText>
          </S.LockButtonBox>
        )}
      </S.Footer>


      <CharacterSelectModal
        characterSelectModalVisible={characterSelectModalVisible}
        toggleModal={toggleCharacterSelectModal}
        equippedCharacterChange={equippedCharacterChange}
      />

      <CharacterPurchaseCheckModal
        handleConfirm={handlePurchaseConfirm}
        handleCancel={handlePurchaseCancel}
        purchaseModalVisible={purchaseModalVisible}
      />
      {showConfetti && (
        <BoomEffect show={showConfetti} />
      )}
    </S.Container>
  );
};

export default CharacterEdit;