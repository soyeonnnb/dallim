import * as S from './CharacterEdit.styles';
import { characterData } from '@/recoil/CharacterData';
import { useEffect, useState } from 'react';
import CharacterPurchaseCheckModal from './editModal/CharacterPurchaseCheckModal';
import CharacterSelectModal from './editModal/CharacterSelectModal';
import BoomEffect from '@/components/common/BoomEffect';
import CustomToast from '../common/CustomToast';
import Character from './CharacterBox';

import { useRecoilState } from 'recoil';
import {
  userDataState,
  equippedCharacterIndexState,
  equippedCharacterLevelState,
  equippedEvolutionStageState,
  selectedCharacterIndexState,
  selectedCharacterLevelState,
  selectedEvolutionStageState,
  selectedCharacterExpState,
  selectedCharacterIsPurchasedState,
  userPointState
} from '@/recoil/UserRecoil';
import { postCharacterPurchase, updateEquippedCharacter } from '@/apis/EditApi';

type CharacterEditProps = {
  handleEquippedCharacterChange: (index: number) => void;
  onCharacterChange: (index: number) => void;
}

function CharacterEdit({ handleEquippedCharacterChange, onCharacterChange }: CharacterEditProps) {

  const [userData, setUserData] = useRecoilState(userDataState);
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

  async function equippedCharacterChange() {
    toggleCharacterSelectModal();
    const characterCount = characterData.length;
    onCharacterChange(selectedCharacterIndex % characterCount);

    // DB에 대표 행성 변경 정보를 전송
    try {
      const responseData = await updateEquippedCharacter(selectedCharacterIndex);
      if (responseData.status === "success") {
        CustomToast({ type: "success", text1: "대표 캐릭터 변경 성공!" });
      } else {
        CustomToast({ type: "error", text1: "통신에 실패했습니다. 다시 시도해주세요." });
      }
    } catch (error) {
      CustomToast({ type: "error", text1: "변경에 실패했습니다. 다시 시도해주세요." });
    }
  }

  function toggleCharacterSelectModal() {
    setCharacterSelectModalVisible(!characterSelectModalVisible);
  }

  function handlePurchaseCheck() {
    console.log("캐릭터를 구매할건지 체크");
    setPurchaseModalVisible(true);
  }

  async function handlePurchaseConfirm() {
    console.log("구매 확인!");
    if (userPoint >= 4000) {
      try {
        const responseData = await postCharacterPurchase(selectedCharacterIndex);
        if (responseData.status === "success" && responseData.data === true) {
          setUserPoint(userPoint - 4000); // 포인트 차감
          CustomToast({ type: "success", text1: "구매 성공!" });
          setSelectedCharacterIsPurchased(true);

          if (userData) {
            const newUserData = {
              ...userData,
              characters: userData.characters.map((character, index) => {
                if (index === selectedCharacterIndex) {
                  return { ...character, isPurchased: true };
                }
                return character;
              }),
            };
            setUserData(newUserData);
          }

          setShowConfetti(true); // 폭죽
          setTimeout(() => setShowConfetti(false), 4000); // 폭죽 타이머
          setPurchaseModalVisible(false); // 모달 닫기

        } else {
          CustomToast({ type: "error", text1: "통신에 실패했습니다. 다시 시도해주세요." });
        }
      } catch (error) {
        CustomToast({ type: "error", text1: "구매에 실패했습니다. 다시 시도해주세요." });
      }
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
              <S.ButtonBox onPress={handleEquipped}>
                <S.EquippedText>대표 캐릭터</S.EquippedText>
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